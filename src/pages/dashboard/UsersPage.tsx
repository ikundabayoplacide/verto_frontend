import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../app/api';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;
const ROLES = [{ label: 'Admin', value: 'admin' }, { label: 'Editor', value: 'editor' }];
function initials(name: string) { return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase(); }

export default function UsersPage() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [update, { isLoading: updating }] = useUpdateUserMutation();
  const [remove] = useDeleteUserMutation();

  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]       = useState({ name: '', email: '', role: 'editor' });

  const openEdit = (r: any) => { setEditing(r); setForm({ name: r.name, email: r.email, role: r.role }); setOpen(true); };

  const handleSave = async () => {
    await update({ id: editing.id, body: form }).unwrap();
    setOpen(false);
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
      <div>
        <h1 className="text-lg font-bold text-secondary-800">Users</h1>
        <p className="text-sm text-secondary-400">Manage portal users and roles</p>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={users as Row[]} keyField="id" emptyText="No users found." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit User" size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name"  value={form.name}  onChange={(e) => setForm({ ...form, name: e.target.value })}  fullWidth />
          <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
          <Select label="Role" value={form.role} options={ROLES} onChange={(e) => setForm({ ...form, role: e.target.value })} fullWidth className="col-span-2" />
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={updating} onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
