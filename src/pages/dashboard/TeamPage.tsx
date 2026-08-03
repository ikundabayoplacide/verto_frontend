import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetTeamQuery,
  useUpdateTeamMemberMutation,
} from '../../app/api';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;
const EMPTY = { name: '', role: '', qualification: '', bio: '', img: '', linkedin: '', order: 0 };

function initials(name: string) { return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase(); }

export default function TeamPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: team = [], isLoading } = useGetTeamQuery();
  const [create, { isLoading: creating }] = useCreateTeamMemberMutation();
  const [update, { isLoading: updating }] = useUpdateTeamMemberMutation();
  const [remove] = useDeleteTeamMemberMutation();

  const [open, setOpen]     = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]     = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = (r: any) => { setEditing(r); setForm({ name: r.name, role: r.role, qualification: r.qualification ?? '', bio: Array.isArray(r.bio) ? r.bio.join('\n\n') : (r.bio ?? ''), img: r.img ?? '', linkedin: r.linkedin ?? '', order: r.order ?? 0 }); setOpen(true); };

  const handleSave = async () => {
    const body = { ...form, bio: form.bio ? form.bio.split('\n\n').filter(Boolean) : [] };
    if (editing) await update({ id: editing.id, body }).unwrap();
    else await create(body).unwrap();
    setOpen(false);
  };

  const cols: TableColumn<Row>[] = [
    {
      key: 'name', header: 'Member',
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar src={r.img ? String(r.img) : undefined} initials={initials(String(r.name ?? '?'))} size="sm" />
          <div>
            <p className="font-medium text-secondary-800 leading-tight">{String(r.name ?? '—')}</p>
            <p className="text-xs text-secondary-400">{String(r.role ?? '')}</p>
          </div>
        </div>
      ),
    },
    { key: 'qualification', header: 'Qualification', render: (r) => <span className="text-xs text-secondary-500">{String(r.qualification ?? '—')}</span> },
    { key: 'bio', header: 'Bio', render: (r) => <span className="text-xs text-secondary-500 line-clamp-2 max-w-[200px]">{Array.isArray(r.bio) ? r.bio.join(' ') : String(r.bio ?? '—')}</span> },
    { key: 'order',  header: 'Order',  render: (r) => <span className="text-xs text-secondary-400">{String(r.order ?? 0)}</span> },
    { key: 'active', header: 'Status', render: (r) => <Badge label={r.active ? 'Active' : 'Inactive'} variant={r.active ? 'success' : 'error'} dot size="sm" /> },
    {
      key: 'actions', header: '',
      render: (r) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors"><FiEdit2 size={14} /></button>
          {isAdmin && <button onClick={() => remove(r.id as number)} className="p-1.5 rounded hover:bg-error-50 text-secondary-400 hover:text-error-500 transition-colors"><FiTrash2 size={14} /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Team</h1>
          <p className="text-sm text-secondary-400">Manage team members</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Member</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={team as Row[]} keyField="id" emptyText="No team members yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Member' : 'Add Member'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name"          value={form.name}          onChange={(e) => setForm({ ...form, name: e.target.value })}          fullWidth />
          <Input label="Role / Title"  value={form.role}          onChange={(e) => setForm({ ...form, role: e.target.value })}          fullWidth />
          <Input label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} fullWidth />
          <div className="col-span-2">
            <label className="block text-xs font-medium text-secondary-600 mb-1">Bio (separate paragraphs with blank lines)</label>
            <textarea
              className="w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-secondary-800 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-400 transition-colors resize-y min-h-[80px]"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
            />
          </div>
          <ImageUpload label="Photo" value={form.img} onChange={(url) => setForm({ ...form, img: url })} />
          <Input label="LinkedIn URL"  value={form.linkedin}      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}      fullWidth />
          <Input label="Order"         type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} fullWidth />
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={creating || updating} onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
