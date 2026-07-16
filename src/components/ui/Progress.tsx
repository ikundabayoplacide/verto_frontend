import type { ProgressProps } from '../../types';

const sizeClasses: Record<NonNullable<ProgressProps['size']>, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const colorClasses: Record<NonNullable<ProgressProps['color']>, string> = {
  primary:   'bg-primary-500',
  success:   'bg-success-500',
  error:     'bg-error-500',
  secondary: 'bg-secondary-400',
};

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  color = 'primary',
  className = '',
  animated = false,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-secondary-300">
          {label && <span>{label}</span>}
          {showValue && (
            <span className="font-medium tabular-nums">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Progress'}
        className={['w-full rounded-full bg-primary-700 overflow-hidden', sizeClasses[size]].join(' ')}
      >
        <div
          className={[
            'h-full rounded-full transition-[width] duration-500 ease-out',
            colorClasses[color],
            animated ? 'relative overflow-hidden' : '',
          ].join(' ')}
          style={{ width: `${pct}%` }}
        >
          {animated && (
            <span
              aria-hidden="true"
              className="absolute inset-0 -skew-x-12 bg-white/20 animate-[shimmer_1.5s_ease-in-out_infinite]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
