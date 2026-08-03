import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from '../../app/api';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;

const EMPTY = { title: '', slug: '', short: '', img: '', description: '', highlights: '' };

export default function ServicesPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: services = [], isLoading } = useGetServicesQuery();
  const [create, { isLoading: creating }] = useCreateServiceMutation();
  const [update, { isLoading: updating }] = useUpdateServiceMutation();
  const [remove] = useDeleteServiceMutation();

  const [open, setOpen]   = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]   = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (row: any) => { setEditing(row); setForm({ title: row.title, slug: row.slug, short: row.short, img: row.img ?? '', description: Array.isArray(row.description) ? row.description.join('\n') : (row.description ?? ''), highlights: Array.isArray(row.highlights) ? row.highlights.join(', ') : (row.highlights ?? '') }); setOpen(true); };

  const handleSave = async () => {
    const payload = {
      ...form,
      description: form.description ? form.description.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
      highlights: form.highlights ? form.highlights.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    };
    if (editing) await update({ id: editing.id, body: payload }).unwrap();
    else await create(payload).unwrap();
    setOpen(false);
  };

  const cols: TableColumn<Row>[] = [
    { key: 'title',  header: 'Title',  render: (r) => <span className="font-medium text-secondary-800">{String(r.title ?? '—')}</span> },
    { key: 'slug',   header: 'Slug',   render: (r) => <span className="text-xs text-secondary-400 font-mono">{String(r.slug ?? '—')}</span> },
    { key: 'short',  header: 'Summary',render: (r) => <span className="text-xs text-secondary-500 truncate max-w-[200px] block">{String(r.short ?? '—')}</span> },
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
          <h1 className="text-lg font-bold text-secondary-800">Services</h1>
          <p className="text-sm text-secondary-400">Manage your service offerings</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Service</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={services as Row[]} keyField="id" emptyText="No services yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Service' : 'Add Service'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title"   value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
          <Input label="Slug"    value={form.slug}  onChange={(e) => setForm({ ...form, slug: e.target.value })}  fullWidth />
          <Input label="Summary" value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} fullWidth />
          <Textarea label="Description (one paragraph per line)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth />
          <Input label="Highlights (comma-separated)" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} fullWidth placeholder="Equity & Debt Structuring, Investor Roadshows, ..." />
          <ImageUpload label="Image" value={form.img} onChange={(url) => setForm({ ...form, img: url })} />
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={creating || updating} onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
