import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiSave } from 'react-icons/fi';
import { useGetSettingsQuery, useUpsertSettingMutation } from '../../app/api';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';

const CLOUDINARY_KEYS = ['cloudinary_cloud_name', 'cloudinary_api_key', 'cloudinary_api_secret'];

const LABELS: Record<string, string> = {
  cloudinary_cloud_name: 'Cloud Name',
  cloudinary_api_key: 'API Key',
  cloudinary_api_secret: 'API Secret',
};

const PLACEHOLDERS: Record<string, string> = {
  cloudinary_cloud_name: 'your-cloud-name',
  cloudinary_api_key: '123456789012345',
  cloudinary_api_secret: 'abc123def456',
};

export default function SettingsPage() {
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
    for (const key of CLOUDINARY_KEYS) {
      const val = form[key]?.trim() ?? '';
      await upsert({ key, value: val }).unwrap();
    }
    setDirty(false);
  };

  const isSecret = (key: string) => key === 'cloudinary_api_secret' || key === 'cloudinary_api_key';

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-bold text-secondary-800">Cloudinary Settings</h1>
        <p className="text-sm text-secondary-400">Image upload configuration</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-secondary-200 p-6 max-w-xl">
          <div className="flex flex-col gap-4">
            {CLOUDINARY_KEYS.map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-secondary-700">{LABELS[key]}</label>
                <div className="relative">
                  <input
                    type={isSecret(key) && !show[key] ? 'password' : 'text'}
                    placeholder={PLACEHOLDERS[key]}
                    value={form[key] ?? ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-sm text-secondary-800 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                  {isSecret(key) && (
                    <button
                      type="button"
                      onClick={() => setShow((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    >
                      {show[key] ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<FiSave />}
              onClick={handleSave}
              loading={saving}
              disabled={!dirty}
            >
              Save
            </Button>
            {!dirty && <span className="text-xs text-secondary-400">No changes</span>}
          </div>

          <p className="mt-4 text-xs text-secondary-400 leading-relaxed">
            Uploads use Cloudinary when configured, then the backend <code className="text-accent-600 bg-accent-50 px-1 rounded">uploads/</code> directory. If local storage is unavailable, the image is saved as base64 in the database. Set <code className="text-accent-600 bg-accent-50 px-1 rounded">UPLOADS_DIR</code> to choose a different directory.
          </p>
        </div>
      )}
    </div>
  );
}
