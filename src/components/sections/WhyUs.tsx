const REASONS = [
  {
    num: '01',
    title: 'Integrity',
    desc: 'We operate with the highest ethical standards, ensuring every client relationship is built on trust and transparency.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Proven Results',
    desc: 'Over Rwf 1 billion raised for clients across green finance, capital markets, and private sector growth.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Multidisciplinary Team',
    desc: 'Corporate finance experts, asset managers, private equity specialists, and ESG advisors — all under one roof.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Regional Reach',
    desc: 'Active across Rwanda and the broader East African region, with partnerships spanning Africa 50, FONERWA, and the Rwanda Stock Exchange.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-secondary-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div>
          <span className="flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
            <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Why Choose Us</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95] mb-14">
            The Difference Is <span className="text-accent-500">In Our Expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r) => (
            <div
              key={r.num}
              className="group flex flex-col gap-5 bg-white rounded-2xl p-7 border border-secondary-200 hover:border-accent-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 group-hover:bg-accent-500 group-hover:text-white group-hover:border-accent-500 transition-colors duration-300">
                  {r.icon}
                </div>
                <span className="text-3xl font-black text-secondary-100 tabular-nums">{r.num}</span>
              </div>
              <div>
                <h3 className="text-base font-black text-primary-900 uppercase tracking-wide mb-2">{r.title}</h3>
                <p className="text-sm text-secondary-500 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
