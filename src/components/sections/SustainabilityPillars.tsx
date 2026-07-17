const PILLARS = [
  {
    num: '01',
    label: 'Environmental',
    color: 'accent',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Green Finance & Climate Action',
    desc: 'We structure and facilitate green bonds, climate-resilient investments, and sustainable infrastructure financing — helping clients align with Rwanda\'s green growth strategy and international climate commitments.',
    points: ['Green bond structuring', 'FONERWA & climate fund access', 'Climate risk assessment', 'Carbon-neutral investment advisory'],
  },
  {
    num: '02',
    label: 'Social',
    color: 'primary',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Inclusive Growth & Social Impact',
    desc: 'We champion financial inclusion, SME empowerment, and youth and gender equity in capital markets — ensuring that economic growth reaches every segment of society across East Africa.',
    points: ['SME capital access programs', 'Gender-lens investing', 'Youth financial inclusion', 'Community impact reporting'],
  },
  {
    num: '03',
    label: 'Governance',
    color: 'secondary',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Transparent Governance & Compliance',
    desc: 'We embed robust governance frameworks into every client engagement — from ESG reporting and board advisory to regulatory compliance and corporate transparency standards aligned with international best practices.',
    points: ['ESG framework development', 'Board governance advisory', 'Regulatory compliance', 'Sustainability reporting (GRI/TCFD)'],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  accent:    { bg: 'bg-accent-50',    text: 'text-accent-600',    border: 'border-accent-200',    dot: 'bg-accent-500' },
  primary:   { bg: 'bg-primary-50',   text: 'text-primary-600',   border: 'border-primary-200',   dot: 'bg-primary-500' },
  secondary: { bg: 'bg-secondary-100',text: 'text-secondary-600', border: 'border-secondary-300', dot: 'bg-secondary-500' },
};

export function SustainabilityPillars() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16" data-reveal>
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">ESG Framework</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Our Three <span className="text-accent-500">Pillars</span>
            </h2>
          </div>
          <p className="text-secondary-500 leading-relaxed">
            Our ESG approach is built on three interconnected pillars that guide how we advise clients, structure transactions, and measure impact across Rwanda and East Africa.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {PILLARS.map((p, i) => {
            const c = colorMap[p.color];
            return (
              <div
                key={p.num}
                data-reveal={i % 2 === 0 ? 'left' : 'right'}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 p-7 md:p-10 rounded-2xl border ${c.border} ${c.bg} hover:shadow-lg transition-shadow duration-300`}
              >
                {/* Number + icon */}
                <div className="flex md:flex-col items-center md:items-start gap-4">
                  <span className={`text-xs font-black uppercase tracking-widest ${c.text}`}>{p.num}</span>
                  <div className={`w-16 h-16 rounded-2xl bg-white border ${c.border} flex items-center justify-center ${c.text} shadow-sm`}>
                    {p.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${c.text} hidden md:block`}>{p.label}</span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-primary-900 mb-3">{p.title}</h3>
                  <p className="text-secondary-600 leading-relaxed mb-6 text-sm md:text-base">{p.desc}</p>
                  <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs text-secondary-700 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
