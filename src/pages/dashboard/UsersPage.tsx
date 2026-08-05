import { useState } from 'react';
import { FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import { useDeleteUserMutation, useGetUsersQuery, useRegisterMutation, useUpdateUserMutation } from '../../app/api';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import { Toggle } from '../../components/ui/Toggle';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;
const ROLES = [{ label: 'Admin', value: 'admin' }, { label: 'Editor', value: 'editor' }];
function initials(name: string) { return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase(); }

type FormState = { name: string; email: string; role: string; password: string; active: boolean };
const EMPTY_FORM: FormState = { name: '', email: '', role: 'editor', password: '', active: true };

export default function UsersPage() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [update, { isLoading: updating }] = useUpdateUserMutation();
  const [register, { isLoading: creating }] = useRegisterMutation();
  const [remove] = useDeleteUserMutation();

  const [open, setOpen]       = useState(false);
  const [mode, setMode]       = useState<'create' | 'edit'>('edit');
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]       = useState<FormState>(EMPTY_FORM);
  const [error, setError]     = useState('');

  const openCreate = () => { setEditing(null); setMode('create'); setForm(EMPTY_FORM); setError(''); setOpen(true); };

  const openEdit = (r: any) => {
    setEditing(r);
    setMode('edit');
    setForm({ name: r.name, email: r.email, role: r.role, password: '', active: !!r.active });
    setError('');
    setOpen(true);
  };

  const handleSave = async () => {
    setError('');
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    if (mode === 'create') {
      if (!form.password) { setError('A password is required to create a user.'); return; }
      if (form.password.length < 8) { setError('Password must be at least 8 characters long.'); return; }
      try {
        await register({ name: form.name.trim(), email: form.email.trim(), password: form.password, role: form.role }).unwrap();
        setOpen(false);
      } catch {
        setError('Failed to create user. Check that the email is not already in use.');
      }
    } else {
      const body: Record<string, unknown> = { name: form.name.trim(), email: form.email.trim(), role: form.role, active: form.active };
      if (form.password) body.password = form.password;
      try {
        await update({ id: editing.id, body }).unwrap();
        setOpen(false);
      } catch {
        setError('Failed to update user.');
      }
    }
  };

  const cols: TableColumn<Row>[] = [
    {
      key: 'name', header: 'User',
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar initials={initials(String(r.name ?? '?'))} size="sm" />
          <div>
            <p className="font-medium text-secondary-800 leading-tight">{String(r.name ?? '—')}</p>
            <p className="text-xs text-secondary-400">{String(r.email ?? '')}</p>
          </div>
        </div>
      ),
    },
    { key: 'role',   header: 'Role',   render: (r) => <Badge label={String(r.role ?? '—')} variant={r.role === 'admin' ? 'primary' : 'secondary'} size="sm" /> },
    { key: 'active', header: 'Status', render: (r) => <Badge label={r.active ? 'Active' : 'Inactive'} variant={r.active ? 'success' : 'error'} dot size="sm" /> },
    {
      key: 'actions', header: '',
      render: (r) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors"><FiEdit2 size={14} /></button>
          <button onClick={() => remove(r.id as number)} className="p-1.5 rounded hover:bg-error-50 text-secondary-400 hover:text-error-500 transition-colors"><FiTrash2 size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Users</h1>
          <p className="text-sm text-secondary-400">Manage portal users and roles</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiUserPlus />} onClick={openCreate}>
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={users as Row[]} keyField="id" emptyText="No users found." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={mode === 'create' ? 'Add User' : 'Edit User'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
          <Select label="Role" value={form.role} options={ROLES} onChange={(e) => setForm({ ...form, role: e.target.value })} fullWidth />
          <Input
            label={mode === 'create' ? 'Password' : 'New Password (optional)'}
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            helperText={mode === 'edit' ? 'Leave blank to keep the current password' : 'Minimum 8 characters'}
            fullWidth
          />

          {mode === 'edit' && (
            <div className="col-span-2 flex items-center gap-3 pt-1">
              <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label={form.active ? 'Account active' : 'Account inactive'} size="sm" />
            </div>
          )}

          {error && (
            <p role="alert" className="col-span-2 text-xs text-error-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-error-500 shrink-0 inline-block" />
              {error}
            </p>
          )}

          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={mode === 'create' ? creating : updating} onClick={handleSave}>
              {mode === 'create' ? 'Create User' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
