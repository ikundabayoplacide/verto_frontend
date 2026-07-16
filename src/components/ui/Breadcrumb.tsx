import { Link } from 'react-router-dom';
import type { BreadcrumbProps } from '../../types';

export function Breadcrumb({ items, separator, className = '' }: BreadcrumbProps) {
  const sep = separator ?? (
    <svg
      aria-hidden="true"
      className="w-3.5 h-3.5 text-secondary-500 shrink-0"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9 8 6.22 5.28a.75.75 0 010-1.06z" />
    </svg>
  );

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1 flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-sm font-medium text-secondary-100"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="text-sm text-secondary-400 hover:text-primary-300 transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-secondary-400">{item.label}</span>
                  )}
                  {sep}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
