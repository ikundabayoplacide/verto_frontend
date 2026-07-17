export function SustainabilityHero() {
  return (
    <section className="relative min-h-[55vh] flex items-end overflow-hidden">
      <img src="/images/home.jpg" alt="Sustainability" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/92 via-primary-900/65 to-primary-900/25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-20 w-full">
        <span className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
          <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">Our Commitment</span>
        </span>
        <h1 className="text-white font-black text-5xl md:text-7xl uppercase tracking-tight leading-[0.95]">
          Sustainability<span className="block text-accent-400 mt-1">& ESG</span>
        </h1>
        <p className="mt-5 text-white/80 text-lg max-w-xl leading-relaxed">
          Embedding environmental, social, and governance principles at the heart of everything we do — for a resilient, inclusive East Africa.
        </p>
      </div>

      <svg viewBox="0 0 1440 80" className="absolute bottom-0 inset-x-0 w-full text-white" preserveAspectRatio="none">
        <polygon points="0,80 0,40 360,65 720,20 1080,55 1440,10 1440,80" fill="currentColor" />
      </svg>
    </section>
  );
}
