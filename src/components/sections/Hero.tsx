import { Link } from 'react-router-dom';

const IMG = {
  hero: '/images/City.jpg',
  sun:  'https://rcb.rw/svgs/sun.svg',
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <img src={IMG.hero} alt="Verto Holdings" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/60 to-primary-900/30" />
      <img src={IMG.sun} alt="" className="absolute top-24 left-8 w-24 opacity-70 hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 md:pt-56 pb-40">
        <span className="flex items-center gap-3 mb-6">
          <span aria-hidden="true" className="w-8 h-px bg-primary-400" />
          <span className="text-xs font-bold text-primary-400 uppercase tracking-[0.2em]">Financial &amp; Investment Advisory</span>
          <span aria-hidden="true" className="w-8 h-px bg-primary-400" />
        </span>
        <h1 className="text-white font-black leading-[0.95] text-5xl md:text-7xl uppercase tracking-tight">
          Empowering Your
          <span className="block text-primary-400 mt-2">Growth.</span>
        </h1>
        <p className="mt-6 text-white/85 text-lg md:text-xl max-w-xl leading-relaxed">
          Verto Holdings Ltd specialized consultancy in capital raising, financial structuring, ESG advisory, and capital market development across Rwanda and East Africa.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary-500 hover:bg-primary-400 text-white px-7 py-3.5 font-bold text-sm uppercase tracking-widest shadow-lg shadow-black/20 transition"
          >
            Get a Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 rounded-full border border-white/30 text-white/85 hover:border-white/70 hover:text-white px-7 py-3.5 font-semibold text-sm uppercase tracking-widest transition"
          >
            Who We Are
          </Link>
        </div>
      </div>

      <svg viewBox="0 0 1440 120" className="absolute bottom-0 inset-x-0 w-full text-white" preserveAspectRatio="none">
        <polygon points="0,120 0,60 240,90 480,40 720,80 960,30 1200,70 1440,20 1440,120" fill="currentColor" />
      </svg>
    </section>
  );
}
