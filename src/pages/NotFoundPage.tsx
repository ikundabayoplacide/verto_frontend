import { Link, useNavigate } from "react-router-dom";
import { PageLayout } from "../components/layout";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <section className="bg-white flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left — text */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="w-8 h-px bg-primary-500" />
                <span className="text-xs font-bold text-primary-500 uppercase tracking-[0.2em]">
                  Error 404
                </span>
              </span>
              <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black text-secondary-900 leading-[0.85] uppercase tracking-tight">
                Page Not
                <br />
                <span className="text-primary-500">Found.</span>
              </h1>
              <p className="text-secondary-500 leading-relaxed max-w-md">
                The page you're looking for doesn't exist, has been moved, or
                the URL is incorrect. Let's get you back on track.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-primary-500
                  text-white font-bold text-sm uppercase tracking-widest
                  hover:bg-primary-600 transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Back to Home
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform"
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
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-7 py-4
                  border border-secondary-300 text-secondary-600 font-semibold text-sm uppercase tracking-widest
                  hover:border-primary-500 hover:text-primary-500 transition-colors duration-200"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                Go Back
              </button>
            </div>

            {/* Quick links */}
            <div className="border-t border-secondary-200 pt-8">
              <p className="text-xs font-bold text-secondary-400 uppercase tracking-widest mb-4">
                You might be looking for
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Services", href: "/services/construction" },
                  { label: "Projects", href: "/projects" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="px-4 py-2 border border-secondary-200 text-xs font-bold text-secondary-600 uppercase tracking-widest hover:border-primary-500 hover:text-primary-500 transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right — big 404 visual */}
          <div className="flex items-center justify-center" aria-hidden="true">
            <div className="relative select-none">
              {/* Ghost number */}
              <p className="text-[clamp(8rem,20vw,16rem)] font-black leading-none text-secondary-100 tracking-tight">
                404
              </p>
              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-20 h-20 bg-primary-500 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <p className="text-secondary-500 text-xs font-bold uppercase tracking-widest">
                  Page not found
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
