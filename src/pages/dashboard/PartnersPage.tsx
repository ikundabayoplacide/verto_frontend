import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useCreatePartnerMutation,
  useDeletePartnerMutation,
  useGetPartnersQuery,
  useUpdatePartnerMutation,
} from '../../app/api';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;
const EMPTY = { name: '', logo: '', website: '', order: 0 };
function initials(name: string) { return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase(); }

export default function PartnersPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: partners = [], isLoading } = useGetPartnersQuery();
  const [create, { isLoading: creating }] = useCreatePartnerMutation();
  const [update, { isLoading: updating }] = useUpdatePartnerMutation();
  const [remove] = useDeletePartnerMutation();

  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]       = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = (r: any) => { setEditing(r); setForm({ name: r.name, logo: r.logo ?? '', website: r.website ?? '', order: r.order ?? 0 }); setOpen(true); };

  const handleSave = async () => {
    if (editing) await update({ id: editing.id, body: form }).unwrap();
    else await create(form).unwrap();
    setOpen(false);
  };

  const cols: TableColumn<Row>[] = [
    {
      key: 'name', header: 'Partner',
      render: (r) => (
        <div className="flex items-center gap-2.5">
          {r.logo
            ? <img src={String(r.logo)} alt={String(r.name)} className="h-7 w-14 object-contain rounded border border-secondary-100 bg-white p-0.5" />
            : <Avatar initials={initials(String(r.name ?? 'P'))} size="sm" />}
          <span className="font-medium text-secondary-800">{String(r.name ?? '—')}</span>
        </div>
      ),
    },
    { key: 'website', header: 'Website', render: (r) => r.website ? <a href={String(r.website)} target="_blank" rel="noreferrer" className="text-xs text-primary-500 hover:underline">{String(r.website)}</a> : <span className="text-secondary-300 text-xs">—</span> },
    { key: 'order',   header: 'Order',   render: (r) => <span className="text-xs text-secondary-400">{String(r.order ?? 0)}</span> },
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
          <h1 className="text-lg font-bold text-secondary-800">Partners</h1>
          <p className="text-sm text-secondary-400">Manage strategic partners</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Partner</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={partners as Row[]} keyField="id" emptyText="No partners yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Partner' : 'Add Partner'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name"        value={form.name}    onChange={(e) => setForm({ ...form, name: e.target.value })}    fullWidth />
          <ImageUpload label="Logo" value={form.logo} onChange={(url) => setForm({ ...form, logo: url })} />
          <Input label="Website URL" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} fullWidth />
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
