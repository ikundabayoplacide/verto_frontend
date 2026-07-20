import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const IMG = { sun: 'https://rcb.rw/svgs/sun.svg' };

const VIDEOS = [
  '/images/vero2.mp4',
  '/images/vero3.mp4',
  '/images/vero1.mp4',
  
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => setCurrent((c) => (c + 1) % VIDEOS.length);
    video.addEventListener('ended', onEnded);
    return () => video.removeEventListener('ended', onEnded);
  }, [current]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <video
        ref={videoRef}
        key={VIDEOS[current]}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={VIDEOS[current]} type="video/mp4" />
        <img src="/images/City.jpg" alt="Verto Holdings" className="w-full h-full object-cover" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/60 to-primary-900/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-20 md:pt-20 ">
        <span data-reveal className="flex items-center gap-3 mb-6">
          <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
          <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">Financial &amp; Investment Advisory</span>
          <span aria-hidden="true" className="w-8 h-px bg-accent-400" />
        </span>
        <h1 data-reveal className="text-white font-black leading-[0.95] text-5xl md:text-7xl uppercase tracking-tight">
          Empowering Your
          <span className="block text-accent-400 mt-2">Growth.</span>
        </h1>
        <p data-reveal className="mt-6 text-white/85 text-lg md:text-xl max-w-xl leading-relaxed">
          Verto Holdings Ltd specialized consultancy in capital raising, financial structuring, ESG advisory, and capital market development across Rwanda and East Africa.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-accent-500 hover:bg-accent-400 text-white px-7 py-3.5 font-bold text-sm uppercase tracking-widest shadow-lg shadow-black/20 transition"
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

      <img src={IMG.sun} aria-hidden="true" className="absolute -top-10 -right-10 w-[420px] opacity-10 pointer-events-none select-none" />

      <svg viewBox="0 0 1440 120" className="absolute bottom-0 inset-x-0 w-full text-white" preserveAspectRatio="none">
        <polygon points="0,120 0,60 240,90 480,40 720,80 960,30 1200,70 1440,20 1440,120" fill="currentColor" />
      </svg>
    </section>
  );
}
