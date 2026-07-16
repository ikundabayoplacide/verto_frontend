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
