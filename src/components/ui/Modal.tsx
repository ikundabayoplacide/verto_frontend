import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from '../../types';

const MAX_W: Record<string, string> = { sm: '28rem', md: '36rem', lg: '52rem', xl: '64rem', full: '80rem' };

export function Modal({ open, onClose, title, children, size = 'md', closeOnBackdrop = true }: ModalProps) {
  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, handleKey]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{ position: 'fixed', inset: 0, zIndex: 99998, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="rounded-2xl flex flex-col bg-primary-900"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 99999,
          width: '90vw',
          maxWidth: MAX_W[size] ?? '36rem',
          maxHeight: '90vh',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center text-secondary-400 hover:text-secondary-100 transition-colors"
          style={{ zIndex: 1 }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        {title && (
          <div className="px-6 pt-5 pb-4 border-b border-primary-800 shrink-0">
            <div className="w-8 h-1 rounded-full bg-accent-500 mb-2" />
            <h2 className="text-sm font-extrabold text-secondary-100 uppercase tracking-tight">{title}</h2>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}
