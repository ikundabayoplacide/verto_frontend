import {
  FiActivity, FiAnchor, FiAperture, FiAward, FiBattery, FiBookOpen,
  FiBriefcase, FiBox, FiCalendar, FiCamera, FiCheckCircle, FiClock,
  FiCloud, FiCoffee, FiCompass, FiCreditCard, FiDollarSign, FiDroplet,
  FiEdit, FiEye, FiGlobe, FiHeart, FiHome, FiImage,
  FiLayers, FiGift, FiLink, FiLock, FiMap, FiMessageCircle, FiMoon,
  FiPhone, FiPieChart, FiPlay, FiPower,
  FiSearch, FiSend, FiSettings, FiShare2, FiShield, FiStar, FiSun,
  FiTag, FiTarget, FiThumbsUp, FiTool, FiTrendingUp, FiUmbrella,
  FiUsers, FiZap,
} from 'react-icons/fi';

const ICONS: { label: string; icon: React.ReactNode; path: string }[] = [
  { label: 'Activity',    icon: <FiActivity />,    path: 'M12 2a10 10 0 100 20 10 10 0 000-20z' },
  { label: 'Anchor',      icon: <FiAnchor />,      path: 'M12 2a3 3 0 00-3 3c0 1.1.9 2 2 2h2a2 2 0 002-2 3 3 0 00-3-3zM5 20h14' },
  { label: 'Aperture',    icon: <FiAperture />,    path: 'M12 2a10 10 0 100 20 10 10 0 000-20z' },
  { label: 'Award',       icon: <FiAward />,       path: 'M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z' },
  { label: 'Battery',     icon: <FiBattery />,     path: 'M17 6H3v12h14V6z' },
  { label: 'Book',        icon: <FiBookOpen />,    path: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z' },
  { label: 'Briefcase',   icon: <FiBriefcase />,   path: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2' },
  { label: 'Box',         icon: <FiBox />,         path: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z' },
  { label: 'Calendar',    icon: <FiCalendar />,    path: 'M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18' },
  { label: 'Camera',      icon: <FiCamera />,      path: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z' },
  { label: 'Check',       icon: <FiCheckCircle />, path: 'M22 11.08V12a10 10 0 11-5.93-9.14' },
  { label: 'Clock',       icon: <FiClock />,       path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2' },
  { label: 'Cloud',       icon: <FiCloud />,       path: 'M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z' },
  { label: 'Coffee',      icon: <FiCoffee />,      path: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3' },
  { label: 'Compass',     icon: <FiCompass />,     path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM16.24 7.76l-5.28 2.28-2.28 5.28 5.28-2.28 2.28-5.28z' },
  { label: 'Credit Card', icon: <FiCreditCard />,  path: 'M1 4h22v16H1V4zM1 10h22' },
  { label: 'Dollar',      icon: <FiDollarSign />,  path: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
  { label: 'Droplet',     icon: <FiDroplet />,     path: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z' },
  { label: 'Edit',        icon: <FiEdit />,        path: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' },
  { label: 'Eye',         icon: <FiEye />,         path: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z' },
  { label: 'Globe',       icon: <FiGlobe />,       path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z' },
  { label: 'Heart',       icon: <FiHeart />,       path: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z' },
  { label: 'Home',        icon: <FiHome />,        path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10' },
  { label: 'Image',       icon: <FiImage />,       path: 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM8.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z' },
  { label: 'Layers',      icon: <FiLayers />,      path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { label: 'Gift',        icon: <FiGift />,        path: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z' },
  { label: 'Link',        icon: <FiLink />,        path: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71' },
  { label: 'Lock',        icon: <FiLock />,        path: 'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4' },
  { label: 'Map',         icon: <FiMap />,         path: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' },
  { label: 'Message',     icon: <FiMessageCircle />, path: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' },
  { label: 'Moon',        icon: <FiMoon />,        path: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' },
  { label: 'Phone',       icon: <FiPhone />,       path: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' },
  { label: 'Pie Chart',   icon: <FiPieChart />,    path: 'M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z' },
  { label: 'Play',        icon: <FiPlay />,        path: 'M5 3l14 9-14 9V3z' },
  { label: 'Power',       icon: <FiPower />,       path: 'M18.36 6.64a9 9 0 11-12.73 0M12 2v10' },
  { label: 'Search',      icon: <FiSearch />,      path: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
  { label: 'Send',        icon: <FiSend />,        path: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' },
  { label: 'Settings',    icon: <FiSettings />,    path: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z' },
  { label: 'Share',       icon: <FiShare2 />,      path: 'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13' },
  { label: 'Shield',      icon: <FiShield />,      path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { label: 'Star',        icon: <FiStar />,        path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { label: 'Sun',         icon: <FiSun />,         path: 'M12 7a5 5 0 100 10 5 5 0 000-10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' },
  { label: 'Tag',         icon: <FiTag />,         path: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z' },
  { label: 'Target',      icon: <FiTarget />,      path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6a6 6 0 100 12 6 6 0 000-12zM12 10a2 2 0 100 4 2 2 0 000-4z' },
  { label: 'Thumbs Up',   icon: <FiThumbsUp />,    path: 'M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3' },
  { label: 'Tool',        icon: <FiTool />,        path: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z' },
  { label: 'Trending Up', icon: <FiTrendingUp />,  path: 'M23 6l-9.5 9.5-5-5L1 18' },
  { label: 'Umbrella',    icon: <FiUmbrella />,    path: 'M23 12a11.05 11.05 0 00-22 0zm-5 7a3 3 0 01-6 0' },
  { label: 'Users',       icon: <FiUsers />,       path: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { label: 'Zap',         icon: <FiZap />,         path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
];

interface IconPickerProps {
  value: string;
  onChange: (path: string) => void;
  label?: string;
  className?: string;
}

export function IconPicker({ value, onChange, label = 'Icon', className = '' }: IconPickerProps) {
  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      <label className="text-xs font-semibold text-secondary-600">{label}</label>
      <div className="grid grid-cols-8 gap-1 p-2 border border-secondary-200 rounded-lg bg-white max-h-48 overflow-y-auto">
        {ICONS.map((item) => (
          <button
            key={item.label}
            type="button"
            title={item.label}
            onClick={() => onChange(item.path)}
            className={[
              'p-2 rounded-md flex items-center justify-center transition-colors',
              value === item.path
                ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                : 'text-secondary-400 hover:bg-secondary-100 hover:text-secondary-700',
            ].join(' ')}
          >
            {item.icon}
          </button>
        ))}
      </div>
      {value && (
        <div className="flex items-center gap-2 text-xs text-secondary-400">
          <span>Selected:</span>
          <span className="font-medium text-secondary-600">{ICONS.find((i) => i.path === value)?.label ?? 'Custom'}</span>
        </div>
      )}
    </div>
  );
}

export { ICONS };
