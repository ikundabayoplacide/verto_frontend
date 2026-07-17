import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { ImigongoPattern } from '../common/ImigongoPattern';
import { SERVICES_DATA } from '../../data/services';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const NAV_SERVICES = SERVICES_DATA.map(s => ({ label: s.title, href: `/services/${s.slug}` }));

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Who we are", href: "/about" },
  { label: "Services", href: "/services", children: NAV_SERVICES },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Media", href: "/" },
  { label: "Contact", href: "/" },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [dropdownKey, setDropdownKey] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); setDropdownKey(null); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDropdownKey(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setDropdownKey(null); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  /* lock body scroll when sidebar is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'text-base font-bold transition-colors duration-150 relative',
      'after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary-400',
      'after:transition-all after:duration-200',
      isActive
        ? 'text-primary-500 after:w-full'
        : 'text-primary-900 hover:text-primary-700 after:w-0 hover:after:w-full',
    ].join(' ');

  return (
    <>
      {/* Dropdown backdrop — closes menu when clicking anywhere outside */}
      {dropdownKey && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30"
          onClick={() => setDropdownKey(null)}
        />
      )}

      <header
        className={[
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-primary-50 backdrop-blur-md shadow-lg shadow-primary-900/50'
            : 'bg-primary-50 backdrop-blur-md',
        ].join(' ')}
      >
        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between"
        >
          {/* Logo */}
          <Link to="/" aria-label="Verto Holdings — Home" className="shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded">
            <img src={Logo} alt="Verto Holdings Ltd" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={dropdownKey === item.label}
                    onClick={() => setDropdownKey((k) => (k === item.label ? null : item.label))}
                    className="inline-flex items-center gap-1 text-base font-bold text-primary-900 hover:text-primary-500 transition-colors duration-150"
                  >
                    {item.label}
                    <svg aria-hidden="true" className={['w-3.5 h-3.5 transition-transform duration-200', dropdownKey === item.label ? 'rotate-180' : ''].join(' ')} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {dropdownKey === item.label && (
                    <ul role="menu" className="absolute top-full left-0 mt-2 w-60 rounded-xl bg-primary-800 border border-primary-700 shadow-xl overflow-hidden py-1 z-50"
                        onMouseEnter={() => setDropdownKey(item.label)}
                        onMouseLeave={() => setDropdownKey(null)}>
                      {item.children!.map((child) => (
                        <li key={child.href} role="none">
                          <NavLink to={child.href} role="menuitem" className={({ isActive }) => ['block px-4 py-2.5 text-sm transition-colors duration-100', isActive ? 'bg-primary-700 text-primary-300 font-medium' : 'text-secondary-100 hover:bg-primary-700/60 hover:text-secondary-100'].join(' ')}>
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink to={item.href} className={activeLinkClass}>{item.label}</NavLink>
                </li>
              )
            )}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-secondary-50 text-sm font-semibold hover:bg-primary-600 active:bg-primary-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-controls="mobile-sidebar"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-secondary-300 hover:text-secondary-100 hover:bg-primary-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        <ImigongoPattern position="bottom" height={10} />
      </header>

      {/* ── Mobile sidebar overlay ── */}
      {menuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile sidebar panel ── */}
      <aside
        id="mobile-sidebar"
        aria-label="Mobile navigation"
        className={[
          'fixed top-0 right-0 z-50 h-full w-72 bg-primary-900 flex flex-col md:hidden',
          'transition-transform duration-300 ease-in-out',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary-700">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={Logo} alt="Verto Holdings Ltd" className="h-9 w-auto object-contain" />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-lg text-secondary-300 hover:text-secondary-100 hover:bg-primary-700 transition-colors duration-150"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Imigongo accent */}
        <div className="relative h-[10px] shrink-0">
          <ImigongoPattern height={10} />
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setDropdownKey((k) => (k === item.label ? null : item.label))}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-secondary-300 hover:bg-primary-800 hover:text-secondary-100 transition-colors duration-150 rounded-lg"
                  >
                    {item.label}
                    <svg aria-hidden="true" className={['w-4 h-4 transition-transform duration-200', dropdownKey === item.label ? 'rotate-180' : ''].join(' ')} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {dropdownKey === item.label && (
                    <ul className="mt-1 ml-3 border-l border-primary-700 pl-3 flex flex-col gap-0.5">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href}
                            className={({ isActive }) => ['block px-3 py-2 text-sm rounded-lg transition-colors duration-100', isActive ? 'text-primary-300 font-medium bg-primary-800' : 'text-secondary-400 hover:text-secondary-100 hover:bg-primary-800'].join(' ')}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => ['block px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-150', isActive ? 'bg-primary-700 text-primary-300' : 'text-secondary-300 hover:bg-primary-800 hover:text-secondary-100'].join(' ')}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Sidebar footer CTA */}
        <div className="px-4 py-5 border-t border-primary-700">
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center px-4 py-3 bg-primary-500 text-secondary-50 text-sm font-bold uppercase tracking-widest hover:bg-primary-400 transition-colors duration-150 rounded-lg"
          >
            Get a Free Quote
          </Link>
          <p className="text-xs text-secondary-500 text-center mt-3">+250 788 359 600</p>
        </div>
      </aside>
    </>
  );
}
