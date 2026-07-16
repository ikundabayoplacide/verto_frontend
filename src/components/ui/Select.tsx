import { forwardRef } from 'react';
import type { SelectProps } from '../../types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      helperText,
      error,
      fullWidth = false,
      placeholder,
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(error);

    return (
      <div className={['flex flex-col gap-1', fullWidth ? 'w-full' : 'w-fit', className].join(' ')}>
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-secondary-200">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-describedby={
              error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            aria-invalid={hasError}
            className={[
              'appearance-none rounded-lg border bg-primary-900/60 text-secondary-100',
              'text-sm px-3 py-2.5 pr-9 transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-primary-900',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              fullWidth ? 'w-full' : '',
              hasError
                ? 'border-error-500 focus:ring-error-400'
                : 'border-primary-700 focus:border-primary-500 focus:ring-primary-500',
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* chevron icon */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {hasError && (
          <p id={`${selectId}-error`} role="alert" className="text-xs text-error-400">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${selectId}-helper`} className="text-xs text-secondary-400">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
