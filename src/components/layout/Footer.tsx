
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const SERVICES_LINKS = [
  { label: 'Capital Raising',           href: '/services/capital-raising' },
  { label: 'Business Plan Development', href: '/services/business-plan' },
  { label: 'Asset Management',          href: '/services/asset-management' },
  // { label: 'Corporate Finance',         href: '/services/corporate-finance' },
  // { label: 'Private Equity',            href: '/services/private-equity' },
  // { label: 'Sustainable Finance',       href: '/services/esg-sustainable-finance' },
  // { label: 'Commodity Trading',         href: '/services/commodities-trading' },
];

const COMPANY = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact',  href: '/contact' },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function ImigongoPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 left-0 w-full"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="zigzag"
          x="0"
          y="0"
          width="40"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="40" height="18" fill="#1a2f7a" />
          {/* Two interleaved zigzag rows */}
          <polyline
            points="0,9 10,1 20,9 30,1 40,9 50,1"
            fill="none"
            stroke="#eee9d8"
            strokeWidth="4"
            strokeLinejoin="miter"
          />
          <polyline
            points="0,17 10,9 20,17 30,9 40,17 50,9"
            fill="none"
            stroke="#f3f1e9"
            strokeWidth="4"
            strokeLinejoin="miter"
          />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill="url(#zigzag)" />
    </svg>
  );
}



export function Footer() {
  const year = new Date().getFullYear();



  return (
    <footer className="relative bg-primary-900 border-t border-primary-700">
      <img src="/images/imigongo.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
      <div className="w-full h-[18px] overflow-hidden relative">
        <ImigongoPattern />
      </div>
      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link to="/" aria-label="Verto Holdings  Home">
            <img
              src={Logo}
              alt="Verto Holdings Ltd"
              className="h-12 w-auto object-contain"
            />
          </Link>
        
          {/* Socials */}
          <ul className="flex items-center gap-3 mt-1" role="list">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center
                    text-secondary-400 bg-primary-800 border border-primary-700
                    hover:text-primary-300 hover:border-primary-500
                    transition-colors duration-150 focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-secondary-100 uppercase tracking-wider">
            Services
          </h3>
          <ul className="flex flex-col gap-2" role="list">
            {SERVICES_LINKS.map((s) => (
              <li key={s.href}>
                <Link
                  to={s.href}
                  className="text-sm text-secondary-100 hover:text-primary-300 transition-colors duration-150"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-secondary-100 uppercase tracking-wider">
            Company
          </h3>
          <ul className="flex flex-col gap-2" role="list">
            {COMPANY.map((c) => (
              <li key={c.href}>
                <Link
                  to={c.href}
                  className="text-sm text-secondary-100 hover:text-primary-300 transition-colors duration-150"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-secondary-100 uppercase tracking-wider">
            Contact
          </h3>
          <ul className="flex flex-col gap-3" role="list">
            <li className="flex items-start gap-2.5 text-sm text-secondary-100">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>KG 9 Ave, Nyarugenge, Kigali</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-secondary-100">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href="+250 788 359 600"
                className="hover:text-primary-300 transition-colors duration-150"
              >
                +250 788 359 600
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-secondary-100">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:info@verto.rw"
                className="hover:text-primary-300 transition-colors duration-150 break-all"
              >
                info@verto.rw
              </a>
            </li>
          </ul>


        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-secondary-100">
          <p>
            © {year} Verto Holdings Ltd. All rights reserved. Powered by{" "}
            <a
              href="https://santechinnovate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-700 transition-colors duration-150 font-bold"
            >
              SANTECH
            </a>
          </p>
          {/* <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="hover:text-secondary-300 transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-secondary-300 transition-colors duration-150"
            >
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
