import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Stats } from "../components/sections/Stats";
import { Services } from "../components/sections/Services";
import { WhyUs } from "../components/sections/WhyUs";
// import { Projects } from "../components/sections/Projects";
import { Testimonials } from "../components/sections/Testimonials";
import { CTA } from "../components/sections/CTA";
// import { Contact } from "../components/sections/Contact";
import { Partners } from "../components/sections/Partners";

function IconChat() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function PlanFab() {
  return (
    <Link
      to="/"
      id="plan"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full bg-white shadow-2xl shadow-black/20 border border-secondary-200 px-5 py-3 hover:shadow-black/30 transition-shadow duration-200"
    >
      <span className="grid place-items-center w-9 h-9 rounded-full bg-accent-500 text-white">
        <IconChat />
      </span>
      <span className="text-sm font-semibold text-primary-900">Talk to Us</span>
      <span className="text-[10px] font-semibold uppercase text-accent-600 bg-accent-50 rounded-full px-2 py-0.5">Beta</span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Partners />
      <About />
      <Stats />
      <Services />
      <WhyUs />
      {/* <Projects /> */}
      <Testimonials />
      <CTA />
      {/* <Contact /> */}
      <Footer />
      <PlanFab />
    </main>
  );
}
