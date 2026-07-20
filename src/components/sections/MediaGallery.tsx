import { useState } from 'react';

interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

const GALLERY: GalleryItem[] = [
  { src: '/images/City.jpeg',      alt: 'Kigali City skyline',             category: 'Rwanda' },
  { src: '/images/office.jpeg',    alt: 'Verto Holdings office',           category: 'Office' },
  { src: '/images/industries.jpeg',alt: 'Industry & Business',             category: 'Industry' },
  { src: '/images/com.jpeg',       alt: 'Commerce & Trade',                category: 'Industry' },
  { src: '/images/cpm.jpeg',       alt: 'Capital Markets',                 category: 'Finance' },
  { src: '/images/fince.jpeg',     alt: 'Financial Services',              category: 'Finance' },
  { src: '/images/bd.jpeg',        alt: 'Business Development',            category: 'Industry' },
  { src: '/images/rdb.jpeg',       alt: 'Rwanda Development Board Event',  category: 'Events' },
  { src: '/images/hero-office.jpg',alt: 'Corporate Environment',           category: 'Office' },
  { src: '/images/home.jpg',       alt: 'Verto Holdings Headquarters',     category: 'Office' },
  { src: '/images/highlight-financial-services.jpg', alt: 'Financial Advisory Highlight', category: 'Finance' },
  { src: '/images/highlight-protection.jpg',         alt: 'Asset Protection Highlight',   category: 'Finance' },
];

const CATEGORIES = ['All', 'Finance', 'Industry', 'Office', 'Rwanda', 'Events'];

function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
        />
        <p className="text-white/70 text-sm">{item.alt}</p>
      </div>

      {/* Next */}
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export function MediaGallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All' ? GALLERY : GALLERY.filter((g) => g.category === active);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const nextImage = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div data-reveal className="grid lg:grid-cols-2 gap-10 items-end mb-12">
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Photo Gallery</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Moments &amp; <span className="text-accent-500">Milestones</span>
            </h2>
          </div>
          <p className="text-secondary-500 leading-relaxed">
            A visual story of our work, partnerships, and impact across Rwanda's financial and business landscape.
          </p>
        </div>

        {/* Filter tabs */}
        <div data-reveal className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={[
                'px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest border transition',
                active === cat
                  ? 'bg-accent-500 border-accent-500 text-white'
                  : 'border-secondary-300 text-secondary-500 hover:border-accent-400 hover:text-accent-600',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, idx) => (
            <button
              key={item.src + idx}
              type="button"
              data-reveal
              style={{ transitionDelay: `${(idx % 6) * 80}ms` }}
              onClick={() => openLightbox(idx)}
              className="group relative w-full overflow-hidden rounded-2xl block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
              aria-label={`Open photo: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1">
                  {item.category}
                </span>
                <p className="text-white text-sm font-semibold leading-snug">{item.alt}</p>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="grid place-items-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <LightboxModal
          item={filtered[lightbox]}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
