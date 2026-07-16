import type { ToggleProps } from '../../types';

const sizeMap = {
  sm: { track: 'w-8 h-4',  thumb: 'w-3 h-3',   on: 'translate-x-4', off: 'translate-x-0.5' },
  md: { track: 'w-10 h-5', thumb: 'w-4 h-4',   on: 'translate-x-5', off: 'translate-x-0.5' },
  lg: { track: 'w-12 h-6', thumb: 'w-5 h-5',   on: 'translate-x-6', off: 'translate-x-0.5' },
};

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}: ToggleProps) {
  const s = sizeMap[size];

  return (
    <label
      className={[
        'inline-flex items-center gap-2.5 cursor-pointer select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          'relative inline-flex shrink-0 rounded-full transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:ring-offset-primary-900',
          s.track,
          checked ? 'bg-primary-500' : 'bg-secondary-600',
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'absolute top-0.5 rounded-full bg-secondary-50 shadow-sm transition-transform duration-200',
            s.thumb,
            checked ? s.on : s.off,
          ].join(' ')}
        />
      </button>

      {label && <span className="text-sm text-secondary-200">{label}</span>}
    </label>
  );
}
