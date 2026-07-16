import { useState } from 'react';
import type { AccordionProps } from '../../types';

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className = '',
}: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpen);

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const isOpen = prev.includes(key);
      if (multiple) {
        return isOpen ? prev.filter((k) => k !== key) : [...prev, key];
      }
      return isOpen ? [] : [key];
    });
  };

  return (
    <div className={['flex flex-col divide-y divide-primary-700', className].join(' ')}>
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);
        return (
          <div key={item.key}>
            <button
              type="button"
              id={`accordion-btn-${item.key}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.key}`}
              disabled={item.disabled}
              onClick={() => toggle(item.key)}
              className={[
                'w-full flex items-center justify-between gap-4 py-4 text-left',
                'text-sm font-medium transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:rounded',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                isOpen ? 'text-primary-300' : 'text-secondary-200 hover:text-secondary-100',
              ].join(' ')}
            >
              <span>{item.title}</span>
              <svg
                aria-hidden="true"
                className={['w-4 h-4 shrink-0 transition-transform duration-200', isOpen ? 'rotate-180' : ''].join(' ')}
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              id={`accordion-panel-${item.key}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.key}`}
              hidden={!isOpen}
              className="pb-4 text-sm text-secondary-300 leading-relaxed"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
