export function AboutPartners({ partners: items }: { partners?: any[] }) {
  if (!items?.length) return null;
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

        <div className="overflow-x-auto pb-4 scroll-smooth" data-reveal>
          <div className="flex w-max min-w-full justify-center gap-8">
            {items.map((p) => (
              <div
                key={p.id ?? p.name}
                className="flex min-w-[180px] shrink-0 items-center justify-center rounded-2xl border border-secondary-200 bg-secondary-50 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-20 max-w-full object-contain transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
