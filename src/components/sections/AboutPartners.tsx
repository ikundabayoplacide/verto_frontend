const PARTNERS = [
  { name: 'Rwanda Development Board', logo: '/images/RDB-1-765x768.png' },
  { name: 'University of Lay Adventists of Kigali', logo: '/images/LOGO-ULK.png' },
  { name: 'Capital Market Authority', logo: '/images/cma.jpg' },
];

export function AboutPartners() {
  return (
    <section className="py-8 bg-white border-t border-secondary-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12" data-reveal>
          <span className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
            <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Trusted By</span>
            <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
            Our <span className="text-accent-500">Partners</span>
          </h2>
          <p className="mt-4 text-secondary-500 text-sm max-w-xl mx-auto leading-relaxed">
            We collaborate with leading institutions, regulators, and development organisations across Rwanda and East Africa.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6" data-reveal>
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center p-8 rounded-2xl border border-secondary-200 bg-secondary-50 hover:border-accent-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-16 max-w-full object-contain hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
