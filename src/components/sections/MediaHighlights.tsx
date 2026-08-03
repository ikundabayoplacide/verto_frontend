import { useState } from 'react';
import { Modal } from '../ui/Modal';

interface Highlight {
  img: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  body: string[];
  featured?: boolean;
}



function NewsModal({ item, onClose }: { item: Highlight; onClose: () => void }) {
  return (
    <Modal open onClose={onClose} title={item.title} size="xl">
      {/* Image + meta */}
      <div className="relative rounded-lg overflow-hidden aspect-video mb-6">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {item.category}
          </span>
          <span className="text-white/80 text-xs font-medium">{item.date}</span>
        </div>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-4">
        {item.body.map((para, i) => (
          <p key={i} className="text-sm text-secondary-300 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </Modal>
  );
}

function FeaturedCard({ item }: { item: Highlight }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        data-reveal
        className="group relative col-span-2 overflow-hidden rounded-2xl bg-secondary-50 border border-secondary-200 hover:border-accent-400 transition-all duration-300 hover:shadow-xl hover:shadow-accent-900/10 lg:flex"
      >
        <div className="relative lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent lg:bg-gradient-to-r" />
        </div>
        <div className="p-8 flex flex-col justify-center lg:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              {item.category}
            </span>
            <span className="text-xs text-secondary-400 font-medium">{item.date}</span>
          </div>
          <h3 className="text-2xl font-black text-primary-900 leading-snug">{item.title}</h3>
          <p className="mt-3 text-secondary-500 leading-relaxed">{item.excerpt}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 hover:text-accent-700 uppercase tracking-widest transition-colors"
          >
            Read More
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {open && <NewsModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}

function NewsCard({ item, index }: { item: Highlight; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        data-reveal
        style={{ transitionDelay: `${index * 100}ms` }}
        className="group relative overflow-hidden rounded-2xl bg-secondary-50 border border-secondary-200 hover:border-accent-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-900/10 flex flex-col"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {item.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs text-secondary-400 font-medium">{item.date}</span>
          <h3 className="mt-2 font-black text-primary-900 leading-snug flex-1">{item.title}</h3>
          <p className="mt-2 text-sm text-secondary-500 leading-relaxed line-clamp-3">{item.excerpt}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 hover:text-accent-700 uppercase tracking-widest transition-colors"
          >
            Read More
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {open && <NewsModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}

export function MediaHighlights({ highlights }: { highlights?: any[] }) {
  if (!highlights?.length) return null;
  const featured = highlights.find((h) => h.featured) ?? highlights[0];
  const rest = highlights.filter((h) => h !== featured);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div data-reveal className="grid lg:grid-cols-2 gap-10 items-end mb-10">
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Latest News</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              News &amp; <span className="text-accent-500">Highlights</span>
            </h2>
          </div>
          <p className="text-secondary-500 leading-relaxed">
            The latest developments, partnerships, and thought leadership from Verto Holdings.
          </p>
        </div>

        {/* Grid: 2-col */}
        <div className="grid md:grid-cols-2 gap-6">
          <FeaturedCard item={featured} />
          {rest.map((item, i) => (
            <NewsCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
