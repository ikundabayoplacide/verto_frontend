export function AboutMission() {
  return (
    <section className="bg-white mb-2 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <div className="relative" data-reveal="left mt-8">
          <div className="relative mb-8">
            <img
              src="/images/ceo.png"
              alt="Verto Holdings team"
              className="w-full h-[480px] object-cover rounded-2xl shadow-2xl shadow-primary-900/20"
            />
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary-900 text-white rounded-2xl px-7 py-5 shadow-xl">
              <div className="text-4xl font-black text-accent-400">15+</div>
              <div className="text-sm text-secondary-300 mt-1">
                Years of Combined Expertise
              </div>
            </div>
            <div className="absolute top-6 -left-3 w-1.5 h-24 bg-accent-500 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              {
                label: "Mission",
                text: "To provide professional sponsoring brokerage and financial advisory services that enable businesses to access long-term capital while creating value for investors and stakeholders.",
              },
              {
                label: "Vision",
                text: "To become a leading sponsoring broker and corporate finance advisory firm supporting the growth of Rwanda’s capital markets and regional financial integration",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-accent-50 rounded-xl p-5 border border-accent-100"
              >
                <div className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-2">
                  {item.label}
                </div>
                <p className="text-sm text-secondary-700 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Text side */}
        <div className="space-y-8 mt-8 lg:mt-0" data-reveal="right">
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">
                Our Story
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Bridging Capital
              <span className="block text-accent-500">& Opportunity</span>
            </h2>
          </div>

          {/* CEO Quote block */}
          <div className="relative border-l-4 border-accent-500 pl-6 py-2">
            <span className="absolute -top-5 -left-1 text-8xl text-accent-400/25 font-black leading-none select-none">&ldquo;</span>
            <div className="space-y-4">
              <p className="text-secondary-600 leading-relaxed italic">
                At Rwanda Capital Market Authority, the development of a vibrant and
                inclusive capital market remains essential for sustainable economic
                growth and private sector development. At Verto Holdings Ltd (VHL),
                we are proud to contribute to this vision by supporting companies in
                accessing long-term financing through structured capital market solutions.
              </p>
              <p className="text-secondary-600 leading-relaxed italic">
                Our firm was established with a clear mission: to bridge the gap
                between businesses seeking capital and investors seeking sustainable
                opportunities. Through our sponsoring broker services, corporate
                finance advisory, and market research capabilities, we guide
                companies through the complex process of raising capital, improving
                governance structures, and preparing for listing on the Rwanda Stock
                Exchange (RSE).
              </p>
              <p className="text-secondary-600 leading-relaxed italic">
                Over the years, Verto Holdings Ltd has undertaken multiple corporate
                finance assignments, including private placements, restructuring
                advisory, capital market research projects, and consultancy services
                for public and private sector institutions. These engagements
                demonstrate our commitment to strengthening Rwanda's financial
                ecosystem and supporting enterprises to scale through transparent
                and efficient financial markets.
              </p>
              <p className="text-secondary-600 leading-relaxed italic">
                As Rwanda continues to position itself as a regional financial hub,
                Verto Holdings Ltd remains dedicated to providing world-class
                advisory services that align with international standards while
                responding to local market needs. We look forward to partnering with
                businesses, investors, and regulators to expand Rwanda's capital
                markets and unlock new opportunities for economic transformation.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-8 h-px bg-accent-500" />
              <p className="text-sm font-black text-primary-900 uppercase tracking-wide">CEO, Verto Holdings Ltd</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
