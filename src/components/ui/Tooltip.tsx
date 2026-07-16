import type { TooltipProps } from '../../types';

const positionClasses: Record<NonNullable<TooltipProps['position']>, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<NonNullable<TooltipProps['position']>, string> = {
  top:    'top-full left-1/2 -translate-x-1/2 border-t-secondary-800',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-secondary-800',
  left:   'left-full top-1/2 -translate-y-1/2 border-l-secondary-800',
  right:  'right-full top-1/2 -translate-y-1/2 border-r-secondary-800',
};

export function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
}: TooltipProps) {
  return (
    <span className={['relative group inline-flex', className].join(' ')}>
      {children}

      <span
        role="tooltip"
        className={[
          'pointer-events-none absolute z-50 w-max max-w-xs',
          'rounded-md bg-secondary-800 px-2.5 py-1.5 text-xs text-secondary-100 shadow-lg',
          'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
          'transition-opacity duration-150',
          positionClasses[position],
        ].join(' ')}
      >
        {content}
        {/* Arrow */}
        <span
          aria-hidden="true"
          className={[
            'absolute border-4 border-transparent',
            arrowClasses[position],
          ].join(' ')}
        />
      </span>
    </span>
  );
}
