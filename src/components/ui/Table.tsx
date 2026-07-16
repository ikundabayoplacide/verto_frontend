import { useState } from 'react';
import type { TableColumn, TableProps } from '../../types';
import { Spinner } from './Spinner';

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  loading = false,
  emptyText = 'No data available.',
  className = '',
  onRowClick,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col.key);
      setSortDir('asc');
    }
  };

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : data;

  return (
    <div className={['w-full overflow-x-auto rounded-xl border border-primary-700', className].join(' ')}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-primary-700 bg-primary-900/60">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                onClick={() => handleSort(col)}
                className={[
                  'px-4 py-3 text-left text-xs font-semibold text-secondary-400 uppercase tracking-wider',
                  col.sortable ? 'cursor-pointer hover:text-secondary-200 select-none' : '',
                  col.className ?? '',
                ].join(' ')}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span aria-hidden="true" className="opacity-50">
                      {sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-primary-700/50">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center">
                <Spinner size="lg" className="mx-auto" />
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-secondary-500"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr
                key={String(row[keyField])}
                onClick={() => onRowClick?.(row)}
                className={[
                  'transition-colors duration-100',
                  onRowClick ? 'cursor-pointer hover:bg-primary-700/40' : 'hover:bg-primary-800/50',
                ].join(' ')}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={['px-4 py-3 text-secondary-200', col.className ?? ''].join(' ')}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
