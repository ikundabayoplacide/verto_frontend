import { useEffect, useState } from 'react';
import { FiBell, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetMeQuery, useGetNotificationsQuery } from '../../app/api';
import { clearCredentials, selectCurrentUser, selectIsAdmin, setCredentials } from '../../app/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Logo from '../../assets/Logo.png';
import { Avatar } from '../ui/Avatar';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout() {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch();
  const user      = useAppSelector(selectCurrentUser);
  const isAdmin   = useAppSelector(selectIsAdmin);

  const { data: notifData } = useGetNotificationsQuery();
  const unreadCount = notifData?.unreadCount ?? 0;

  const [collapsed,     setCollapsed]     = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // On page refresh: token is in localStorage but Redux state is empty — refetch user
  const { data: meData } = useGetMeQuery(undefined, { skip: !!user });

  useEffect(() => {
    if (meData?.user) {
      const token = localStorage.getItem('token') ?? '';
      dispatch(setCredentials({ user: meData.user, token }));
    }
  }, [meData, dispatch]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/login');
  };

  const userInitials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'AD';

  return (
    <div className="flex h-screen bg-secondary-50 overflow-hidden">

      {/* ── Mobile overlay ── */}
      {mobileSidebar && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* ── Mobile sidebar ── */}
      <div className={[
        'fixed top-0 left-0 z-50 h-full md:hidden',
        'transition-transform duration-300 ease-in-out',
        mobileSidebar ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}>
        <DashboardSidebar
          collapsed={false}
          onToggle={() => setMobileSidebar(false)}
          onLogout={handleLogout}
        />
      </div>

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex shrink-0">
        <DashboardSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
          onLogout={handleLogout}
        />
      </div>

      {/* ── Main area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="h-16 shrink-0 bg-white border-b border-secondary-200 flex items-center justify-between px-4 md:px-6 gap-4">

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileSidebar(true)}
            className="md:hidden p-2 rounded-lg text-secondary-500 hover:bg-secondary-100 transition-colors"
          >
            {mobileSidebar ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>

          {/* Mobile logo */}
          <div className="md:hidden">
            <img src={Logo} alt="Verto Holdings" className="h-8 object-contain" />
          </div>

          {/* Desktop spacer */}
          <div className="hidden md:flex flex-1 items-center">
            <img src={Logo} alt="Verto Holdings" className="h-7 object-contain" />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">

            {/* Notifications */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/dashboard/notifications')}
              className="relative p-2 rounded-lg text-secondary-500 hover:bg-secondary-100 transition-colors"
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-error-500 text-[10px] font-bold text-white px-1 leading-none">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {/* User pill */}
            <button
              type="button"
              aria-label="Open profile"
              title="My profile"
              onClick={() => navigate('/dashboard/profile')}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-secondary-50 border border-secondary-200 hover:border-primary-400 transition-colors"
            >
              <Avatar initials={userInitials} size="xs" />
              <div className="hidden sm:block leading-tight text-left">
                <p className="text-xs font-semibold text-secondary-700 leading-none">
                  {user?.name ?? 'Admin'}
                </p>
                <p className={[
                  'text-[10px] font-medium uppercase tracking-wider leading-none mt-0.5',
                  isAdmin ? 'text-primary-500' : 'text-accent-600',
                ].join(' ')}>
                  {user?.role ?? 'admin'}
                </p>
              </div>
            </button>

            {/* Logout */}
            <button
              type="button"
              aria-label="Sign out"
              onClick={handleLogout}
              className="p-2 rounded-lg text-secondary-400 hover:bg-error-50 hover:text-error-500 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
