import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useGetSustainabilityPillarsQuery,
  useCreateSustainabilityPillarMutation,
  useUpdateSustainabilityPillarMutation,
  useDeleteSustainabilityPillarMutation,
} from '../../app/api';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import { Textarea } from '../../components/ui/Textarea';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;

const EMPTY = { label: '', title: '', description: '', points: '', color: 'accent' as const, order: 0 };
const COLORS = [{ label: 'Accent', value: 'accent' }, { label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }];

export default function PillarsPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: rows = [], isLoading } = useGetSustainabilityPillarsQuery();
  const [create, { isLoading: saving }] = useCreateSustainabilityPillarMutation();
  const [update, { isLoading: updating }] = useUpdateSustainabilityPillarMutation();
  const [remove] = useDeleteSustainabilityPillarMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (r: any) => { setEditing(r); setForm({ label: r.label, title: r.title, description: r.description, points: Array.isArray(r.points) ? r.points.join(', ') : '', color: r.color ?? 'accent', order: r.order ?? 0 }); setOpen(true); };

  const handleSave = async () => {
    const payload = { ...form, points: form.points ? form.points.split(',').map((s: string) => s.trim()).filter(Boolean) : [] };
    if (editing) await update({ id: editing.id, body: payload }).unwrap();
    else await create(payload).unwrap();
    setOpen(false);
  };

  const columns: TableColumn<Row>[] = [
    { key: 'label', header: 'Label', render: (r) => <Badge label={String(r.label ?? '—')} variant="secondary" size="sm" /> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-secondary-800">{String(r.title ?? '—')}</span> },
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
          <h1 className="text-lg font-bold text-secondary-800">Sustainability Pillars</h1>
          <p className="text-sm text-secondary-400">Manage sustainability pillar sections</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Pillar</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={columns} data={rows as Row[]} keyField="id" emptyText="No pillars yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Pillar' : 'Add Pillar'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} fullWidth placeholder="Environmental" />
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth className="col-span-2" />
          <Input label="Points (comma-separated)" value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} fullWidth className="col-span-2" placeholder="Green bond structuring, Climate risk assessment, ..." />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-secondary-600">Color</label>
            <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value as any })} className="border border-secondary-200 rounded-lg px-3 py-2 text-sm">
              {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
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
