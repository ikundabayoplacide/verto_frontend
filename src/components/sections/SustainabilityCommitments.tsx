const COMMITMENTS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'SDG Alignment',
    desc: 'Every transaction and advisory mandate is evaluated against the UN Sustainable Development Goals, with a focus on SDG 8 (Decent Work), SDG 13 (Climate Action), and SDG 17 (Partnerships).',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Rwanda Green Growth',
    desc: 'We actively support Rwanda\'s National Strategy for Transformation (NST1) and Green Growth and Climate Resilience Strategy, channeling capital into sectors that drive low-carbon, inclusive development.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Responsible Investment',
    desc: 'We apply ESG screening to all investment advisory mandates, ensuring that capital is deployed responsibly  avoiding harm and actively seeking opportunities that generate positive environmental and social returns.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Transparent Reporting',
    desc: 'We hold ourselves to the highest standards of transparency, publishing impact reports aligned with GRI Standards and TCFD recommendations  ensuring accountability to clients, partners, and communities.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Regional Collaboration',
    desc: 'Through partnerships with Africa 50, FONERWA, the EAC, and development finance institutions, we amplify our sustainability impact beyond Rwanda  contributing to a more resilient East African economy.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Capacity Building',
    desc: 'We invest in knowledge transfer  training clients, SMEs, and market participants on ESG principles, sustainable finance instruments, and responsible business practices to build lasting institutional capacity.',
  },
];

export function SustainabilityCommitments() {
  return (
    <section className="py-12 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16" data-reveal>
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">How We Operate</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Our <span className="text-accent-500">Commitments</span>
            </h2>
          </div>
          <p className="text-secondary-500 leading-relaxed">
            Sustainability is not a checkbox it is embedded in our culture, our processes, and the outcomes we pursue for every client and community we serve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMITMENTS.map((c, i) => (
            <div
              key={c.title}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group bg-white border border-secondary-200 hover:border-accent-300 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-900/5"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-600 group-hover:bg-accent-500 group-hover:text-white group-hover:border-accent-500 transition-all duration-300 mb-5">
                {c.icon}
              </div>
              <h3 className="text-base font-black text-primary-900 mb-3 uppercase tracking-wide">{c.title}</h3>
              <p className="text-sm text-secondary-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
