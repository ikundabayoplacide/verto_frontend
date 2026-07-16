import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ImigongoPattern } from '../components/common/ImigongoPattern';
import { SERVICES_DATA } from '../data/services';

function ServicesHero() {
  return (
    <section className="relative min-h-[50vh] flex items-end overflow-hidden">
      <img src="/images/highlight-financial-services.jpg" alt="Verto Holdings services" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/92 via-primary-900/65 to-primary-900/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 w-full">
        <span className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
          <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">What We Do</span>
        </span>
        <h1 className="text-white font-black text-5xl md:text-7xl uppercase tracking-tight leading-[0.95]">
          Our <span className="block text-accent-400 mt-1">Services</span>
        </h1>
        <p className="mt-5 text-white/80 text-lg max-w-xl leading-relaxed">
          A full suite of financial and investment advisory services — tailored to unlock growth, access capital, and build lasting value across Rwanda and East Africa.
        </p>
      </div>
      <svg viewBox="0 0 1440 80" className="absolute bottom-0 inset-x-0 w-full text-white" preserveAspectRatio="none">
        <polygon points="0,80 0,40 360,65 720,20 1080,55 1440,10 1440,80" fill="currentColor" />
      </svg>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES_DATA[0]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <div
      id={service.slug}
      data-reveal={isEven ? 'left' : 'right'}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
      className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-secondary-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-300 bg-white"
    >
      {/* Image — alternates side on desktop */}
      <div className={`relative overflow-hidden aspect-[4/3] md:aspect-auto ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-primary-900/30" />
        {/* Number badge */}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-black">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center p-8 lg:p-10 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <h2 className="text-2xl md:text-3xl font-black text-primary-900 uppercase tracking-tight leading-tight mb-3">
          {service.title}
        </h2>
        <p className="text-secondary-500 leading-relaxed mb-6 text-sm md:text-base">{service.short}</p>

        {/* Highlights */}
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-secondary-600">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <Link
          to={`/services/${service.slug}`}
          className="self-start inline-flex items-center gap-2 rounded-full bg-accent-500 hover:bg-accent-400 text-white px-6 py-2.5 font-bold text-sm uppercase tracking-widest transition"
        >
          Learn More
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function QuickNav() {
  return (
    <div className="bg-primary-900 py-6 sticky top-16 z-30 border-b border-primary-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ul className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {SERVICES_DATA.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-secondary-300 border border-primary-700 hover:border-primary-400 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section className="relative py-24 bg-primary-50 overflow-hidden">
      <ImigongoPattern position="top" height={10} />
      <div className="max-w-3xl mx-auto px-6 text-center" data-reveal>
        <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
          Ready to Get<span className="block text-accent-500">Started?</span>
        </h2>
        <p className="mt-5 text-secondary-600 leading-relaxed">
          Let's discuss which services best fit your goals. Our team is ready to craft a tailored solution for your business.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-accent-500 hover:bg-accent-400 text-white px-7 py-3.5 font-bold text-sm uppercase tracking-widest shadow-lg shadow-accent-900/20 transition"
          >
            Get a Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 rounded-full border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white px-7 py-3.5 font-bold text-sm uppercase tracking-widest transition"
          >
            Who We Are
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ServicesHero />
      <QuickNav />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col gap-10">
          {SERVICES_DATA.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
