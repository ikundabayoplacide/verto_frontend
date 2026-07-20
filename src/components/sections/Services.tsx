import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../../data/services';

const IMG = {
  footerBg:   'https://rcb.rw/svgs/footer-bg.svg',
  onImgShape: 'https://rcb.rw/svgs/on_image_shape.svg',
};

export function Services() {
  return (
    <section id="services" className="relative bg-white overflow-hidden">
      <img src={IMG.footerBg} alt="" className="absolute top-0 inset-x-0 w-full opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div data-reveal className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">What We Do</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Our Services
            </h2>
          </div>
          <p className="text-secondary-500 leading-relaxed">
            From capital raising and business restructuring to ESG advisory and capital market development  a full suite of financial consultancy services tailored to your needs.
          </p>
        </div>

        <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {SERVICES_DATA.slice(0, 4).map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="group relative overflow-hidden aspect-[3/4] block">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/20 to-transparent" />
              <img src={IMG.onImgShape} alt="" className="absolute bottom-4 left-4 w-60 opacity-90" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-primary-900 font-bold text-lg leading-snug">{s.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div data-reveal className="mt-12 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-accent-500 hover:bg-accent-400 text-white px-7 py-3 font-bold text-sm uppercase tracking-widest transition"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
