import { useState } from 'react';

interface VideoItem {
  src: string;
  poster: string;
  title: string;
  description: string;
  tag: string;
}

const VIDEOS: VideoItem[] = [
  {
    src: '/images/vero1.mp4',
    poster: '/images/hero-office.jpg',
    title: 'Verto Holdings — Company Overview',
    description: 'An introduction to Verto Holdings, our mission, and the value we deliver to clients across East Africa.',
    tag: 'Corporate',
  },
  {
    src: '/images/vero2.mp4',
    poster: '/images/highlight-financial-services.jpg',
    title: 'Financial Advisory in Action',
    description: 'See how our advisory team supports businesses through capital raising, restructuring, and investment strategy.',
    tag: 'Advisory',
  },
  {
    src: '/images/vero3.mp4',
    poster: '/images/highlight-protection.jpg',
    title: 'Investment & Capital Markets',
    description: 'Highlights from our capital markets engagements and investor relations work across Rwanda.',
    tag: 'Markets',
  },
  {
    src: '/images/verovi.mp4',
    poster: '/images/City.jpeg',
    title: 'Rwanda — A Growing Financial Hub',
    description: "Exploring Rwanda's rise as a leading financial and investment destination in Sub-Saharan Africa.",
    tag: 'Rwanda',
  },
];

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      data-reveal
      style={{ transitionDelay: `${index * 100}ms` }}
      className="group rounded-2xl overflow-hidden bg-secondary-50 border border-secondary-200 hover:border-accent-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-900/10 flex flex-col"
    >
      {/* Video player */}
      <div className="relative aspect-video bg-primary-900 overflow-hidden">
        {playing ? (
          <video
            src={video.src}
            poster={video.poster}
            autoPlay
            controls
            className="w-full h-full object-cover"
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <>
            <img
              src={video.poster}
              alt={video.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary-900/50" />
            <button
              type="button"
              aria-label={`Play video: ${video.title}`}
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group/btn"
            >
              <span className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center shadow-lg shadow-accent-900/40 transition-transform duration-200 group-hover/btn:scale-110">
                <svg
                  className="w-7 h-7 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </span>
            </button>
          </>
        )}

        {/* Tag badge */}
        <span className="absolute top-3 left-3 bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full pointer-events-none">
          {video.tag}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-primary-900 leading-snug text-base">{video.title}</h3>
        <p className="mt-2 text-sm text-secondary-500 leading-relaxed flex-1">{video.description}</p>
        {!playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 hover:text-accent-700 uppercase tracking-widest transition-colors"
          >
            Watch Now
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function MediaVideos() {
  return (
    <section className="py-10 bg-secondary-50 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-accent-500/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-900/5 translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <div data-reveal className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">Video Stories</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Watch Our <span className="text-accent-500">Stories</span>
            </h2>
          </div>
          <p className="text-secondary-500 leading-relaxed">
            From company highlights to market insights — watch how Verto Holdings is shaping the future of finance in East Africa.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.src} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
