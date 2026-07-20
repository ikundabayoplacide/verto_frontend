import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MediaHero } from '../components/sections/MediaHero';
import { MediaHighlights } from '../components/sections/MediaHighlights';
import { MediaGallery } from '../components/sections/MediaGallery';
import { MediaVideos } from '../components/sections/MediaVideos';
import { CTA } from '../components/sections/CTA';

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <MediaHero />
      <MediaHighlights />
      <MediaVideos />
      <MediaGallery />
      <CTA />
      <Footer />
    </main>
  );
}
