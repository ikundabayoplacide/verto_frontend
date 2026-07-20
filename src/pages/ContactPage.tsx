import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Contact } from '../components/sections/Contact';

const INFO = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Office',
    value: '	Nyamata, Bugesera District, Eastern  Province, Rwanda',
    href: undefined,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Phone',
    value: '+250 788 359 600',
    href: '+250 788 359 600',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'info@verto.rw',
    href: 'mailto:info@verto.rw',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Hours',
    value: 'Mon – Fri, 8:00 AM – 6:00 PM',
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <img
          src="/images/hero-office.jpg"
          alt="Contact Verto Holdings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/92 via-primary-900/65 to-primary-900/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-30 w-full">
          <span className="flex items-center gap-3 mb-5">
            <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
            <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">Reach Out</span>
          </span>
          <h1 className="text-white font-black text-5xl md:text-7xl uppercase tracking-tight leading-[0.95]">
            Get In <span className="block text-accent-400 mt-1">Touch</span>
          </h1>
          <p className="mt-5 text-white/80 text-lg max-w-xl leading-relaxed">
            Have a project in mind or need financial advisory? Our team is ready to help  reach out and we'll respond within 24 hours.
          </p>
        </div>
        {/* Wave into white */}
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 inset-x-0 w-full text-white" preserveAspectRatio="none">
          <polygon points="0,80 0,40 360,65 720,20 1080,55 1440,10 1440,80" fill="currentColor" />
        </svg>
      </section>

      {/* ── Info cards strip ── */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INFO.map(item => (
              <div
                key={item.label}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-secondary-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="w-12 h-12 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-secondary-800 hover:text-accent-600 transition-colors leading-relaxed">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-secondary-800 leading-relaxed">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="bg-secondary-50 py-10 border-t border-secondary-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — heading + map */}
          <div className="flex flex-col gap-8" data-reveal="left">
            <div>
              <span className="flex items-center gap-3 mb-4">
                <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
                <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Contact Us</span>
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-secondary-900 uppercase tracking-tight leading-[0.95]">
                Let's Start a<span className="block text-accent-500"> Conversation</span>
              </h2>
              <p className="mt-4 text-secondary-500 leading-relaxed text-sm max-w-md">
                Fill in the form and one of our advisors will get back to you within 24 hours with a personalised response tailored to your needs.
              </p>
            </div>

            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden border border-secondary-200 shadow-lg" style={{ height: '410px' }}>
              <iframe
                title="Verto Holdings Location"
                src="https://www.google.com/maps?q=Nyamata,+Bugesera+District,+Eastern+Province,+Rwanda&z=14&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 pointer-events-none shadow">
                <p className="text-xs font-bold text-accent-600 uppercase tracking-widest">Verto Holdings Ltd</p>
                <p className="text-xs text-secondary-500 mt-0.5">Nyamata, Bugesera District, Eastern Province</p>
              </div>
            </div>
          </div>

          {/* Right — form (dark card to match dark-themed UI components) */}
          <div
            className="bg-primary-900 border border-primary-700 rounded-2xl p-7 md:p-10 shadow-xl shadow-primary-900/20"
            data-reveal="right"
          >
            <h3 className="text-xl font-black text-white mb-1">Send Us a Message</h3>
            <p className="text-sm text-secondary-400 mb-7">We'll get back to you within 24 hours.</p>
            <Contact />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
