import type { CardProps } from '../../types';

const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-7',
};

const shadowClasses: Record<NonNullable<CardProps['shadow']>, string> = {
  none: '',
  sm:   'shadow-sm',
  md:   'shadow-md',
  lg:   'shadow-lg',
};

export function Card({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  hover = false,
}: CardProps) {
  return (
    <div
      className={[
        'rounded-xl bg-primary-800',
        paddingClasses[padding],
        shadowClasses[shadow],
        border ? 'border border-primary-700' : '',
        hover
          ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-primary-500 cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
