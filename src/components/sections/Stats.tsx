import { useEffect, useRef, useState } from 'react';

const IMG = {
  // upperShape: 'https://rcb.rw/images/Upper_shape.png',
  upperShape: '/public/images/imigongo.png',
  iconCircle: 'https://rcb.rw/svgs/Icon%20circle%20shape.png',
};

const IMG2 = {
  iconCircle: 'https://rcb.rw/svgs/footer-bg.svg',
};

const FACTS = [
  'Rwf 954M raised via KWF for Impexcor Ltd  Green Project in Eastern Province (2025)',
  'Rwf 125M mobilized from Rwanda Green Fund (FONERWA) for ULK renewable energy initiatives (2024)',
  'Active partner under Africa 50 framework  mobilizing infrastructure finance across East Africa since 2022',
];
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
      <div className="inline-block bg-primary-900 rounded-2xl px-6 py-3 text-5xl md:text-6xl font-black text-white tabular-nums shadow-lg">
        {n.toLocaleString()}<span className="text-accent-500">{suffix}</span>
      </div>
      <div className="mt-3 text-sm md:text-base text-primary-500 max-w-[180px]">{label}</div>
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
    <section ref={ref} className="relative py-10 overflow-hidden bg-white">
      <img src={IMG.upperShape} alt="" className="absolute top-0 inset-x-0 w-full opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div data-reveal className="grid lg:grid-cols-2 gap-10 items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary-900 leading-tight uppercase tracking-tight">
            Our Work <span className="text-accent-500">in Numbers</span>
          </h2>
          <div className="text-secondary-500">
            <p>Join the growing list of clients who trust Verto Holdings for world-class financial and investment advisory across Rwanda and East Africa.</p>
            <p className="mt-3 text-sm font-bold text-primary-900">www.verto.rw · info@verto.rw</p>
          </div>
        </div>
        <div data-reveal className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-y border-secondary-200">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 ">
        <div className="grid md:grid-cols-3 gap-10">
          {FACTS.map((f) => (
            <div key={f} className="flex flex-col items-start gap-4">
              <img src={IMG2.iconCircle} alt="" className="w-26 h-26" />
              <h4 className="text-base font-bold text-primary-900 leading-snug">{f}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
