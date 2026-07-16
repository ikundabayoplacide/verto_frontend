import type { PaginationProps } from '../../types';

function PageButton({
  display,
  ariaLabel,
  current,
  onClick,
  disabled = false,
}: {
  display: React.ReactNode;
  ariaLabel: string;
  current?: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={current ? 'page' : undefined}
      className={[
        'w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        current
          ? 'bg-primary-500 text-secondary-50'
          : 'text-secondary-300 hover:bg-primary-700 hover:text-secondary-100',
      ].join(' ')}
    >
      {display}
    </button>
  );
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  showEdges = true,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getRange = (): (number | '...')[] => {
    const delta = 2;
    const range: (number | '...')[] = [];
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    range.push(1);
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push('...');
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <nav aria-label="Pagination" className={['flex items-center gap-1 flex-wrap', className].join(' ')}>
      {showEdges && (
        <PageButton
          display="«"
          ariaLabel="First page"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        />
      )}

      <PageButton
        display="‹"
        ariaLabel="Previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      />

      {getRange().map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-secondary-500 text-sm select-none">
            …
          </span>
        ) : (
          <PageButton
            key={p}
            display={p}
            ariaLabel={`Page ${p}`}
            current={p === page}
            onClick={() => onPageChange(p as number)}
          />
        ),
      )}

      <PageButton
        display="›"
        ariaLabel="Next page"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      />

      {showEdges && (
        <PageButton
          display="»"
          ariaLabel="Last page"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        />
      )}
    </nav>
  );
}
