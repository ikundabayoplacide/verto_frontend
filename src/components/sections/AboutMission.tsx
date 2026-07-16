export function AboutMission() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <div className="relative" data-reveal="left">
          <img
            src="/images/office.jpeg"
            alt="Verto Holdings team"
            className="w-full h-[480px] object-cover rounded-2xl shadow-2xl shadow-primary-900/20"
          />
          <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary-900 text-white rounded-2xl px-7 py-5 shadow-xl">
            <div className="text-4xl font-black text-accent-400">15+</div>
            <div className="text-sm text-secondary-300 mt-1">Years of Combined Expertise</div>
          </div>
          <div className="absolute top-6 -left-3 w-1.5 h-24 bg-accent-500 rounded-full" />
        </div>

        {/* Text side */}
        <div className="space-y-8 mt-8 lg:mt-0" data-reveal="right">
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Our Story</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Bridging Capital<span className="block text-accent-500">& Opportunity</span>
            </h2>
          </div>

          <p className="text-secondary-600 leading-relaxed">
            Verto Holdings Ltd is a specialized consultancy firm offering cutting-edge financial, investment, and capital market advisory services across Rwanda and the broader East African region. Founded with a vision to bridge the capital and knowledge gaps between enterprises and financial institutions, we deliver bespoke solutions for businesses seeking sustainable growth.
          </p>
          <p className="text-secondary-600 leading-relaxed">
            Our strategic mission is to empower public and private entities through customized consultancy in capital raising, financial structuring, ESG compliance, sustainable finance, and market development — backed by a team of highly experienced professionals.
          </p>

          <div className="grid grid-cols-2 gap-5 pt-2">
            {[
              { label: 'Mission', text: 'Empower enterprises with world-class financial advisory to unlock sustainable growth.' },
              { label: 'Vision',  text: 'Become the leading investment advisory firm in East Africa by 2030.' },
            ].map((item) => (
              <div key={item.label} className="bg-accent-50 rounded-xl p-5 border border-accent-100">
                <div className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-2">{item.label}</div>
                <p className="text-sm text-secondary-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
