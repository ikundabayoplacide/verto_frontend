import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FiUser } from 'react-icons/fi';

interface TeamMember {
  name: string;
  role: string;
  qualification: string;
  img: string;
  bio: string[];
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [open, setOpen] = useState(false);
  const hasImg = Boolean(member.img);

  return (
    <>
      <div
        data-reveal
        style={{ transitionDelay: `${index * 100}ms` }}
        className="group relative overflow-hidden rounded-2xl bg-secondary-50 border border-secondary-200 hover:border-accent-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-900/10"
      >
        <div className="aspect-[3/4] overflow-hidden bg-primary-100">
          {hasImg ? (
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-100">
              <FiUser className="w-16 h-16 text-primary-300" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-4 relative z-10">
          <h3 className="font-black text-primary-900 leading-snug">{member.name}</h3>
          <p className="text-sm text-accent-600 font-semibold mt-0.5">{member.role}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 hover:text-accent-700 uppercase tracking-widest transition-colors"
          >
            View Profile
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} size="xl" title={member.name}>
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row gap-5 mb-6">
          <div className="relative shrink-0">
            {hasImg ? (
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-primary-100 flex items-center justify-center shadow-lg">
                <FiUser className="w-10 h-10 text-primary-300" />
              </div>
            )}
            <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-accent-500 border-2 border-white" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-accent-600 uppercase tracking-widest bg-accent-50 border border-accent-100 rounded-full px-3 py-1 w-fit">
              {member.role}
            </span>
            <p className="text-xs text-secondary-500 leading-relaxed mt-1">{member.qualification}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-secondary-100 mb-5" />

        {/* Bio */}
        <div className="space-y-3">
          {member.bio.map((para, i) => (
            <p key={i} className="text-sm text-secondary-600 leading-relaxed">{para}</p>
          ))}
        </div>
      </Modal>
    </>
  );
}

export function AboutTeam({ team: members }: { team?: any[] }) {
  if (!members?.length) return null;
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Management Team ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14" data-reveal>
          <div>
            <span className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="w-8 h-px bg-accent-500" />
              <span className="text-xs font-bold text-accent-600 uppercase tracking-[0.2em]">The People</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 uppercase tracking-tight leading-[0.95]">
              Meet Our <span className="text-accent-500">Team</span>
            </h2>
          </div>
          <p className="text-secondary-500 leading-relaxed">
            Our team combines decades of experience in corporate finance, capital markets, private equity, and ESG advisory across Africa and beyond.
          </p>
        </div>

        <div className="scroll-container mask-edges">
          <div className="scroll-content">
            {[...members, ...members].map((member, i) => (
              <div key={`${member.name}-${i}`} className="shrink-0 w-[260px] sm:w-[280px]">
                <MemberCard member={member} index={i % members.length} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
