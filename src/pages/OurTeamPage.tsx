import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiLinkedin, FiPlus, FiUser, FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useGetTeamQuery } from '../app/api';
import { PageLayout } from '../components/layout/PageLayout';
import { Spinner } from '../components/ui/Spinner';

/* ─── types ─────────────────────────────────────────────────────────────────── */
interface TeamMember {
  id?: number;
  category?: 'Board of Governance' | 'Management Team';
  name: string;
  role: string;
  qualification?: string;
  img?: string;
  image?: string;
  bio?: string | string[];
  linkedin?: string;
}

function bioArray(bio?: string | string[]): string[] {
  if (!bio) return [];
  return Array.isArray(bio) ? bio : [bio];
}

/* ─── MemberCard ─────────────────────────────────────────────────────────────── */
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const photo = member.img || member.image || '';
  const paras = bioArray(member.bio);

  useEffect(() => {
    if (!isBioOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsBioOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isBioOpen]);

  return (
    <div
      data-reveal
      style={{ transitionDelay: `${Math.min(index * 80, 400)}ms` }}
      className="flex flex-col"
    >
      {/* ── Main row: circle photo + info ── */}
      <div className="flex items-center gap-6 py-6">

        {/* Circular photo */}
        <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-secondary-100 border-2 border-secondary-200">
          {photo ? (
            <img
              src={photo}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-50">
              <FiUser className="w-10 h-10 text-primary-200" />
            </div>
          )}
        </div>

        {/* Info + action buttons */}
        <div className="flex flex-col gap-2 min-w-0">
          <h3 className="font-black text-primary-900 text-lg leading-tight">{member.name}</h3>
          <p className="text-secondary-500 text-sm leading-snug">{member.role}</p>
          {member.qualification && (
            <p className="text-xs text-secondary-400 leading-snug line-clamp-2">{member.qualification}</p>
          )}

          {/* Action buttons row */}
          <div className="flex items-center gap-2 mt-1">

            {/* Expand / collapse bio */}
            {paras.length > 0 && (
              <button
                type="button"
                ref={triggerRef}
                onClick={() => setIsBioOpen(true)}
                aria-label={`View details for ${member.name}`}
                className="group relative w-8 h-8 rounded-full border-2 border-accent-500 flex items-center justify-center text-accent-600 hover:bg-accent-50 transition-colors shrink-0"
              >
                <FiPlus size={14} strokeWidth={2.5} />
                <span aria-hidden="true" className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-primary-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  View more
                </span>
              </button>
            )}

            {/* LinkedIn */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="w-8 h-8 rounded-full border-2 border-accent-500 flex items-center justify-center text-accent-600 hover:bg-accent-50 transition-colors shrink-0"
              >
                <FiLinkedin size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Expanded bio ── */}
      {isBioOpen && paras.length > 0 && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/80 p-4 backdrop-blur-sm" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsBioOpen(false);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby={`team-bio-title-${member.id ?? index}`} className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-xl bg-white shadow-2xl">
            <button type="button" onClick={() => {
              setIsBioOpen(false);
              triggerRef.current?.focus();
            }} aria-label="Close team member details" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent-400 sm:right-6 sm:top-6">
              <FiX size={20} />
            </button>
            <header className="bg-primary-900 px-6 py-8 text-white sm:px-10 sm:py-10">
              <div className="flex items-center gap-5 pr-10 sm:gap-7">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-accent-400 bg-primary-800 sm:h-24 sm:w-24">
                  {photo ? <img src={photo} alt="" className="h-full w-full object-cover object-top" /> : <div className="flex h-full w-full items-center justify-center"><FiUser className="h-9 w-9 text-primary-300" /></div>}
                </div>
                <div className="min-w-0">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-400">{member.category ?? 'Team member'}</p>
                  <h2 id={`team-bio-title-${member.id ?? index}`} className="text-2xl font-black leading-tight sm:text-3xl">{member.name}</h2>
                  <p className="mt-2 text-sm leading-snug text-primary-200">{member.role}</p>
                </div>
              </div>
            </header>
            <div className="px-6 py-7 sm:px-10 sm:py-9">
              {member.qualification && <p className="mb-5 border-l-2 border-accent-500 pl-4 text-sm leading-relaxed text-secondary-500">{member.qualification}</p>}
              <div className="space-y-4">
                {paras.map((p, i) => <p key={i} className="text-sm leading-7 text-secondary-600">{p}</p>)}
              </div>
              {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded border border-primary-200 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-800 transition-colors hover:border-primary-900 hover:bg-primary-900 hover:text-white"><FiLinkedin size={15} /> LinkedIn profile</a>}
            </div>
          </section>
        </div>,
        document.body
      )}

      {/* ── Green bottom border line ── */}
      <div className="h-0.5 bg-accent-500/40 w-full" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   OurTeamPage
══════════════════════════════════════════════════════════════════════════════ */
export default function OurTeamPage() {
  const { data: members = [], isLoading } = useGetTeamQuery();

  return (
    <PageLayout>

      {/* ── Intro — dark left + light right ── */}
      <section className="bg-white pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.6fr] min-h-105">

            {/* LEFT dark panel */}
            <div className="bg-primary-900 px-10 py-16 lg:px-14 flex flex-col justify-between">
              <div>
                <span className="flex items-center gap-3 mb-8">
                  <span aria-hidden="true" className="w-6 h-px bg-accent-400" />
                  <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">The People</span>
                </span>
                <h1 className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.92] mb-8">
                  Our<br />
                  <span className="text-accent-400">Team</span>
                </h1>
                <p className="text-primary-200 leading-relaxed text-sm max-w-xs">
                  Verto Holdings is driven by a multidisciplinary team of corporate finance professionals,
                  capital market specialists, and ESG advisors — united by a commitment to sustainable
                  growth across Rwanda and East Africa.
                </p>
              </div>
              <div className="mt-10 lg:mt-0">
                <div className="h-px bg-primary-700 mb-6" />
                <p className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2">Leadership</p>
                <p className="text-primary-300 text-sm leading-relaxed">
                  Our leadership combines decades of experience, deep institutional networks,
                  and a proven track record of delivering measurable results.
                </p>
              </div>
            </div>

            {/* RIGHT light panel */}
            <div className="px-10 py-16 lg:px-14 flex flex-col justify-center bg-secondary-50">
              <p className="text-secondary-700 leading-relaxed text-base mb-6 max-w-xl">
                Verto Holdings combines deep expertise across corporate advisory, capital markets, private
                equity, and ESG consulting. Our people work alongside governments, development finance
                institutions, and private sector clients to unlock investment and catalyse long-term impact.
              </p>
              <p className="text-secondary-500 leading-relaxed text-sm max-w-xl">
                Through trusted partnerships, proven analytical tools, and hands-on implementation
                experience, we design and deliver context-specific solutions that drive efficiency and
                sustainable value creation across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Team ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Section title */}
          <div className="flex items-center gap-6 mb-4" data-reveal>
            <h2 className="text-2xl font-black text-primary-900 uppercase tracking-tight whitespace-nowrap">
              Our Core Team
            </h2>
            <div className="flex-1 h-px bg-secondary-200" />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-24"><Spinner size="lg" /></div>
          ) : members.length > 0 ? (
            <div className="space-y-14">
              {(['Board of Governance', 'Management Team'] as const).map((category) => {
                const groupMembers = (members as TeamMember[]).filter((member) => member.category === category);
                if (!groupMembers.length) return null;
                return (
                  <section key={category} aria-labelledby={`team-${category.replaceAll(' ', '-').toLowerCase()}`}>
                    <h3 id={`team-${category.replaceAll(' ', '-').toLowerCase()}`} className="text-xl font-black text-primary-900 uppercase tracking-tight mb-4">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                      {groupMembers.map((member, i) => (
                        <MemberCard key={member.id ?? member.name + i} member={member} index={i} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <p className="text-secondary-400 text-center py-20">
              Team profiles are being updated — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ── Expert Consultants — dark band ── */}
      <section className="bg-primary-900 py-20" data-reveal>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="w-6 h-px bg-accent-400" />
                <span className="text-xs font-bold text-accent-400 uppercase tracking-[0.2em]">Collaborate</span>
              </span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-tight mb-5">
                Expert<br />
                <span className="text-accent-400">Consultants</span>
              </h2>
              <p className="text-primary-300 leading-relaxed text-sm max-w-sm">
                We work with a diverse network of sector specialists and expert consultants with regional
                representation and proven capacity to deliver across technical, policy, and operational domains.
              </p>
            </div>
            <div>
              <p className="text-primary-200 leading-relaxed mb-8">
                Interested in joining our network? Share your expertise with us to be considered for
                our consultant and partner programme. We are always looking for professionals who share
                our commitment to sustainable growth across East Africa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm uppercase tracking-wider rounded transition-colors"
                >
                  Get In Touch <FiArrowRight size={15} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3 border border-primary-600 hover:border-primary-400 text-primary-200 hover:text-white font-bold text-sm uppercase tracking-wider rounded transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
