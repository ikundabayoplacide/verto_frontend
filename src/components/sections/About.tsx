// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';


export function About() {
  return (
    <section id="about" className="relative bg-secondary-50 overflow-hidden">
      <div className=" mx-auto gap-3  lg:px-10 grid lg:grid-cols-2 items-center relative">
        <div data-reveal="left" className="hidden md:flex justify-center">
          {/* <DotLottieReact src="/Team.lottie" loop autoplay style={{ width: '1000px', height: '600px' }} /> */}
          <img src="/images/fince.jpeg" alt="about us" className="rounded-2xl w-full h-full object-cover" />
        </div>
        <div data-reveal="right" className="space-y-5 text-secondary-600 leading-relaxed">
          <h2 className="text-3xl md:text-4xl font-black text-primary-900 uppercase tracking-tight">
            About Us
          </h2>
          <p>
            Verto Holdings Ltd is a specialized consultancy firm offering cutting-edge financial, investment, and capital market advisory services across Rwanda and the broader East African region. Founded with a vision to bridge the capital and knowledge gaps between enterprises and financial institutions, we deliver bespoke solutions for businesses seeking sustainable growth, access to funding, and capital market participation.
          </p>
          <p>
            Our strategic mission is to empower public and private entities through customized consultancy in capital raising, financial structuring, ESG compliance, sustainable finance, and market development. We are backed by a team of highly experienced professionals — corporate finance experts, asset managers, private equity specialists, and commodities trading professionals.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition px-5 py-2.5 text-sm font-bold uppercase tracking-widest"
          >
            Our Story
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>




    </section>
  );
}
