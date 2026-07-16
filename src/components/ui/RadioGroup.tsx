import type { RadioGroupProps } from '../../types';

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  error,
  orientation = 'vertical',
  className = '',
}: RadioGroupProps) {
  return (
    <fieldset className={['flex flex-col gap-1', className].join(' ')}>
      {label && (
        <legend className="text-sm font-medium text-secondary-200 mb-1">{label}</legend>
      )}

      <div
        className={[
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        ].join(' ')}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[
              'inline-flex items-center gap-2 cursor-pointer select-none group',
              opt.disabled ? 'opacity-50 cursor-not-allowed' : '',
            ].join(' ')}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled}
              onChange={() => onChange(opt.value)}
              className="w-4 h-4 border-primary-600 bg-primary-900/60 text-primary-500
                focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-primary-900
                transition-colors duration-150 cursor-pointer
                disabled:cursor-not-allowed"
            />
            <span className="text-sm text-secondary-200">{opt.label}</span>
          </label>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-xs text-error-400 mt-0.5">
          {error}
        </p>
      )}
    </fieldset>
  );
}
