import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetServicesQuery } from '../app/api';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ImigongoPattern } from '../components/common/ImigongoPattern';

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

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div
      id={service.slug}
      className="group flex flex-col overflow-hidden rounded-2xl border border-secondary-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-xl hover:shadow-primary-900/10 sm:flex-row"
    >
      <div className="relative h-52 overflow-hidden bg-primary-900 sm:h-auto sm:min-h-[240px] sm:w-[38%]">
        <img src={service.img} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/75 via-primary-950/10 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-primary-950/10" />
        <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-primary-950/40 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-lg font-black uppercase leading-tight tracking-tight text-primary-900 sm:text-xl">{service.title}</h2>
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-secondary-600">{service.short}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {service.highlights.slice(0, 3).map((h) => (
            <li key={h} className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold leading-4 text-primary-700">
              {h}
            </li>
          ))}
        </ul>
        <Link
          to={`/services/${service.slug}`}
          className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-primary-900 transition-colors group-hover:text-accent-600"
        >
          Explore service
          <span className="h-px w-6 bg-accent-500 transition-all group-hover:w-10" aria-hidden="true" />
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function ServiceDetail({ service, services }: { service: Service; services: Service[] }) {
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative min-h-[58vh] flex items-end overflow-hidden bg-primary-950">
        <img src={service.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/75 to-primary-900/60" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10">
          <Link to="/services" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-accent-300">
            <span aria-hidden="true">←</span> All services
          </Link>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-accent-400">Verto Holdings · Advisory</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.98] tracking-tight text-white md:text-6xl lg:text-7xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{service.short}</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent-500 px-6 py-3 font-bold text-white transition hover:bg-accent-400">
            Talk to our team <span aria-hidden="true">→</span>
          </Link>
        </div>
        <svg viewBox="0 0 1440 70" className="absolute bottom-0 inset-x-0 w-full text-white" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,70 0,36 360,55 720,16 1080,48 1440,8 1440,70" fill="currentColor" />
        </svg>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-10">
          <article>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-accent-600">How we help</p>
            <h2 className="mb-8 text-3xl font-black uppercase tracking-tight text-primary-900 md:text-4xl">Strategy built around your goals</h2>
            <div className="space-y-5 text-base leading-8 text-secondary-600">
              {service.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </article>
          {service.highlights?.length > 0 && <aside className="rounded-3xl border border-secondary-200 bg-primary-50 p-7 md:p-8">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-500 text-xl font-black text-white">V</span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-accent-600">What we deliver</p>
                <h2 className="mt-1 text-2xl font-black text-primary-900">Key capabilities</h2>
              </div>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.highlights.map((highlight, index) => (
                <li key={highlight} className="flex items-start gap-2 text-sm font-medium leading-relaxed text-secondary-700">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[10px] font-black text-accent-600">{String(index + 1).padStart(2, '0')}</span>
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end">
              <Link to="/contact" className="inline-flex w-full items-center justify-center rounded-xl bg-primary-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-800 sm:w-auto">Discuss your needs</Link>
            </div>
          </aside>}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-primary-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent-600">Explore more</p>
            <div className="mb-8 mt-2 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-black uppercase tracking-tight text-primary-900">Related services</h2>
              <Link to="/services" className="text-sm font-bold text-primary-700 hover:text-accent-600">View all services →</Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} to={`/services/${item.slug}`} className="group rounded-2xl border border-secondary-200 bg-white p-6 transition hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg">
                  <h3 className="font-black uppercase tracking-tight text-primary-900 group-hover:text-accent-600">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-500">{item.short}</p>
                  <span className="mt-5 inline-block text-xs font-black uppercase tracking-widest text-accent-600">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
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
  const { slug } = useParams<{ slug: string }>();
  const { data: services = [] } = useGetServicesQuery();
  const data = services as Service[];
  const selected = slug ? data.find((service) => service.slug === slug) : undefined;

  useEffect(() => {
    if (selected) document.title = `${selected.title} | Verto Holdings`;
    else document.title = 'Our Services | Verto Holdings';
  }, [selected]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {selected ? (
        <ServiceDetail service={selected} services={data} />
      ) : slug ? (
        <section className="min-h-[70vh] px-6 pt-40 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent-600">Service not found</p>
          <h1 className="mt-3 text-4xl font-black text-primary-900">We couldn’t find that service.</h1>
          <Link to="/services" className="mt-6 inline-flex rounded-full bg-accent-500 px-6 py-3 font-bold text-white">Browse all services</Link>
        </section>
      ) : (
        <>
          <ServicesHero />
          {data.length > 0 && <QuickNav services={data} />}
          <section className="bg-secondary-50 py-16 md:py-20">
            {data.length > 0 ? (
              <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-reveal>
                  <div className="max-w-2xl">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-accent-600">Expertise for lasting growth</p>
                    <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-primary-900 md:text-4xl">Advice that moves your business forward</h2>
                  </div>
                  <p className="text-sm font-semibold text-secondary-500">{data.length} tailored services</p>
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {data.map((service, i) => <ServiceCard key={service.slug} service={service} index={i} />)}
                </div>
              </div>
            ) : (
              <p className="mx-auto max-w-7xl px-6 py-12 text-center text-secondary-500 lg:px-10">No services are available right now.</p>
            )}
          </section>
        </>
      )}
      <CTA />
      <Footer />
    </main>
  );
}
