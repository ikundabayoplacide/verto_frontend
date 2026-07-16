const MILESTONES = [
  { year: '2018', title: 'Founded',             desc: 'Verto Holdings Ltd established in Kigali with a vision to bridge capital gaps in East Africa.' },
  { year: '2020', title: 'First Major Mandate', desc: 'Successfully structured and closed the first Rwf 125M green finance deal with FONERWA.' },
  { year: '2022', title: 'Africa 50 Partnership',desc: 'Became an active partner under the Africa 50 framework for infrastructure finance.' },
  { year: '2024', title: 'Rwf 954M Milestone',  desc: 'Raised Rwf 954M via KWF for Impexcor Ltd — Green Project in Eastern Province.' },
  { year: '2025', title: 'Regional Expansion',  desc: 'Expanding advisory footprint across Uganda, Tanzania, and Kenya.' },
];

export function AboutTimeline() {
  return (
    <section className="py-24 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14" data-reveal>
          <span className="flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
            <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Our Journey</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
            Key <span className="text-accent-500">Milestones</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-accent-200" />

          <div className="flex flex-col gap-10">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                data-reveal={i % 2 === 0 ? 'left' : 'right'}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`relative md:grid md:grid-cols-2 md:gap-10 items-center ${i % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}
              >
                <div className={`bg-white rounded-2xl p-7 shadow-sm border border-secondary-200 hover:shadow-md hover:border-primary-200 transition-all duration-300 ${i % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                  <div className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-2">{m.year}</div>
                  <h3 className="text-xl font-black text-primary-900 mb-2">{m.title}</h3>
                  <p className="text-sm text-secondary-500 leading-relaxed">{m.desc}</p>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-accent-500 border-4 border-white shadow-md" />
                <div />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
