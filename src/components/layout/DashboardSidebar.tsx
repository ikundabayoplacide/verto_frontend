import { useState } from 'react';
import {
    FiAward,
    FiBarChart2,
    FiBell,
    FiBriefcase,
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
    FiClock,
    FiCloud,
    FiHome,
    FiImage,
    FiLogOut,
    FiMessageSquare,
    FiSettings,
    FiStar,
    FiUsers,
} from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import Logo from '../../assets/Logo.png';

interface SidebarItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  children?: SidebarItem[];
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
  adminOnly?: boolean;
}

const SECTIONS: SidebarSection[] = [
  {
    items: [
      { label: 'Dashboard', href: '/dashboard',           icon: <FiHome />      },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Services',      href: '/dashboard/services',      icon: <FiBriefcase />    },
      { label: 'Team',          href: '/dashboard/team',          icon: <FiUsers />        },
      { label: 'Testimonials',  href: '/dashboard/testimonials',  icon: <FiMessageSquare />},
      { label: 'Core Values',   href: '/dashboard/core-values',   icon: <FiStar />         },
      { label: 'Media',         href: '/dashboard/media',         icon: <FiImage />        },
      { label: 'Hero Slides',      href: '/dashboard/hero-slides',      icon: <FiImage />        },
      { label: 'Timeline',         href: '/dashboard/timeline',         icon: <FiClock />        },
      { label: 'Certificates',     href: '/dashboard/certificates',     icon: <FiAward />        },
      { label: 'Impact in Numbers', href: '/dashboard/impact-numbers',  icon: <FiBarChart2 />    },
      { label: 'Pillars',          href: '/dashboard/pillars',          icon: <FiStar />         },
      { label: 'Sustainability',   href: '/dashboard/sustainability-action', icon: <FiStar />     },
      { label: 'Commitments',      href: '/dashboard/commitments',      icon: <FiStar />         },
      { label: 'News & Highlights', href: '/dashboard/news-highlights', icon: <FiImage />        },
      { label: 'Partners',      href: '/dashboard/partners',      icon: <FiUsers />        },
    ],
  },
  {
    title: 'Admin',
    adminOnly: true,
    items: [
      { label: 'Contacts',     href: '/dashboard/contacts',     icon: <FiMessageSquare /> },
      { label: 'Stats',        href: '/dashboard/stats',        icon: <FiBarChart2 />     },
      { label: 'Users',        href: '/dashboard/users',        icon: <FiUsers />         },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Notifications', href: '/dashboard/notifications', icon: <FiBell /> },
      {
        label: 'Settings',
        icon: <FiSettings />,
        adminOnly: true,
        children: [
          { label: 'Cloudinary', href: '/dashboard/settings', icon: <FiCloud /> },
          { label: 'Email',      href: '/dashboard/settings/email', icon: <FiSettings /> },
        ],
      },
    ],
  },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle:  () => void;
  onLogout:  () => void;
}

export function DashboardSidebar({ collapsed, onToggle, onLogout }: DashboardSidebarProps) {
  const isAdmin = useAppSelector(selectIsAdmin);
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderItem = (item: SidebarItem) => {
    if (item.children) {
      const isExpanded = expanded[item.label] ?? pathname.startsWith('/dashboard/settings');
      return (
        <div key={item.label} className="flex flex-col">
          <button
            type="button"
            onClick={() => {
              if (!collapsed) toggleExpanded(item.label);
              // when collapsed, navigate to first child
            }}
            title={collapsed ? item.label : undefined}
            className={[
              'flex items-center gap-3 rounded-lg text-sm font-medium w-full text-left',
              'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
              collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
              pathname.startsWith('/dashboard/settings')
                ? 'bg-accent-700 text-white'
                : 'text-secondary-400 hover:bg-primary-800 hover:text-secondary-100',
            ].join(' ')}
          >
            <span className="text-[17px] shrink-0">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="whitespace-nowrap truncate flex-1 text-left">{item.label}</span>
                <FiChevronDown
                  className={[
                    'w-3.5 h-3.5 transition-transform duration-200 shrink-0',
                    isExpanded ? 'rotate-0' : '-rotate-90',
                  ].join(' ')}
                />
              </>
            )}
          </button>
          {!collapsed && isExpanded && (
            <div className="flex flex-col ml-2">
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  to={child.href!}
                  end
                  className={({ isActive }) => [
                    'flex items-center gap-3 rounded-lg text-sm font-medium',
                    'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
                    'px-3 py-2',
                    isActive
                      ? 'bg-accent-700 text-white'
                      : 'text-secondary-400 hover:bg-primary-800 hover:text-secondary-100',
                  ].join(' ')}
                >
                  <span className="text-[15px] shrink-0">{child.icon}</span>
                  <span className="whitespace-nowrap truncate">{child.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.href}
        to={item.href!}
        end={item.href === '/dashboard'}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) => [
          'flex items-center gap-3 rounded-lg text-sm font-medium',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
          collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
          isActive
            ? 'bg-accent-700 text-white'
            : 'text-secondary-400 hover:bg-primary-800 hover:text-secondary-100',
        ].join(' ')}
      >
        <span className="text-[17px] shrink-0">{item.icon}</span>
        {!collapsed && (
          <span className="whitespace-nowrap truncate">{item.label}</span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className={[
        'relative flex flex-col bg-primary-900 border-r border-primary-900',
        'transition-all duration-300 ease-in-out shrink-0 h-full',
        collapsed ? 'w-16' : 'w-60',
      ].join(' ')}
    >
      {/* ── Logo ── */}
      <div className={[
        'flex items-center h-16 border-b border-primary-800 shrink-0 overflow-hidden',
        collapsed ? 'justify-center px-0' : 'px-5 gap-3',
      ].join(' ')}>
        <img
          src={Logo}
          alt="Verto Holdings"
          className={['object-contain transition-all duration-300', collapsed ? 'h-7' : 'h-8'].join(' ')}
        />
        {!collapsed && (
          <span className="text-xs font-bold text-secondary-400 uppercase tracking-widest whitespace-nowrap">
            Portal
          </span>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 no-scrollbar flex flex-col gap-4">
        {SECTIONS.map((section, si) => {
          if (section.adminOnly && !isAdmin) return null;

          const visibleItems = section.items.filter(
            (item) => !item.adminOnly || isAdmin,
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={si} className="flex flex-col gap-0.5 px-2">
              {section.title && !collapsed && (
                <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-secondary-600">
                  {section.title}
                </p>
              )}
              {section.title && collapsed && (
                <div className="h-px bg-primary-800 mx-2 mb-2" />
              )}

              {visibleItems.map((item) => renderItem(item))}
            </div>
          );
        })}
      </nav>

      {/* ── Logout ── */}
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
          <span className="text-[17px] shrink-0"><FiLogOut /></span>
          {!collapsed && <span className="whitespace-nowrap">Sign out</span>}
        </button>
      </div>

      {/* ── Collapse toggle ── */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={[
          'absolute -right-3 top-[72px] z-10',
          'w-6 h-6 rounded-full bg-primary-700 border border-primary-600',
          'flex items-center justify-center text-secondary-300',
          'hover:bg-primary-600 hover:text-white transition-colors duration-150 shadow-md',
        ].join(' ')}
      >
        {collapsed
          ? <FiChevronRight className="w-3 h-3" />
          : <FiChevronLeft  className="w-3 h-3" />}
      </button>
    </aside>
  );
}
