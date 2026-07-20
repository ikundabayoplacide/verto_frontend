import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ImigongoPattern } from '../components/common/ImigongoPattern';
import { SustainabilityHero } from '../components/sections/SustainabilityHero';
import { SustainabilityPillars } from '../components/sections/SustainabilityPillars';
import { SustainabilityImpact } from '../components/sections/SustainabilityImpact';
import { SustainabilityCommitments } from '../components/sections/SustainabilityCommitments';

function CTA() {
  return (
    <section className="relative mb-2 bg-primary-50 overflow-hidden">
      <ImigongoPattern position="top" height={10} />
      <div className="max-w-3xl mx-auto px-6 text-center" data-reveal>
        <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
          Build a Sustainable<span className="block text-accent-500">Future With Us</span>
        </h2>
        <p className="mt-5 text-secondary-600 leading-relaxed">
          Whether you need ESG advisory, green bond structuring, or sustainable finance solutions — our team is ready to help you lead with purpose.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full bg-accent-500 hover:bg-accent-400 text-white px-7 py-3.5 font-bold text-sm uppercase tracking-widest shadow-lg shadow-accent-900/20 transition"
          >
            Get ESG Advisory
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/services/esg-sustainable-finance"
            className="inline-flex items-center gap-3 rounded-full border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white px-7 py-3.5 font-bold text-sm uppercase tracking-widest transition"
          >
            Our ESG Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <SustainabilityHero />
      <SustainabilityPillars />
      <SustainabilityImpact />
      <SustainabilityCommitments />
      <CTA />
      <Footer />
    </main>
  );
}
