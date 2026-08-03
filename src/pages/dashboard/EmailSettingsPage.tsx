import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiSave } from 'react-icons/fi';
import { useGetSettingsQuery, useUpsertSettingMutation } from '../../app/api';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';

interface Field { key: string; label: string; placeholder: string; secret?: boolean }

const SMTP_FIELDS: Field[] = [
  { key: 'smtp_host',   label: 'SMTP Host',     placeholder: 'smtp.gmail.com' },
  { key: 'smtp_port',   label: 'SMTP Port',     placeholder: '587' },
  { key: 'smtp_secure', label: 'SMTP Secure',   placeholder: 'true or false' },
  { key: 'smtp_user',   label: 'SMTP User',     placeholder: 'your@email.com' },
  { key: 'smtp_pass',   label: 'SMTP Password', placeholder: 'app-password', secret: true },
  { key: 'smtp_from',   label: 'SMTP From',     placeholder: 'Verto Holdings <noreply@verto.rw>' },
];

const RESEND_FIELDS: Field[] = [
  { key: 'resend_api_key', label: 'Resend API Key', placeholder: 're_...', secret: true },
  { key: 'resend_from',    label: 'Resend From',    placeholder: 'onboarding@resend.dev' },
];

const ALL_KEYS = ['email_provider', ...SMTP_FIELDS.map((f) => f.key), ...RESEND_FIELDS.map((f) => f.key)];

function FieldInput({ field, value, show, onToggleShow, onChange }: {
  field: Field; value: string; show: boolean; onToggleShow: () => void; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-secondary-700">{field.label}</label>
      <div className="relative">
        <input
          type={field.secret && !show ? 'password' : 'text'}
          placeholder={field.placeholder}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-sm text-secondary-800 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
        {field.secret && (
          <button type="button" onClick={onToggleShow}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
          >
            {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function EmailSettingsPage() {
  const { data: settings = [], isLoading } = useGetSettingsQuery();
  const [upsert, { isLoading: saving }] = useUpsertSettingMutation();
  const [form, setForm] = useState<Record<string, string>>({});
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (settings.length) {
      const vals: Record<string, string> = {};
      for (const s of settings) vals[s.key] = s.value ?? '';
      setForm((prev) => (Object.keys(prev).length ? prev : vals));
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSave = async () => {
    for (const key of ALL_KEYS) {
      const val = form[key]?.trim() ?? '';
      await upsert({ key, value: val }).unwrap();
    }
    setDirty(false);
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Email Settings</h1>
          <p className="text-sm text-secondary-400">Configure how reply emails are sent from the Contact Messages page</p>
        </div>
        <div className="flex items-center gap-3">
          {!dirty && <span className="text-xs text-secondary-400">No changes</span>}
          <Button variant="primary" size="sm" leftIcon={<FiSave />} onClick={handleSave} loading={saving} disabled={!dirty}>Save All</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200 p-6 max-w-xl">
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm font-medium text-secondary-700">Provider</label>
          <select
            value={form.email_provider ?? ''}
            onChange={(e) => handleChange('email_provider', e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-sm text-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">— None —</option>
            <option value="smtp">SMTP</option>
            <option value="resend">Resend</option>
          </select>
        </div>

        {form.email_provider === 'smtp' && (
          <div className="flex flex-col gap-4">
            {SMTP_FIELDS.map((field) => (
              <FieldInput
                key={field.key} field={field}
                value={form[field.key] ?? ''}
                show={show[field.key] ?? false}
                onToggleShow={() => setShow((p) => ({ ...p, [field.key]: !p[field.key] }))}
                onChange={(v) => handleChange(field.key, v)}
              />
            ))}
          </div>
        )}

        {form.email_provider === 'resend' && (
          <div className="flex flex-col gap-4">
            {RESEND_FIELDS.map((field) => (
              <FieldInput
                key={field.key} field={field}
                value={form[field.key] ?? ''}
                show={show[field.key] ?? false}
                onToggleShow={() => setShow((p) => ({ ...p, [field.key]: !p[field.key] }))}
                onChange={(v) => handleChange(field.key, v)}
              />
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-secondary-400 leading-relaxed max-w-xl">
        When an admin replies to a contact message, the email is sent using the provider configured here.
        If no provider is selected, the reply is stored in the database but no email is sent.
      </p>
    </div>
  );
}
