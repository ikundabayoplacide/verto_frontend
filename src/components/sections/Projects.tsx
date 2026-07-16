import { Link } from 'react-router-dom';

const IMG = {
  fullShape: 'https://rcb.rw/_next/static/media/full_shape.55e92dbb.png',
};

const PROJECTS = [
  { id: '1', category: 'Commercial',  year: '2024', title: 'Westlands Office Complex',    location: 'KG 9 Ave, Nyarugenge, Kigali',   img: '/images/City.jpg' },
  { id: '2', category: 'Residential', year: '2023', title: 'Karen Residential Villa',     location: 'KG 9 Ave, Nyarugenge, Kigali',   img: '/images/City.jpeg' },
  { id: '3', category: 'Renovation',  year: '2023', title: 'Parklands Office Renovation', location: 'KG 9 Ave, Nyarugenge, Kigali',   img: '/images/office.jpeg' },
  { id: '4', category: 'Industrial',  year: '2022', title: 'Kigali Industrial Park',      location: 'KG 9 Ave, Nyarugenge, Kigali',   img: '/images/industries.jpeg' },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-secondary-50 overflow-hidden">
      <img src={IMG.fullShape} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-primary-500" />
              <span className="text-xs font-bold text-primary-500 uppercase tracking-[0.2em]">Our Portfolio</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Featured <span className="text-primary-500">Projects</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-secondary-100">
              <div className="relative overflow-hidden aspect-video">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-widest bg-primary-500 text-white rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-secondary-400 mb-1">{p.year}</div>
                <h3 className="text-base font-black text-primary-900 leading-snug min-h-[44px] uppercase">{p.title}</h3>
                <p className="mt-2 text-sm text-secondary-400">{p.location}</p>
                <div className="mt-5 pt-4 border-t border-secondary-100">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-500 group-hover:gap-3 transition-all uppercase tracking-widest">
                    View Project
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 hover:bg-primary-400 text-white px-7 py-3 font-bold text-sm uppercase tracking-widest transition"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
