import { Link } from 'react-router-dom';

const IMG = {
  shapes:     'https://rcb.rw/_next/static/media/3%20Shapes2.b13b3bbe.png',
  iconCircle: 'https://rcb.rw/svgs/footer-bg.svg',
};

const FACTS = [
  'Rwf 954M raised via KWF for Impexcor Ltd — Green Project in Eastern Province (2025)',
  'Rwf 125M mobilized from Rwanda Green Fund (FONERWA) for ULK renewable energy initiatives (2024)',
  'Active partner under Africa 50 framework — mobilizing infrastructure finance across East Africa since 2022',
];

export function About() {
  return (
    <section id="about" className="relative bg-secondary-50 py-24 overflow-hidden">
      <img src={IMG.shapes} alt="" className="absolute left-2 top-16 w-[800px] opacity-90 hidden md:block pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center relative">
        <div />
        <div className="space-y-5 text-secondary-600 leading-relaxed">
          <h2 className="text-3xl md:text-4xl font-black text-primary-900 uppercase tracking-tight">
            About Us
          </h2>
          <p>
            Verto Holdings Ltd is a specialized consultancy firm offering cutting-edge financial, investment, and capital market advisory services across Rwanda and the broader East African region. Founded with a vision to bridge the capital and knowledge gaps between enterprises and financial institutions, we deliver bespoke solutions for businesses seeking sustainable growth, access to funding, and capital market participation.
          </p>
          <p>
            Our strategic mission is to empower public and private entities through customized consultancy in capital raising, financial structuring, ESG compliance, sustainable finance, and market development. We are backed by a team of highly experienced professionals — corporate finance experts, asset managers, private equity specialists, and commodities trading professionals.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition px-5 py-2.5 text-sm font-bold uppercase tracking-widest"
          >
            Our Story
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-20">
        <h3 className="text-2xl md:text-3xl font-black text-primary-900 uppercase tracking-tight mb-8">
          Why Choose Verto Holdings
        </h3>
        <div className="flex flex-wrap gap-4">
          <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition px-5 py-2.5 text-sm font-medium">
            Integrity &amp; Professionalism
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition px-5 py-2.5 text-sm font-medium">
            Proven Track Record
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {FACTS.map((f) => (
            <div key={f} className="flex flex-col items-start gap-4">
              <img src={IMG.iconCircle} alt="" className="w-26 h-26" />
              <h4 className="text-base font-bold text-primary-900 leading-snug">{f}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
