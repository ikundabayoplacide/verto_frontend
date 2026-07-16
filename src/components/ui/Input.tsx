import { forwardRef } from 'react';
import type { InputProps } from '../../types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      inputClassName = '',
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(error);

    return (
      <div className={['flex flex-col gap-1', fullWidth ? 'w-full' : 'w-fit', className].join(' ')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-secondary-200"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span
              aria-hidden="true"
              className="absolute left-3 text-secondary-400 pointer-events-none"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            aria-invalid={hasError}
            className={[
              'rounded-lg border bg-primary-900/60 text-secondary-100 placeholder-secondary-500',
              'text-sm py-2.5 transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-primary-900',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon ? 'pl-9' : 'pl-3',
              rightIcon ? 'pr-9' : 'pr-3',
              fullWidth ? 'w-full' : '',
              hasError
                ? 'border-error-500 focus:ring-error-400'
                : 'border-primary-700 focus:border-primary-500 focus:ring-primary-500',
              inputClassName,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />

          {rightIcon && (
            <span
              aria-hidden="true"
              className="absolute right-3 text-secondary-400 pointer-events-none"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {hasError && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-error-400">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-secondary-400">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
