import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useCreateMediaMutation,
  useDeleteMediaMutation,
  useGetMediaQuery,
  useUpdateMediaMutation,
} from '../../app/api';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import { Textarea } from '../../components/ui/Textarea';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;
const EMPTY = { title: '', slug: '', category: 'news', summary: '', img: '', published: false };
const CATEGORIES = [
  { label: 'News',        value: 'news'        },
  { label: 'Press',       value: 'press'       },
  { label: 'Event',       value: 'event'       },
  { label: 'Publication', value: 'publication' },
];

export default function MediaPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: media = [], isLoading } = useGetMediaQuery();
  const [create, { isLoading: creating }] = useCreateMediaMutation();
  const [update, { isLoading: updating }] = useUpdateMediaMutation();
  const [remove] = useDeleteMediaMutation();

  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]       = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit   = (r: any) => { setEditing(r); setForm({ title: r.title, slug: r.slug, category: r.category, summary: r.summary ?? '', img: r.img ?? '', published: r.published }); setOpen(true); };

  const handleSave = async () => {
    if (editing) await update({ id: editing.id, body: form }).unwrap();
    else await create(form).unwrap();
    setOpen(false);
  };

  const cols: TableColumn<Row>[] = [
    { key: 'title',    header: 'Title',    render: (r) => <span className="font-medium text-secondary-800">{String(r.title ?? '—')}</span> },
    { key: 'category', header: 'Category', render: (r) => <Badge label={String(r.category ?? '—')} variant="secondary" size="sm" /> },
    { key: 'slug',     header: 'Slug',     render: (r) => <span className="text-xs font-mono text-secondary-400">{String(r.slug ?? '—')}</span> },
    { key: 'published',header: 'Status',   render: (r) => <Badge label={r.published ? 'Published' : 'Draft'} variant={r.published ? 'success' : 'secondary'} dot size="sm" /> },
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
          <h1 className="text-lg font-bold text-secondary-800">Media</h1>
          <p className="text-sm text-secondary-400">News, press releases & publications</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Media</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={media as Row[]} keyField="id" emptyText="No media items yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Media' : 'Add Media'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title"   value={form.title}   onChange={(e) => setForm({ ...form, title: e.target.value })}   fullWidth />
          <Input label="Slug"    value={form.slug}    onChange={(e) => setForm({ ...form, slug: e.target.value })}    fullWidth />
          <Select label="Category" value={form.category} options={CATEGORIES} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth />
          <ImageUpload label="Image" value={form.img} onChange={(url) => setForm({ ...form, img: url })} />
          <Textarea label="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} fullWidth className="col-span-2" />
          <label className="col-span-2 flex items-center gap-2 text-sm text-secondary-600 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-primary-600" />
            Published
          </label>
          <div className="col-span-2 flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={creating || updating} onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
