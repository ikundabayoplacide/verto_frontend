import { useState } from 'react';
import { FiBell, FiMenu, FiX } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';import Logo from '../../assets/Logo.png';
// import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout() {
  const navigate   = useNavigate();
  // const [collapsed,   setCollapsed]   = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);


  return (
    <div className="flex h-screen bg-secondary-50">

      {/* ── Mobile sidebar overlay ── */}
      {mobileSidebar && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* ── Mobile sidebar (always full width, no collapse) ── */}
      <div className={[
        'fixed top-0 left-0 z-50 h-full md:hidden',
        'transition-transform duration-300 ease-in-out',
        mobileSidebar ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}>
        {/* <DashboardSidebar
          collapsed={false}
          onToggle={() => setMobileSidebar(false)}
        /> */}
      </div>

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex">
        {/* <DashboardSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
        /> */}
      </div>

      {/* ── Main area ── */}
      <div className="flex flex-col flex-1 min-w-0">

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
          <div className="md:hidden flex items-center">
            <img src={Logo} alt="H&M Group" className="h-8 object-contain" />
          </div>

          {/* Page title slot — filled via context or leave empty */}
          <div className="hidden md:block flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/dashboard/notifications')}
              className="relative p-2 rounded-lg text-secondary-500 hover:bg-secondary-100 transition-colors"
            >
              <FiBell className="w-5 h-5" />
              {/* Badge */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error-500" />
            </button>

            {/* Avatar */}
            <button
              type="button"
              aria-label="Account"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                AD
              </div>
              <span className="hidden sm:block text-sm font-medium text-secondary-700">Admin</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Portal root — outside all overflow containers so fixed menus render correctly */}
      <div id="portal-root" />
    </div>
  );
}
