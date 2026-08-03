import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useGetMediaHighlightsQuery,
  useCreateMediaHighlightMutation,
  useUpdateMediaHighlightMutation,
  useDeleteMediaHighlightMutation,
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

const EMPTY = { img: '', date: '', category: '', title: '', excerpt: '', body: '', featured: false, order: 0 };

export default function NewsHighlightsPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data: rows = [], isLoading } = useGetMediaHighlightsQuery(undefined);
  const [create, { isLoading: saving }] = useCreateMediaHighlightMutation();
  const [update, { isLoading: updating }] = useUpdateMediaHighlightMutation();
  const [remove] = useDeleteMediaHighlightMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(EMPTY);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setOpen(true); };
  const openEdit = (r: any) => { setEditing(r); setForm({ img: r.img ?? '', date: r.date, category: r.category, title: r.title, excerpt: r.excerpt ?? '', body: Array.isArray(r.body) ? r.body.join('\n\n') : (r.body ?? ''), featured: r.featured ?? false, order: r.order ?? 0 }); setOpen(true); };

  const handleSave = async () => {
    const payload = { ...form, body: form.body ? form.body.split('\n\n').filter((s: string) => s.trim()) : [] };
    if (editing) await update({ id: editing.id, body: payload }).unwrap();
    else await create(payload).unwrap();
    setOpen(false);
  };

  const columns: TableColumn<Row>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-secondary-800">{String(r.title ?? '—')}</span> },
    { key: 'category', header: 'Category', render: (r) => <Badge label={String(r.category ?? '—')} variant="secondary" size="sm" /> },
    { key: 'date', header: 'Date', render: (r) => <span className="text-sm text-secondary-500">{String(r.date ?? '—')}</span> },
    { key: 'featured', header: 'Featured', render: (r) => r.featured ? <Badge label="Featured" variant="primary" size="sm" /> : <span className="text-secondary-300">—</span> },
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
          <h1 className="text-lg font-bold text-secondary-800">News & Highlights</h1>
          <p className="text-sm text-secondary-400">Manage news articles & highlights</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add Article</Button>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={columns} data={rows as Row[]} keyField="id" emptyText="No articles yet." />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Article' : 'Add Article'} size="full">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth className="col-span-2" />
          <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth placeholder="Capital Markets" />
          <Input label="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} fullWidth placeholder="January 2024" />
          <ImageUpload value={form.img} onChange={(url) => setForm({ ...form, img: url })} label="Article Image" className="col-span-2" />
          <Textarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} fullWidth className="col-span-2" />
          <Textarea label="Body (paragraphs separated by blank line)" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} fullWidth className="col-span-2" rows={8} />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-secondary-300" />
            <label htmlFor="featured" className="text-sm font-semibold text-secondary-600">Featured article</label>
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
