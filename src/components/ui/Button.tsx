import type { ButtonProps } from '../../types';
import { Spinner } from './Spinner';

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary-500 text-secondary-50 hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-400',
  secondary:
    'bg-secondary-500 text-secondary-50 hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary-400',
  outline:
    'border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-secondary-50 active:bg-primary-600 focus-visible:ring-primary-400 bg-transparent',
  ghost:
    'text-primary-400 hover:bg-primary-500/10 active:bg-primary-500/20 focus-visible:ring-primary-400 bg-transparent',
  danger:
    'bg-error-500 text-secondary-50 hover:bg-error-600 active:bg-error-700 focus-visible:ring-error-400',
  success:
    'bg-success-500 text-secondary-50 hover:bg-success-600 active:bg-success-700 focus-visible:ring-success-400',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3.5 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
  xl: 'px-6 py-3 text-lg gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center rounded-lg font-semibold',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <Spinner size="sm" color={variant === 'outline' || variant === 'ghost' ? 'primary' : 'white'} />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
