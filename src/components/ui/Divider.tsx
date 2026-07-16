import type { DividerProps } from '../../types';

export function Divider({
  label,
  orientation = 'horizontal',
  className = '',
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        aria-hidden="true"
        className={['self-stretch w-px bg-primary-700', className].join(' ')}
      />
    );
  }

  if (label) {
    return (
      <div className={['flex items-center gap-3 w-full', className].join(' ')}>
        <div aria-hidden="true" className="flex-1 h-px bg-primary-700" />
        <span className="text-xs text-secondary-400 shrink-0">{label}</span>
        <div aria-hidden="true" className="flex-1 h-px bg-primary-700" />
      </div>
    );
  }

  return (
    <hr
      aria-hidden="true"
      className={['border-0 h-px bg-primary-700 w-full', className].join(' ')}
    />
  );
}
