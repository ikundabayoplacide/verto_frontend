import { forwardRef } from 'react';
import type { TextareaProps } from '../../types';

const resizeClasses: Record<NonNullable<TextareaProps['resize']>, string> = {
  none: 'resize-none',
  y: 'resize-y',
  x: 'resize-x',
  both: 'resize',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      resize = 'y',
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(error);

    return (
      <div className={['flex flex-col gap-1', fullWidth ? 'w-full' : 'w-fit', className].join(' ')}>
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-secondary-200">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          aria-invalid={hasError}
          className={[
            'rounded-lg border bg-primary-900/60 text-secondary-100 placeholder-secondary-500',
            'text-sm px-3 py-2.5 transition-colors duration-150 min-h-[96px]',
            'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-primary-900',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            fullWidth ? 'w-full' : '',
            resizeClasses[resize],
            hasError
              ? 'border-error-500 focus:ring-error-400'
              : 'border-primary-700 focus:border-primary-500 focus:ring-primary-500',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {hasError && (
          <p id={`${textareaId}-error`} role="alert" className="text-xs text-error-400">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${textareaId}-helper`} className="text-xs text-secondary-400">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
