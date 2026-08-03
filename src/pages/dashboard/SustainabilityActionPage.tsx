import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useGetSustainabilityInitiativesQuery,
  useCreateSustainabilityInitiativeMutation,
  useUpdateSustainabilityInitiativeMutation,
  useDeleteSustainabilityInitiativeMutation,
} from '../../app/api';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import { Textarea } from '../../components/ui/Textarea';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;

const EMPTY = { type: 'project' as const, value: '', label: '', description: '', img: '', tag: '', year: '', order: 0 };

export default function SustainabilityActionPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: all = [], isLoading } = useGetSustainabilityInitiativesQuery({ type: 'project' });
  const [create, { isLoading: saving }] = useCreateSustainabilityInitiativeMutation();
  const [update, { isLoading: updating }] = useUpdateSustainabilityInitiativeMutation();
  const [remove] = useDeleteSustainabilityInitiativeMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (r: any) => { setEditing(r); setForm({ type: 'project', value: r.value ?? '', label: r.label ?? '', description: r.description ?? '', img: r.img ?? '', tag: r.tag ?? '', year: r.year ?? '', order: r.order ?? 0 }); setOpen(true); };

  const handleSave = async () => {
    if (editing) await update({ id: editing.id, body: form }).unwrap();
    else await create(form).unwrap();
    setOpen(false);
  };

  const columns: TableColumn<Row>[] = [
    { key: 'label', header: 'Title', render: (r) => <span className="font-medium text-secondary-800">{String(r.label ?? r.title ?? '—')}</span> },
    { key: 'tag', header: 'Tag', render: (r) => r.tag ? <Badge label={String(r.tag)} variant="secondary" size="sm" /> : <span className="text-secondary-300">—</span> },
    { key: 'year', header: 'Year', render: (r) => <Badge label={String(r.year ?? '—')} variant="primary" size="sm" /> },
    { key: 'description', header: 'Description', render: (r) => <span className="text-xs text-secondary-500 truncate max-w-[250px] block">{String(r.description ?? '—')}</span> },
    { key: 'active', header: 'Status', render: (r) => <Badge label={r.active ? 'Active' : 'Inactive'} variant={r.active ? 'success' : 'error'} dot size="sm" /> },
    { key: 'actions', header: '', render: (r) => (
      <div className="flex items-center gap-2 justify-end">
        <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors"><FiEdit2 size={14} /></button>
        {isAdmin && <button onClick={() => remove(r.id as number)} className="p-1.5 rounded hover:bg-error-50 text-secondary-400 hover:text-error-500 transition-colors"><FiTrash2 size={14} /></button>}
      </div>
    ) },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Sustainability in Action</h1>
          <p className="text-sm text-secondary-400">Manage sustainability projects & initiatives</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Initiative</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={columns} data={all as Row[]} keyField="id" emptyText="No initiatives yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Initiative' : 'Add Initiative'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} fullWidth className="col-span-2" />
          <Input label="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} fullWidth placeholder="Green Finance" />
          <Input label="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} fullWidth placeholder="2025" />
          <ImageUpload value={form.img} onChange={(url) => setForm({ ...form, img: url })} label="Initiative Image" className="col-span-2" />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth className="col-span-2" />
          <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} fullWidth />
        </div>
        <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-secondary-100">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" size="sm" loading={saving || updating} onClick={handleSave}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}
