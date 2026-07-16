import { useEffect, useRef, useState } from 'react';

const IMG = {
  upperShape: 'https://rcb.rw/images/Upper_shape.png',
  iconCircle: 'https://rcb.rw/svgs/Icon%20circle%20shape.png',
};

const STATS = [
  { value: 15,  suffix: '+', label: 'Years of Experience' },
  { value: 954, suffix: 'M+', label: 'RWF Raised for Clients (Rwf)' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction' },
  { value: 10,  suffix: '+', label: 'Sectors Served' },
];

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
      else setN(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return n;
}

function StatItem({ value, suffix, label, active }: (typeof STATS)[0] & { active: boolean }) {
  const n = useCountUp(value, active);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <img src={IMG.iconCircle} alt="" className="w-12 h-12 mb-4 opacity-90" />
      <div className="text-5xl md:text-6xl font-black text-primary-900 tabular-nums">
        {n.toLocaleString()}<span className="text-primary-500">{suffix}</span>
      </div>
      <div className="mt-2 text-sm md:text-base text-secondary-500 max-w-[180px]">{label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-white">
      <img src={IMG.upperShape} alt="" className="absolute top-0 inset-x-0 w-full opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary-900 leading-tight uppercase tracking-tight">
            Our Work <span className="text-primary-500">in Numbers</span>
          </h2>
          <div className="text-secondary-500">
            <p>Join the growing list of clients who trust Verto Holdings for world-class financial and investment advisory across Rwanda and East Africa.</p>
            <p className="mt-3 text-sm font-bold text-primary-900">www.verto.rw · info@verto.rw</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-y border-secondary-200">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
