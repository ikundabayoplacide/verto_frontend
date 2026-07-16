import type { AvatarProps } from '../../types';

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  shape = 'circle',
  className = '',
}: AvatarProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={[
          'object-cover shrink-0 bg-primary-700',
          sizeClasses[size],
          shapeClass,
          className,
        ].join(' ')}
      />
    );
  }

  return (
    <span
      aria-label={alt || initials}
      className={[
        'inline-flex items-center justify-center shrink-0 select-none',
        'bg-primary-600 text-secondary-50 font-semibold uppercase',
        sizeClasses[size],
        shapeClass,
        className,
      ].join(' ')}
    >
      {initials?.slice(0, 2) ?? '?'}
    </span>
  );
}
