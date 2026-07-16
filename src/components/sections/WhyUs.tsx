const IMG = {
  handshake: 'https://rcb.rw/_next/static/media/Handshake.77ec1831.png',
};

const PHOTOS = [
  'images/industries.jpeg',
  'images/bd.jpeg',
  'images/fince.jpeg',
  'images/cpm.jpeg',
];

const REASONS = [
  { num: '01', title: 'Integrity',              desc: 'We operate with the highest ethical standards, ensuring every client relationship is built on trust and transparency.' },
  { num: '02', title: 'Proven Results',          desc: 'Over Rwf 1 billion raised for clients across green finance, capital markets, and private sector growth.' },
  { num: '03', title: 'Multidisciplinary Team',  desc: 'Corporate finance experts, asset managers, private equity specialists, and ESG advisors — all under one roof.' },
  { num: '04', title: 'Regional Reach',          desc: 'Active across Rwanda and the broader East African region, with partnerships spanning Africa 50, FONERWA, and the Rwanda Stock Exchange.' },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 bg-secondary-50 overflow-hidden">
      <img src={IMG.handshake} alt="" className="absolute right-0 top-10 w-[420px] opacity-70 hidden lg:block pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div>
          <span className="flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
            <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Why Choose Us</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95] mb-14">
            The Difference Is <span className="text-accent-500">In Our Expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {PHOTOS.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/5] block">
              <img src={src} alt="" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {REASONS.map((r) => (
            <div key={r.num} className="flex flex-col gap-3 border-t-2 border-accent-500 pt-5">
              <span className="text-xs font-black text-accent-500 tabular-nums">{r.num}</span>
              <h3 className="text-base font-black text-primary-900 uppercase tracking-wide">{r.title}</h3>
              <p className="text-sm text-secondary-500 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
