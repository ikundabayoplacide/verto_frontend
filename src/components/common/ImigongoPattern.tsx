export function ImigongoPattern({ position = 'top', height = 18, fillHeight = false }: { position?: 'top' | 'bottom'; height?: number; fillHeight?: boolean }) {
  const posClass = position === 'bottom' ? 'bottom-0' : 'top-0';
  return (
    <svg
      aria-hidden="true"
      className={`absolute ${posClass} left-0 w-full ${fillHeight ? "h-full" : ""}`}
      height={fillHeight ? undefined : height}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={`zigzag-${position}`}
          x="0"
          y="0"
          width="40"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="40" height="18" fill="transparent" />
          <polyline
            points="0,9 10,1 20,9 30,1 40,9 50,1"
            fill="none"
            stroke="#1a2f7a"
            strokeWidth="4"
            strokeLinejoin="miter"
          />
          <polyline
            points="0,17 10,9 20,17 30,9 40,17 50,9"
            fill="none"
            stroke="#3285ec"
            strokeWidth="4"
            strokeLinejoin="miter"
          />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill={`url(#zigzag-${position})`} />
    </svg>
  );
}
