// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';


export function About() {
  return (
    <section id="about" className="relative bg-secondary-50 overflow-hidden">
      <div className=" mx-auto gap-3  lg:px-10 grid lg:grid-cols-2 items-center relative">
        <div data-reveal="left" className="hidden md:flex justify-center">
          {/* <DotLottieReact src="/Team.lottie" loop autoplay style={{ width: '1000px', height: '600px' }} /> */}
          <img
            src="/images/fince.jpeg"
            alt="about us"
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
        <div
          data-reveal="right"
          className="space-y-5 text-secondary-600 leading-relaxed"
        >
          <h2 className="text-3xl md:text-4xl font-black text-primary-900 uppercase tracking-tight">
            About Us
          </h2>
          <p>
            Verto Holdings Ltd is a Rwandan financial services and corporate
            finance firm incorporated in Kigali in 2018. It operates as a
            Securities Sponsor licensed by the Capital Market Authority of
            Rwanda since 2025 and provides advisory and intermediary services in
            the capital markets.
          </p>
          <p>
            As a Securities Sponsor, Verto Holdings plays a key role in
            supporting companies, especially those seeking public listings,
            capital raising, and compliance with regulatory requirements on the
            Rwanda Stock Exchange (RSE) and in the broader Rwandan capital
            market.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white transition px-5 py-2.5 text-sm font-bold uppercase tracking-widest"
          >
            Our Story
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
