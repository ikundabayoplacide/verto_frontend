import { useState } from 'react';
import type { TabsProps } from '../../types';

export function Tabs({ items, defaultKey, onChange, className = '' }: TabsProps) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key ?? '');

  const handleSelect = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  const activeItem = items.find((it) => it.key === active);

  return (
    <div className={['flex flex-col', className].join(' ')}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex gap-1 border-b border-primary-700 overflow-x-auto no-scrollbar"
      >
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            type="button"
            id={`tab-${item.key}`}
            aria-selected={active === item.key}
            aria-controls={`tabpanel-${item.key}`}
            disabled={item.disabled}
            onClick={() => handleSelect(item.key)}
            className={[
              'inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap',
              'border-b-2 -mb-px transition-colors duration-150 focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              active === item.key
                ? 'border-primary-400 text-primary-300'
                : 'border-transparent text-secondary-400 hover:text-secondary-200 hover:border-secondary-600',
            ].join(' ')}
          >
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {items.map((item) => (
        <div
          key={item.key}
          role="tabpanel"
          id={`tabpanel-${item.key}`}
          aria-labelledby={`tab-${item.key}`}
          hidden={active !== item.key}
          className="pt-4"
        >
          {activeItem?.key === item.key && item.content}
        </div>
      ))}
    </div>
  );
}
