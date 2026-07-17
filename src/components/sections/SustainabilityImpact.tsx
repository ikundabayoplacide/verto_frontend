const IMPACTS = [
  { value: 'Rwf 954M+', label: 'Green Finance Raised', desc: 'Via KWF for Impexcor Ltd Green Project, Eastern Province (2025)' },
  { value: 'Rwf 125M',  label: 'FONERWA Funding',      desc: 'Mobilized for ULK renewable energy initiatives (2024)' },
  { value: 'Africa 50', label: 'Infrastructure Partner',desc: 'Active partner mobilizing infrastructure finance across East Africa since 2022' },
  { value: '10+',       label: 'Sectors Impacted',     desc: 'Across agriculture, energy, finance, and real estate' },
];

const INITIATIVES = [
  {
    img: '/images/fince.jpeg',
    tag: 'Green Finance',
    title: 'KWF Green Project — Impexcor Ltd',
    desc: 'Structured and closed a Rwf 954M green finance facility through KWF for a large-scale green project in Rwanda\'s Eastern Province, supporting climate-resilient agriculture and export competitiveness.',
    year: '2025',
  },
  {
    img: '/images/industries.jpeg',
    tag: 'Renewable Energy',
    title: 'FONERWA — ULK Renewable Energy',
    desc: 'Mobilized Rwf 125M from the Rwanda Green Fund (FONERWA) to finance renewable energy initiatives at the University of Lay Adventists of Kigali, reducing carbon footprint and energy costs.',
    year: '2024',
  },
  {
    img: '/images/City.jpg',
    tag: 'Infrastructure',
    title: 'Africa 50 Infrastructure Finance',
    desc: 'Active partner under the Africa 50 framework — mobilizing long-term infrastructure finance across East Africa, with a focus on sustainable, high-impact projects aligned with the African Development Bank\'s priorities.',
    year: '2022–Present',
  },
];

export function SustainabilityImpact() {
  return (
    <section className="py-12 bg-primary-900 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Stats */}
        <div className="text-center mb-16" data-reveal>
          <span className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">Measurable Impact</span>
            <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[0.95]">
            Impact <span className="text-accent-400">in Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {IMPACTS.map((item, i) => (
            <div
              key={item.label}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="bg-primary-800/60 border border-primary-700 rounded-2xl p-6 text-center hover:border-accent-500 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-black text-accent-400 mb-2">{item.value}</div>
              <div className="text-sm font-bold text-white mb-2">{item.label}</div>
              <p className="text-xs text-secondary-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Initiatives */}
        <div className="mb-10" data-reveal>
          <span className="flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">Key Initiatives</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-[0.95]">
            Sustainability <span className="text-accent-400">in Action</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {INITIATIVES.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group bg-primary-800/40 border border-primary-700 rounded-2xl overflow-hidden hover:border-accent-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-accent-500 text-white rounded-full">
                  {item.tag}
                </span>
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-primary-900/70 text-secondary-300 rounded-full">
                  {item.year}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-black text-white mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-secondary-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
