import type { BadgeProps } from '../../types';

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-primary-500/15 text-primary-300 ring-1 ring-primary-500/30',
  secondary: 'bg-secondary-500/15 text-secondary-300 ring-1 ring-secondary-400/30',
  success: 'bg-success-500/15 text-success-400 ring-1 ring-success-500/30',
  error: 'bg-error-500/15 text-error-400 ring-1 ring-error-500/30',
  custom: 'bg-custom-200/20 text-custom-400 ring-1 ring-custom-400/30',
};

const dotClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-primary-400',
  secondary: 'bg-secondary-400',
  success: 'bg-success-400',
  error: 'bg-error-400',
  custom: 'bg-custom-500',
};

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={['w-1.5 h-1.5 rounded-full shrink-0', dotClasses[variant]].join(' ')}
        />
      )}
      {label}
    </span>
  );
}
