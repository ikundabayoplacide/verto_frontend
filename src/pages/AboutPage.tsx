import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { AboutHero } from '../components/sections/AboutHero';
import { AboutMission } from '../components/sections/AboutMission';
import { AboutValues } from '../components/sections/AboutValues';
import { AboutTimeline } from '../components/sections/AboutTimeline';
// import { AboutTeam } from '../components/sections/AboutTeam';
import { AboutPartners } from '../components/sections/AboutPartners';
import { Stats } from '../components/sections/Stats';
import { CTA } from '../components/sections/CTA';
import {
  useGetStatsQuery,
  useGetCoreValuesQuery,
  useGetTimelineQuery,
  // useGetTeamQuery,
  useGetPartnersQuery,
} from '../app/api';

export default function AboutPage() {
  const { data: apiStats } = useGetStatsQuery();
  const { data: apiValues } = useGetCoreValuesQuery();
  const { data: apiTimeline } = useGetTimelineQuery();
  // const { data: apiTeam } = useGetTeamQuery();
  const { data: apiPartners } = useGetPartnersQuery();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <AboutMission />
      <Stats stats={apiStats} />
      <AboutValues values={apiValues} />
      <AboutTimeline milestones={apiTimeline} />
      {/* <AboutTeam team={apiTeam} /> */}
      <AboutPartners partners={apiPartners} />
      <CTA />
      <Footer />
    </main>
  );
}
