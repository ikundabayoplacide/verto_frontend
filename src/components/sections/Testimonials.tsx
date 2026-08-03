import { useCallback, useEffect, useRef, useState } from 'react';

const IMG = {
  bigCircle: 'https://rcb.rw/images/big_circle.png',
  quote:     'https://rcb.rw/svgs/Quote.png',
};

export function Testimonials({ testimonials: items }: { testimonials?: any[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const safeItems = items ?? [];

  const advance = useCallback((d: 1 | -1) => {
    setCurrent((c) => (c + d + safeItems.length) % safeItems.length);
  }, [safeItems.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(1), 7000);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  if (!items?.length) return null;

  const t = items[current];

  return (
    <section id="testimonials" className="relative py-10 bg-white overflow-hidden">
      <img src={IMG.bigCircle} alt="" className="absolute -right-40 top-1/2 -translate-y-1/2 w-[720px] opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <h2 data-reveal className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight mb-16">
          Testimonials
        </h2>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Portrait */}
          <div data-reveal="left" className="relative flex justify-center">
            <div className="relative rounded-full overflow-hidden w-[280px] h-[280px] md:w-[380px] md:h-[380px] ring-8 ring-white shadow-2xl bg-secondary-100 flex items-center justify-center">
              {t.portrait ? (
                <img src={t.portrait} alt={t.name} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-32 h-32 md:w-44 md:h-44 text-secondary-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2c0-3.33-6.67-5-10-5Z" />
                </svg>
              )}
            </div>
          </div>

          {/* Quote */}
          <div data-reveal="right" key={t.id}>
            <img src={IMG.quote} alt="" className="w-14 mb-6 opacity-90" />
            <p className="text-xl md:text-2xl text-primary-900 leading-relaxed font-medium">
              "{t.text}"
            </p>
            <div className="mt-10">
              <div className="text-lg font-black text-primary-900 uppercase tracking-wide">— {t.name}</div>
              <div className="text-sm text-secondary-400 mt-1">{t.role} · {t.company}</div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button type="button" aria-label="Previous"
                onClick={() => { advance(-1); startTimer(); }}
                className="w-11 h-11 border border-secondary-300 flex items-center justify-center text-secondary-500 hover:border-accent-500 hover:text-accent-500 rounded-full transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button type="button" aria-label="Next"
                onClick={() => { advance(1); startTimer(); }}
                className="w-11 h-11 bg-accent-500 flex items-center justify-center text-white hover:bg-accent-400 rounded-full transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="flex gap-2 ml-2">
                {items.map((_, i) => (
                  <button key={i} type="button" onClick={() => { setCurrent(i); startTimer(); }}
                    className={['h-0.5 transition-all duration-300', i === current ? 'w-8 bg-accent-500' : 'w-4 bg-secondary-300'].join(' ')} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
