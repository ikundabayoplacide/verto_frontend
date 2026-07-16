import {
  FiAward,
  FiBarChart2,
  FiBell,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiFolder,
  FiHome,
  FiImage,
  FiLogOut,
  FiMessageSquare,
  // FiPieChart,
  FiSettings,
  FiStar,
  FiUsers
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

const SECTIONS: SidebarSection[] = [
  {
    items: [
      { label: 'Dashboard',  href: '/dashboard',          icon: <FiHome />       },
      { label: 'Analytics',  href: '/dashboard/analytics', icon: <FiBarChart2 /> },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Projects',      href: '/dashboard/projects',      icon: <FiFolder />       },
      { label: 'Services',      href: '/dashboard/services',      icon: <FiBriefcase />    },
      { label: 'Team',          href: '/dashboard/team',          icon: <FiUsers />        },
      { label: 'Testimonials',  href: '/dashboard/testimonials',  icon: <FiMessageSquare />},
      { label: 'Core Values',   href: '/dashboard/core-values',   icon: <FiStar />         },
      { label: 'Applications',  href: '/dashboard/applications',  icon: <FiFileText />     },
      { label: 'Contacts',       href: '/dashboard/contacts',      icon: <FiMessageSquare />},
      { label: 'Clients',        href: '/dashboard/clients',       icon: <FiUsers />        },
      { label: 'Hero Slides',   href: '/dashboard/hero-slides',   icon: <FiImage />     },
      { label: 'Certificates',  href: '/dashboard/certificates',  icon: <FiAward />     },
      { label: 'Partners',      href: '/dashboard/partners',      icon: <FiUsers />     },
      { label: 'Sustainability', href: '/dashboard/sustainability', icon: <FiStar />     },
      { label: 'Media',         href: '/dashboard/media',         icon: <FiImage />     },
      // { label: 'Reports',       href: '/dashboard/reports',       icon: <FiPieChart />  },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Notifications', href: '/dashboard/notifications', icon: <FiBell />     },
      { label: 'Settings',      href: '/dashboard/settings',      icon: <FiSettings /> },
    ],
  },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export function DashboardSidebar({ collapsed, onToggle, onLogout }: DashboardSidebarProps) {
  return (
    <aside
      className={[
        'relative flex flex-col bg-primary-900 border-r border-primary-800',
        'transition-all duration-300 ease-in-out shrink-0 h-full',
        collapsed ? 'w-16' : 'w-60',
      ].join(' ')}
    >
      {/* Logo */}
      <div className={[
        'flex items-center h-16 border-b border-primary-800 shrink-0 overflow-hidden',
        collapsed ? 'justify-center px-0' : 'px-5 gap-3',
      ].join(' ')}>
        <img
          src={Logo}
          alt="H&M Group"
          className={['object-contain transition-all duration-300', collapsed ? 'h-7' : 'h-8'].join(' ')}
        />
        {!collapsed && (
          <span className="text-xs font-bold text-secondary-300 uppercase tracking-widest whitespace-nowrap">
            Portal
          </span>
        )}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 flex flex-col gap-5">
        {SECTIONS.map((section, si) => (
          <div key={si} className="flex flex-col gap-0.5 px-2">
            {/* Section title */}
            {section.title && !collapsed && (
              <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-secondary-600">
                {section.title}
              </p>
            )}
            {section.title && collapsed && (
              <div className="h-px bg-primary-800 mx-2 mb-2" />
            )}

            {section.items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/dashboard'}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) => [
                  'flex items-center gap-3 rounded-lg text-sm font-medium transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
                  collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
                  isActive
                    ? 'bg-primary-700 text-primary-300'
                    : 'text-secondary-400 hover:bg-primary-800 hover:text-secondary-100',
                ].join(' ')}
              >
                <span className="text-[18px] shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="whitespace-nowrap truncate">{item.label}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-3 border-t border-primary-800">
        <button
          type="button"
          onClick={onLogout}
          title={collapsed ? 'Sign out' : undefined}
          className={[
            'w-full flex items-center gap-3 rounded-lg text-sm font-medium',
            'text-secondary-400 hover:bg-error-900/40 hover:text-error-400 transition-colors duration-150',
            collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
          ].join(' ')}
        >
          <span className="text-[18px] shrink-0"><FiLogOut /></span>
          {!collapsed && <span className="whitespace-nowrap">Sign out</span>}
        </button>
      </div>

      {/* Collapse toggle button — sits on the right edge */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={[
          'absolute -right-3 top-[72px] z-10',
          'w-6 h-6 rounded-full bg-primary-700 border border-primary-600',
          'flex items-center justify-center text-secondary-300',
          'hover:bg-primary-600 hover:text-white transition-colors duration-150',
          'shadow-md',
        ].join(' ')}
      >
        {collapsed ? <FiChevronRight className="w-3 h-3" /> : <FiChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
