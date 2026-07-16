import type { StatCardProps } from '../../types';

export function StatCard({ title, value, subtitle, icon, trend, className = '' }: StatCardProps) {
  const trendPositive = trend && trend.value >= 0;

  return (
    <div
      className={[
        'rounded-xl bg-primary-800 border border-primary-700 p-5',
        'flex flex-col gap-3',
        className,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-secondary-400">{title}</p>
        {icon && (
          <span className="shrink-0 w-10 h-10 rounded-lg bg-primary-700 flex items-center justify-center text-primary-300">
            {icon}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-2xl font-bold text-secondary-100 tabular-nums">{value}</p>
        {subtitle && <p className="text-xs text-secondary-500">{subtitle}</p>}
      </div>

      {trend && (
        <p
          className={[
            'inline-flex items-center gap-1 text-xs font-medium',
            trendPositive ? 'text-success-400' : 'text-error-400',
          ].join(' ')}
        >
          <span aria-hidden="true">{trendPositive ? '▲' : '▼'}</span>
          {Math.abs(trend.value)}%
          {trend.label && <span className="text-secondary-500 font-normal">{trend.label}</span>}
        </p>
      )}
    </div>
  );
}
