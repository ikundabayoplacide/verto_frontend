import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
  useUpdateTestimonialMutation,
} from '../../app/api';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import { Textarea } from '../../components/ui/Textarea';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;
const EMPTY = { name: '', role: '', company: '', text: '', portrait: '', order: 0 };

export default function TestimonialsPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();
  const [create, { isLoading: creating }] = useCreateTestimonialMutation();
  const [update, { isLoading: updating }] = useUpdateTestimonialMutation();
  const [remove] = useDeleteTestimonialMutation();

  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]       = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = (r: any) => { setEditing(r); setForm({ name: r.name, role: r.role ?? '', company: r.company ?? '', text: r.text, portrait: r.portrait ?? '', order: r.order ?? 0 }); setOpen(true); };

  const handleSave = async () => {
    if (editing) await update({ id: editing.id, body: form }).unwrap();
    else await create(form).unwrap();
    setOpen(false);
  };

  const cols: TableColumn<Row>[] = [
    { key: 'name',    header: 'Name',    render: (r) => <span className="font-medium text-secondary-800">{String(r.name ?? '—')}</span> },
    { key: 'role',    header: 'Role',    render: (r) => <span className="text-xs text-secondary-500">{String(r.role ?? '—')}</span> },
    { key: 'company', header: 'Company', render: (r) => <span className="text-xs text-secondary-500">{String(r.company ?? '—')}</span> },
    { key: 'text',    header: 'Quote',   render: (r) => <span className="text-xs text-secondary-400 truncate max-w-[200px] block">{String(r.text ?? '—')}</span> },
    { key: 'active',  header: 'Status',  render: (r) => <Badge label={r.active ? 'Active' : 'Inactive'} variant={r.active ? 'success' : 'error'} dot size="sm" /> },
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
          <h1 className="text-lg font-bold text-secondary-800">Testimonials</h1>
          <p className="text-sm text-secondary-400">Manage client testimonials</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Testimonial</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={testimonials as Row[]} keyField="id" emptyText="No testimonials yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name"        value={form.name}     onChange={(e) => setForm({ ...form, name: e.target.value })}     fullWidth />
          <Input label="Role"        value={form.role}     onChange={(e) => setForm({ ...form, role: e.target.value })}     fullWidth />
          <Input label="Company"     value={form.company}  onChange={(e) => setForm({ ...form, company: e.target.value })}  fullWidth />
          <ImageUpload label="Portrait" value={form.portrait} onChange={(url) => setForm({ ...form, portrait: url })} />
          <Textarea label="Quote" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} fullWidth className="col-span-2" />
          <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} fullWidth />
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={creating || updating} onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
