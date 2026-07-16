import { forwardRef } from 'react';
import type { CheckboxProps } from '../../types';

const sizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, size = 'md', className = '', id, ...props }, ref) => {
    const checkId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={['flex flex-col gap-1', className].join(' ')}>
        <label className="inline-flex items-center gap-2 cursor-pointer select-none group">
          <input
            ref={ref}
            type="checkbox"
            id={checkId}
            aria-invalid={Boolean(error)}
            className={[
              'rounded border-primary-600 bg-primary-900/60 text-primary-500',
              'focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-primary-900',
              'transition-colors duration-150 cursor-pointer',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[size],
            ].join(' ')}
            {...props}
          />
          {label && (
            <span className="text-sm text-secondary-200 group-has-[:disabled]:opacity-50">
              {label}
            </span>
          )}
        </label>

        {error && (
          <p role="alert" className="text-xs text-error-400 ml-6">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
