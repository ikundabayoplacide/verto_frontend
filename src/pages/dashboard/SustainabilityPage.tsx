import { useState } from 'react';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import {
  useGetSustainabilityPillarsQuery,
  useCreateSustainabilityPillarMutation,
  useUpdateSustainabilityPillarMutation,
  useDeleteSustainabilityPillarMutation,
  useGetSustainabilityInitiativesQuery,
  useCreateSustainabilityInitiativeMutation,
  useUpdateSustainabilityInitiativeMutation,
  useDeleteSustainabilityInitiativeMutation,
  useGetSustainabilityCommitmentsQuery,
  useCreateSustainabilityCommitmentMutation,
  useUpdateSustainabilityCommitmentMutation,
  useDeleteSustainabilityCommitmentMutation,
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
type Tab = 'pillars' | 'initiatives' | 'commitments';

const EMPTY_PILLAR = { label: '', title: '', description: '', points: '', color: 'accent' as const, order: 0 };
const EMPTY_INITIATIVE = { type: 'impact' as const, value: '', label: '', description: '', img: '', tag: '', year: '', order: 0 };
const EMPTY_COMMITMENT = { title: '', description: '', order: 0 };

const COLORS = [{ label: 'Accent', value: 'accent' }, { label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }];
const INITIATIVE_TYPES = [{ label: 'Impact Stat', value: 'impact' }, { label: 'Project', value: 'project' }];

export default function SustainabilityPage() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const [tab, setTab] = useState<Tab>('pillars');

  const { data: pillars = [], isLoading: loadP } = useGetSustainabilityPillarsQuery();
  const [createP, { isLoading: crP }] = useCreateSustainabilityPillarMutation();
  const [updateP, { isLoading: upP }] = useUpdateSustainabilityPillarMutation();
  const [removeP] = useDeleteSustainabilityPillarMutation();

  const { data: initiatives = [], isLoading: loadI } = useGetSustainabilityInitiativesQuery();
  const [createI, { isLoading: crI }] = useCreateSustainabilityInitiativeMutation();
  const [updateI, { isLoading: upI }] = useUpdateSustainabilityInitiativeMutation();
  const [removeI] = useDeleteSustainabilityInitiativeMutation();

  const { data: commitments = [], isLoading: loadC } = useGetSustainabilityCommitmentsQuery();
  const [createC, { isLoading: crC }] = useCreateSustainabilityCommitmentMutation();
  const [updateC, { isLoading: upC }] = useUpdateSustainabilityCommitmentMutation();
  const [removeC] = useDeleteSustainabilityCommitmentMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  const openCreate = () => {
    setEditing(null);
    if (tab === 'pillars') setForm(EMPTY_PILLAR);
    else if (tab === 'initiatives') setForm(EMPTY_INITIATIVE);
    else setForm(EMPTY_COMMITMENT);
    setOpen(true);
  };

  const openEdit = (r: any) => {
    setEditing(r);
    if (tab === 'pillars') setForm({ label: r.label, title: r.title, description: r.description, points: Array.isArray(r.points) ? r.points.join(', ') : '', color: r.color ?? 'accent', order: r.order ?? 0 });
    else if (tab === 'initiatives') setForm({ type: r.type ?? 'impact', value: r.value ?? '', label: r.label, description: r.description ?? '', img: r.img ?? '', tag: r.tag ?? '', year: r.year ?? '', order: r.order ?? 0 });
    else setForm({ title: r.title, description: r.description, order: r.order ?? 0 });
    setOpen(true);
  };

  const handleSave = async () => {
    const payload = tab === 'pillars' ? { ...form, points: form.points ? form.points.split(',').map((s: string) => s.trim()).filter(Boolean) : [] } : form;
    if (editing) {
      if (tab === 'pillars') await updateP({ id: editing.id, body: payload }).unwrap();
      else if (tab === 'initiatives') await updateI({ id: editing.id, body: payload }).unwrap();
      else await updateC({ id: editing.id, body: payload }).unwrap();
    } else {
      if (tab === 'pillars') await createP(payload).unwrap();
      else if (tab === 'initiatives') await createI(payload).unwrap();
      else await createC(payload).unwrap();
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    if (tab === 'pillars') removeP(id);
    else if (tab === 'initiatives') removeI(id);
    else removeC(id);
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'pillars', label: 'Pillars' },
    { key: 'initiatives', label: 'Initiatives & Impact' },
    { key: 'commitments', label: 'Commitments' },
  ];

  const pillarCols: TableColumn<Row>[] = [
    { key: 'label', header: 'Label', render: (r) => <Badge label={String(r.label ?? '—')} variant="secondary" size="sm" /> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-secondary-800">{String(r.title ?? '—')}</span> },
    { key: 'description', header: 'Description', render: (r) => <span className="text-xs text-secondary-500 truncate max-w-[250px] block">{String(r.description ?? '—')}</span> },
    { key: 'active', header: 'Status', render: (r) => <Badge label={r.active ? 'Active' : 'Inactive'} variant={r.active ? 'success' : 'error'} dot size="sm" /> },
    { key: 'actions', header: '', render: (r) => (<div className="flex items-center gap-2 justify-end"><button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors"><FiEdit2 size={14} /></button>{isAdmin && <button onClick={() => handleDelete(r.id as number)} className="p-1.5 rounded hover:bg-error-50 text-secondary-400 hover:text-error-500 transition-colors"><FiTrash2 size={14} /></button>}</div>) },
  ];

  const initiativeCols: TableColumn<Row>[] = [
    { key: 'type', header: 'Type', render: (r) => <Badge label={String(r.type ?? '—')} variant={r.type === 'impact' ? 'primary' : 'success'} size="sm" /> },
    { key: 'label', header: 'Label', render: (r) => <span className="font-medium text-secondary-800">{String(r.label ?? '—')}</span> },
    { key: 'value', header: 'Value', render: (r) => <span className="text-xs text-accent-600 font-bold">{String(r.value ?? '—')}</span> },
    { key: 'tag', header: 'Tag', render: (r) => r.tag ? <Badge label={String(r.tag)} variant="secondary" size="sm" /> : <span className="text-secondary-300">—</span> },
    { key: 'active', header: 'Status', render: (r) => <Badge label={r.active ? 'Active' : 'Inactive'} variant={r.active ? 'success' : 'error'} dot size="sm" /> },
    { key: 'actions', header: '', render: (r) => (<div className="flex items-center gap-2 justify-end"><button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors"><FiEdit2 size={14} /></button>{isAdmin && <button onClick={() => handleDelete(r.id as number)} className="p-1.5 rounded hover:bg-error-50 text-secondary-400 hover:text-error-500 transition-colors"><FiTrash2 size={14} /></button>}</div>) },
  ];

  const commitmentCols: TableColumn<Row>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-secondary-800">{String(r.title ?? '—')}</span> },
    { key: 'description', header: 'Description', render: (r) => <span className="text-xs text-secondary-500 truncate max-w-[350px] block">{String(r.description ?? '—')}</span> },
    { key: 'active', header: 'Status', render: (r) => <Badge label={r.active ? 'Active' : 'Inactive'} variant={r.active ? 'success' : 'error'} dot size="sm" /> },
    { key: 'actions', header: '', render: (r) => (<div className="flex items-center gap-2 justify-end"><button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors"><FiEdit2 size={14} /></button>{isAdmin && <button onClick={() => handleDelete(r.id as number)} className="p-1.5 rounded hover:bg-error-50 text-secondary-400 hover:text-error-500 transition-colors"><FiTrash2 size={14} /></button>}</div>) },
  ];

  const isLoading = tab === 'pillars' ? loadP : tab === 'initiatives' ? loadI : loadC;
  const isSaving = tab === 'pillars' ? crP || upP : tab === 'initiatives' ? crI || upI : crC || upC;
  const data = tab === 'pillars' ? pillars : tab === 'initiatives' ? initiatives : commitments;
  const cols = tab === 'pillars' ? pillarCols : tab === 'initiatives' ? initiativeCols : commitmentCols;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Sustainability</h1>
          <p className="text-sm text-secondary-400">Manage sustainability page content</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<FiPlus />} onClick={openCreate}>Add {tab === 'pillars' ? 'Pillar' : tab === 'initiatives' ? 'Initiative' : 'Commitment'}</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary-100 rounded-lg p-1">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={['flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors', tab === t.key ? 'bg-white text-primary-700 shadow-sm' : 'text-secondary-500 hover:text-secondary-700'].join(' ')}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={data as Row[]} keyField="id" emptyText={`No ${tab} yet.`} />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${tab === 'pillars' ? 'Pillar' : tab === 'initiatives' ? 'Initiative' : 'Commitment'}` : `Add ${tab === 'pillars' ? 'Pillar' : tab === 'initiatives' ? 'Initiative' : 'Commitment'}`} size="full">
        {tab === 'pillars' && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="Label" value={form.label ?? ''} onChange={(e) => setForm({ ...form, label: e.target.value })} fullWidth placeholder="Environmental" />
            <Input label="Title" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
            <Textarea label="Description" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth className="col-span-2" />
            <Input label="Points (comma-separated)" value={form.points ?? ''} onChange={(e) => setForm({ ...form, points: e.target.value })} fullWidth className="col-span-2" placeholder="Green bond structuring, Climate risk assessment, ..." />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-secondary-600">Color</label>
              <select value={form.color ?? 'accent'} onChange={(e) => setForm({ ...form, color: e.target.value })} className="border border-secondary-200 rounded-lg px-3 py-2 text-sm">
                {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <Input label="Order" type="number" value={String(form.order ?? 0)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} fullWidth />
          </div>
        )}

        {tab === 'initiatives' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-secondary-600">Type</label>
              <select value={form.type ?? 'impact'} onChange={(e) => setForm({ ...form, type: e.target.value })} className="border border-secondary-200 rounded-lg px-3 py-2 text-sm">
                {INITIATIVE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <Input label="Label" value={form.label ?? ''} onChange={(e) => setForm({ ...form, label: e.target.value })} fullWidth />
            {form.type === 'impact' && <Input label="Value" value={form.value ?? ''} onChange={(e) => setForm({ ...form, value: e.target.value })} fullWidth placeholder="Rwf 954M+" />}
            <Input label="Tag" value={form.tag ?? ''} onChange={(e) => setForm({ ...form, tag: e.target.value })} fullWidth placeholder="Green Finance" />
            <Input label="Year" value={form.year ?? ''} onChange={(e) => setForm({ ...form, year: e.target.value })} fullWidth placeholder="2025" />
            <ImageUpload label="Image" value={form.img ?? ''} onChange={(url) => setForm({ ...form, img: url })} />
            <Textarea label="Description" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth className="col-span-2" />
            <Input label="Order" type="number" value={String(form.order ?? 0)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} fullWidth />
          </div>
        )}

        {tab === 'commitments' && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="Title" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth className="col-span-2" />
            <Textarea label="Description" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth className="col-span-2" />
            <Input label="Order" type="number" value={String(form.order ?? 0)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} fullWidth />
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-secondary-100">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" size="sm" loading={isSaving} onClick={handleSave}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}
