import { useEffect, useState } from 'react';

export function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    if (scrolling) return;
    setScrolling(true);

    const start = window.scrollY;
    const duration = 800;
    let startTime: number | null = null;

    // Ease-in-out cubic
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - ease(progress)));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setScrolling(false);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={[
        'fixed bottom-24 right-5 z-50 w-11 h-11 flex items-center justify-center',
        'bg-primary-500 text-white shadow-lg shadow-primary-900/40',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        scrolling ? 'scale-90' : 'hover:bg-primary-400 hover:-translate-y-1',
      ].join(' ')}
    >
      {/* Animated arrow — bounces up when scrolling */}
      <svg
        aria-hidden="true"
        className={['w-5 h-5 transition-transform duration-300', scrolling ? '-translate-y-1' : ''].join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
