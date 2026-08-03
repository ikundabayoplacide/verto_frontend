import { useRef, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { API_BASE_URL } from '../../app/config';

interface ImageUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ label, value, onChange, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

  const handleFile = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = localStorage.getItem('token') ?? '';
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      onChange(`${API_ORIGIN}${data.url}`);
    } catch (e: any) {
      setError(e.message ?? 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className={['flex flex-col gap-1.5 w-full', className].filter(Boolean).join(' ')}>
      {label && <span className="text-sm font-medium text-secondary-200">{label}</span>}

      {/* Preview */}
      {value && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-primary-700 bg-primary-800">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <FiX size={12} />
          </button>
        </div>
      )}

      {/* Drop zone */}
      {!value && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full h-24 rounded-lg border-2 border-dashed border-primary-700 bg-primary-900/60 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-accent-500 hover:bg-primary-800/60 transition-colors"
        >
          {uploading
            ? <span className="text-xs text-secondary-400">Uploading…</span>
            : <>
                <FiUpload size={18} className="text-secondary-400" />
                <span className="text-xs text-secondary-400">Click or drag image to upload</span>
              </>
          }
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />

      {/* URL fallback */}
      <input
        type="text"
        placeholder="Or paste image URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-primary-700 bg-primary-900/60 text-secondary-100 placeholder-secondary-500 text-xs py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
      />

      {error && <p className="text-xs text-error-400">{error}</p>}
    </div>
  );
}
