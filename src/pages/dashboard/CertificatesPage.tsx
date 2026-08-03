import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useGetCertificatesQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
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

const EMPTY = { title: '', issuer: '', description: '', year: '', imageUrl: '', order: 0 };

export default function CertificatesPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: rows = [], isLoading } = useGetCertificatesQuery(undefined);
  const [create, { isLoading: saving }] = useCreateCertificateMutation();
  const [update, { isLoading: updating }] = useUpdateCertificateMutation();
  const [remove] = useDeleteCertificateMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (r: any) => { setEditing(r); setForm({ title: r.title, issuer: r.issuer, description: r.description ?? '', year: r.year ?? '', imageUrl: r.imageUrl ?? '', order: r.order ?? 0 }); setOpen(true); };

  const handleSave = async () => {
    if (editing) await update({ id: editing.id, body: form }).unwrap();
    else await create(form).unwrap();
    setOpen(false);
  };

  const columns: TableColumn<Row>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-secondary-800">{String(r.title ?? '—')}</span> },
    { key: 'issuer', header: 'Issuer', render: (r) => <span className="text-sm text-secondary-600">{String(r.issuer ?? '—')}</span> },
    { key: 'year', header: 'Year', render: (r) => <Badge label={String(r.year ?? '—')} variant="secondary" size="sm" /> },
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
          <h1 className="text-lg font-bold text-secondary-800">Certificates</h1>
          <p className="text-sm text-secondary-400">Manage certifications & awards</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Certificate</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={columns} data={rows as Row[]} keyField="id" emptyText="No certificates yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Certificate' : 'Add Certificate'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth className="col-span-2" />
          <Input label="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} fullWidth />
          <Input label="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} fullWidth placeholder="2024" />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth className="col-span-2" />
          <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} label="Certificate Image" className="col-span-2" />
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
