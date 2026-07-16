import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiMoreVertical } from 'react-icons/fi';

export interface RowMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  dividerBefore?: boolean;
}

export function RowMenu({ items }: { items: RowMenuItem[] }) {
  const [open, setOpen] = useState(false);
  const posRef  = useRef<React.CSSProperties>({});
  const btnRef  = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const menuH = items.length * 36 + 16;
    posRef.current = {
      position: 'fixed',
      top: r.bottom + menuH > window.innerHeight ? r.top - menuH : r.bottom + 4,
      left: r.right - 160,
      zIndex: 99999,
    };
    setOpen(o => !o);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (ev: MouseEvent) => {
      if (
        !menuRef.current?.contains(ev.target as Node) &&
        !btnRef.current?.contains(ev.target as Node)
      ) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="flex justify-center">
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        aria-label="Row actions"
        className="p-1.5 rounded-lg text-primary-50 bg-primary-600 hover:bg-secondary-100 hover:text-secondary-700 transition-colors"
      >
        <FiMoreVertical className="w-4 h-4" />
      </button>

      {open && createPortal(
        <div
          ref={menuRef}
          style={posRef.current}
          className="w-40 bg-white rounded-xl border border-secondary-200 shadow-xl overflow-hidden py-1"
        >
          {items.map((item, i) => (
            <div key={i}>
              {item.dividerBefore && <div className="h-px bg-secondary-100 my-1" />}
              <button
                type="button"
                onClick={() => { setOpen(false); item.onClick(); }}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold transition-colors text-left',
                  item.danger
                    ? 'text-error-500 hover:bg-error-50'
                    : 'text-secondary-700 hover:bg-secondary-50',
                ].join(' ')}
              >
                {item.icon}
                {item.label}
              </button>
            </div>
          ))}
        </div>,
        document.getElementById('portal-root') ?? document.body
      )}
    </div>
  );
}
