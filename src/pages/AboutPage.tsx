import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { AboutHero } from '../components/sections/AboutHero';
import { AboutMission } from '../components/sections/AboutMission';
import { AboutValues } from '../components/sections/AboutValues';
import { AboutTimeline } from '../components/sections/AboutTimeline';
import { AboutTeam } from '../components/sections/AboutTeam';
import { AboutPartners } from '../components/sections/AboutPartners';
import { Stats } from '../components/sections/Stats';
import { CTA } from '../components/sections/CTA';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <AboutMission />
      <Stats />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <AboutPartners />
      <CTA />
      <Footer />
    </main>
  );
}
