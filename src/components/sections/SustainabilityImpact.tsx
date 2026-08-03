export function SustainabilityImpact({ initiatives: apiInitiatives }: { initiatives?: any[] }) {
  const allInitiatives = apiInitiatives ?? [];
  const impacts = allInitiatives.filter((i: any) => i.type === 'impact');
  const projects = allInitiatives.filter((i: any) => i.type === 'project');
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
          {impacts.map((item: any, i: number) => (
            <div
              key={item.label}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="bg-primary-800/60 border border-primary-700 rounded-2xl p-6 text-center hover:border-accent-500 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-black text-accent-400 mb-2">{item.value}</div>
              <div className="text-sm font-bold text-white mb-2">{item.label}</div>
              <p className="text-xs text-secondary-400 leading-relaxed">{item.description}</p>
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
          {projects.map((item: any, i: number) => (
            <div
            key={item.label}
            data-reveal
            style={{ transitionDelay: `${i * 100}ms` }}
            className="group bg-primary-800/40 border border-primary-700 rounded-2xl overflow-hidden hover:border-accent-500 transition-all duration-300 hover:-translate-y-1"
          >
              <div className="relative aspect-video overflow-hidden">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-accent-500 text-white rounded-full">
                  {item.tag}
                </span>
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-primary-900/70 text-secondary-300 rounded-full">
                  {item.year}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-black text-white mb-3 leading-snug">{item.label}</h3>
                <p className="text-sm text-secondary-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
