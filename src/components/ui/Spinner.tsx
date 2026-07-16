import type { SpinnerProps } from '../../types';

const sizeClasses: Record<NonNullable<SpinnerProps['size']>, string> = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
  xl: 'w-12 h-12 border-4',
};

const colorClasses: Record<NonNullable<SpinnerProps['color']>, string> = {
  primary: 'border-primary-300 border-t-primary-500',
  secondary: 'border-secondary-300 border-t-secondary-500',
  white: 'border-secondary-50/30 border-t-secondary-50',
};

export function Spinner({ size = 'md', color = 'primary', className = '' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        'inline-block rounded-full animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className,
      ].join(' ')}
    />
  );
}
