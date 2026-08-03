import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MediaHero } from '../components/sections/MediaHero';
import { MediaHighlights } from '../components/sections/MediaHighlights';
import { MediaGallery } from '../components/sections/MediaGallery';
// import { MediaVideos } from '../components/sections/MediaVideos';
import { CTA } from '../components/sections/CTA';
import { useGetMediaHighlightsQuery, useGetMediaQuery } from '../app/api';

export default function MediaPage() {
  const { data: highlights } = useGetMediaHighlightsQuery(undefined);
  const { data: gallery } = useGetMediaQuery();

  const galleryItems = gallery?.map((m: any) => ({
    src: m.img,
    alt: m.title,
    category: m.category,
  })) ?? [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <MediaHero />
      <MediaHighlights highlights={highlights} />
      {/* <MediaVideos /> */}
      <MediaGallery items={galleryItems} />
      <CTA />
      <Footer />
    </main>
  );
}
