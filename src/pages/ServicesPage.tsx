import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetServicesQuery } from '../app/api';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ImigongoPattern } from '../components/common/ImigongoPattern';
import { Modal } from '../components/ui/Modal';
import { SERVICES_DATA } from '../data/services';

type Service = {
  id: string;
  slug: string;
  title: string;
  short: string;
  img: string;
  description: string[];
  highlights: string[];
};

function ServicesHero() {
  return (
    <section className="relative min-h-[50vh] flex items-end overflow-hidden">
      <img src="/images/highlight-protection.jpg" alt="Verto Holdings services" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 via-primary-900/40 to-primary-900/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-30 w-full">
        <span className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
          <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">What We Do</span>
        </span>
        <h1 className="text-white font-black text-5xl md:text-7xl uppercase tracking-tight leading-[0.95]">
          Our <span className="block text-accent-400 mt-1">Services</span>
        </h1>
        <p className="mt-5 text-white/80 text-lg max-w-xl leading-relaxed">
          A full suite of financial and investment advisory services  tailored to unlock growth, access capital, and build lasting value across Rwanda and East Africa.
        </p>
      </div>
      <svg viewBox="0 0 1440 80" className="absolute bottom-0 inset-x-0 w-full text-white" preserveAspectRatio="none">
        <polygon points="0,80 0,40 360,65 720,20 1080,55 1440,10 1440,80" fill="currentColor" />
      </svg>
    </section>
  );
}

function ServiceCard({ service, index, onOpen }: { service: Service; index: number; onOpen: () => void }) {
  return (
    <div
      id={service.slug}
      className="group flex flex-col rounded-2xl overflow-hidden border border-secondary-200 hover:border-accent-400 hover:shadow-lg hover:shadow-primary-900/10 transition-all duration-300 bg-white"
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img src={service.img} alt={service.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-black">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h2 className="text-base font-black text-primary-900 uppercase tracking-tight leading-tight mb-2">{service.title}</h2>
        <p className="text-secondary-500 text-sm leading-relaxed mb-4 flex-1">{service.short}</p>
        <ul className="grid grid-cols-2 gap-1.5 mb-4">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-xs text-secondary-600">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
        <button
          onClick={onOpen}
          className="self-start inline-flex items-center gap-2 rounded-full bg-accent-500 hover:bg-accent-400 text-white px-4 py-2 font-bold text-xs uppercase tracking-widest transition"
        >
          Learn More
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function QuickNav({ services }: { services: Service[] }) {
  return (
    <div className="bg-primary-900 py-6 sticky top-16 z-30 border-b border-primary-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ul className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {services.map((s) => (
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
    <section className="relative py-12 bg-primary-50 overflow-hidden">
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
  const { data: services = [] } = useGetServicesQuery();
  const data: Service[] = services.length ? (services as Service[]) : (SERVICES_DATA as unknown as Service[]);
  const [active, setActive] = useState<Service | null>(null);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ServicesHero />
      <QuickNav services={data} />
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} onOpen={() => setActive(service)} />
          ))}
        </div>
      </section>
      <CTA />
      <Footer />
      {active && (
        <Modal open={!!active} onClose={() => setActive(null)} size="xl" title={active.title}>
          {/* Image banner */}
          <div className="relative rounded-2xl overflow-hidden h-52 mb-6 -mx-1">
            <img src={active.img} alt={active.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />
            <span className="absolute bottom-4 left-4 bg-accent-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              {active.title}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-3 text-secondary-600 text-sm leading-relaxed mb-6">
            {active.description.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {/* Highlights */}
          <div className="border-t border-secondary-100 pt-5">
            <p className="text-xs font-black text-secondary-400 uppercase tracking-widest mb-3">Key Highlights</p>
            <ul className="grid grid-cols-2 gap-2">
              {active.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-secondary-700 bg-accent-50 border border-accent-100 rounded-xl px-3 py-2.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </main>
  );
}
