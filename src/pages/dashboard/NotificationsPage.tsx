import { FiBell, FiCheck, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { useDeleteNotificationMutation, useGetNotificationsQuery, useMarkAllNotificationsReadMutation, useMarkNotificationReadMutation } from '../../app/api';
import type { Notification } from '../../app/api';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';

export function NotificationsPage() {
  const { data, isLoading } = useGetNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();
  const [remove] = useDeleteNotificationMutation();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Notifications</h1>
          <p className="text-sm text-secondary-400">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" leftIcon={<FiCheckCircle />} onClick={() => markAllRead()}>
            Mark all as read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-secondary-200 flex flex-col items-center justify-center gap-3 py-16 text-secondary-400">
          <FiBell className="w-10 h-10" />
          <p className="text-sm font-medium">No notifications yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n: Notification) => (
            <div
              key={n.id}
              className={[
                'bg-white rounded-xl border transition-colors',
                n.read ? 'border-secondary-200' : 'border-primary-200 bg-primary-50/40',
              ].join(' ')}
            >
              <div className="flex items-start gap-3 p-4">
                <div className={[
                  'mt-0.5 w-2 h-2 rounded-full shrink-0',
                  n.read ? 'bg-transparent' : 'bg-primary-500',
                ].join(' ')} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={[
                        'text-sm',
                        n.read ? 'text-secondary-700' : 'text-secondary-900 font-semibold',
                      ].join(' ')}>
                        {n.title}
                      </p>
                      {n.message && (
                        <p className="text-xs text-secondary-500 mt-0.5 line-clamp-2">{n.message}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-secondary-400 whitespace-nowrap shrink-0">
                      {timeAgo(n.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    {!n.read && (
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        <FiCheck size={12} />
                        Mark read
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => remove(n.id)}
                      className="flex items-center gap-1 text-xs text-secondary-400 hover:text-error-500 transition-colors"
                    >
                      <FiTrash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
