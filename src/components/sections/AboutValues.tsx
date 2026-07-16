const VALUES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Integrity',
    desc: 'We uphold the highest ethical standards in every engagement, ensuring transparency and trust with all stakeholders.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Excellence',
    desc: 'We deliver world-class advisory services backed by deep expertise, rigorous analysis, and innovative thinking.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Partnership',
    desc: 'We build lasting relationships with clients, treating every mandate as a long-term partnership for mutual growth.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Impact',
    desc: 'We measure success by the tangible economic and social impact we create across Rwanda and East Africa.',
  },
];

export function AboutValues() {
  return (
    <section className="py-24 bg-primary-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center mb-14" data-reveal>
          <span className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">What Drives Us</span>
            <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[0.95]">
            Our Core <span className="text-accent-400">Values</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group bg-primary-800/60 border border-primary-700 hover:border-accent-500 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-700 group-hover:bg-accent-500 flex items-center justify-center text-primary-300 group-hover:text-white transition-colors duration-300 mb-5">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-secondary-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
