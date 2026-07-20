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

const HIGHLIGHTS: Highlight[] = [
    {
    img: '/images/cma.jpg',
    date: 'January 2024',
    category: 'Capital Markets',
    title: 'Capital Markets Advisory Programme Launch',
    excerpt:
      "Verto Holdings launches a dedicated capital markets advisory stream, supporting enterprises in accessing Rwanda Stock Exchange listings.",
    body: [
      "January 2024 marked the official launch of Verto Holdings' Capital Markets Advisory Programme  a structured service offering designed to guide Rwandan companies through the process of accessing public capital markets.",
      "The programme covers the full lifecycle of a capital markets transaction: from early-stage eligibility assessment and financial structuring, through regulatory compliance with the Rwanda Capital Market Authority (CMA), to post-listing investor relations support.",
      "Verto Holdings has partnered with legal and accounting professionals to offer an integrated advisory team, reducing friction for businesses that have traditionally found capital markets participation complex and expensive.",
      "The programme targets SMEs and growth-stage companies, with a particular focus on sectors identified as strategic under Rwanda's National Strategy for Transformation (NST2).",
    ],
  },
  {
    img: '/images/RDB-1-765x768.png',
    date: 'March 2024',
    category: 'Partnership',
    title: 'Verto Holdings Partners with Rwanda Development Board',
    excerpt:
      "A strategic collaboration to strengthen investment advisory services and support Rwanda's Vision 2050 economic transformation goals.",
    body: [
      "In March 2024, Verto Holdings formalized a strategic partnership with the Rwanda Development Board (RDB) — a milestone that underscores the firm's commitment to driving Rwanda's economic transformation.",
      "This collaboration focuses on enhancing investment advisory services for both local and foreign investors, streamlining access to capital markets, and aligning private-sector financial strategies with Rwanda's Vision 2050 agenda.",
      "The partnership will facilitate joint workshops, investor roadshows, and the development of tailored financial instruments designed to unlock new opportunities in high-growth sectors including agribusiness, ICT, tourism, and infrastructure.",
      "Verto Holdings CEO, Dr. Munyaneza Joseph, commented: 'This partnership reflects our shared ambition — a prosperous, investment-ready Rwanda that attracts world-class capital and builds lasting prosperity for its citizens.'",
    ],
    featured: true,
  },

  {
    img: '/images/industries.jpeg',
    date: 'November 2023',
    category: 'Industry',
    title: "Supporting Rwanda's Industrial Sector Growth",
    excerpt:
      "Our team delivers financial restructuring and investment facilitation services to key players in Rwanda's growing manufacturing sector.",
    body: [
      "Throughout the second half of 2023, Verto Holdings deepened its engagement with Rwanda's industrial and manufacturing sector, delivering tailored financial restructuring advisory to several mid-sized enterprises.",
      "Key interventions included debt renegotiation, working capital optimization, and the preparation of bankable investment proposals to attract both local and regional institutional investors.",
      "Verto Holdings also facilitated introductions between manufacturing clients and development finance institutions (DFIs) operating in the East African region, including the African Development Bank and the East African Development Bank.",
      "This work directly supports Rwanda's ambition to grow its industrial sector's contribution to GDP  a key target under the country's Vision 2050 economic blueprint.",
    ],
  },
  // {
  //   img: '/images/fince.jpeg',
  //   date: 'September 2023',
  //   category: 'Finance',
  //   title: 'East Africa Finance Summit  Key Takeaways',
  //   excerpt:
  //     "Verto Holdings participated in the East Africa Finance Summit, sharing insights on cross-border investment and ESG integration.",
  //   body: [
  //     "Verto Holdings took centre stage at the East Africa Finance Summit in September 2023, with Dr. Munyaneza Joseph delivering a keynote address on the evolving landscape of cross-border investment in the region.",
  //     "Panel discussions covered the integration of Environmental, Social, and Governance (ESG) criteria into investment decision-making  a theme Verto Holdings has championed since its founding.",
  //     "The summit brought together over 400 finance professionals, regulators, and investors from across East and Central Africa, providing a valuable platform for Verto Holdings to strengthen its regional network and pipeline.",
  //     "Key takeaways from the summit have been incorporated into Verto Holdings' advisory frameworks, ensuring clients benefit from the latest thinking on sustainable finance, blended finance structures, and regional market trends.",
  //   ],
  // },
];

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

export function MediaHighlights() {
  const [featured, ...rest] = HIGHLIGHTS;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div data-reveal className="grid lg:grid-cols-2 gap-10 items-end mb-14">
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
