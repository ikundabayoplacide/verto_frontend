import { Link } from 'react-router-dom';

const IMG = {
  footerBg: 'https://rcb.rw/svgs/footer-bg.svg',
};

export function CTA() {
  return (
    <section aria-label="Call to action" className="relative bg-primary-900 py-24 overflow-hidden">
      <img src={IMG.footerBg} alt="" className="absolute bottom-0 inset-x-0 w-full opacity-20 pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center px-6 relative">
        <span className="flex items-center justify-center gap-3 mb-6">
          <span aria-hidden="true" className="w-8 h-px bg-primary-400" />
          <span className="text-xs font-bold text-primary-400 uppercase tracking-[0.2em]">Ready to Build?</span>
          <span aria-hidden="true" className="w-8 h-px bg-primary-400" />
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
          Let's Build Something<br />
          <span className="text-primary-400">Extraordinary.</span>
        </h2>
        <p className="mt-5 text-white/80 text-lg leading-relaxed max-w-xl mx-auto">
          Whether you have detailed plans or just an idea — our team is ready to guide you from concept to completion.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 hover:bg-primary-400 text-white px-8 py-3.5 font-bold text-sm uppercase tracking-widest transition"
          >
            Get a Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="tel:+250782170000"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white/80 hover:border-white/60 hover:text-white px-8 py-3.5 font-semibold text-sm uppercase tracking-widest transition"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
