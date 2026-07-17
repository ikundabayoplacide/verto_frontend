import { useState } from 'react';
import { Modal } from '../ui/Modal';

interface TeamMember {
  name: string;
  role: string;
  qualification: string;
  img: string;
  bio: string[];
}

const TEAM: TeamMember[] = [
  {
    name: 'Dr. Munyaneza Joseph (PhD)',
    role: 'Founder & CEO · Board Member',
    qualification: 'PhD in Finance (EIAR, Estonia) · MBA Finance (Daystar University) · ICIFA Member',
    img: '/images/team-joseph-munyaneza.jpg',
    bio: [
      'Joseph Munyaneza is an accomplished finance expert with extensive experience across investment advisory, financial markets development, and public sector leadership. He holds a PhD in Finance from the European Institute of Applied Research (EIAR) in Estonia, an MBA in Finance from Daystar University in Nairobi, and a bachelor\'s degree in Finance from the University of Lay Adventist of Kigali.',
      'He is a full member of the Institute of Certified Investment and Financial Analysts (ICIFA) in Kenya. Dr. Munyaneza currently serves as Executive Secretary of the Coffee Exporters and Processors Umbrella of Rwanda (CEPAR), where he leads efforts under the USAID Feed the Future initiative to enhance the coffee sector through investment promotion, capacity building, climate resilience, and export competitiveness.',
      'Throughout his career, Munyaneza has contributed significantly to Rwanda\'s financial ecosystem. He has held roles such as Financial Expert in local government, financial analyst at the Rwanda Stock Exchange, and advisor to both national and regional financial market development projects, including initiatives under the World Bank and East African Community.',
      'His academic engagement spans universities in Rwanda and Kenya, where he has lectured on advanced finance topics. He has also delivered consultancy services including business planning for leading coffee firms and feasibility studies on investment trusts. Fluent in four languages, he combines technical acumen with policy insight, making him a key figure in both finance and agribusiness development in the region.',
    ],
  },
  {
    name: 'Utuje Honoratha',
    role: 'Operations & Finance',
    qualification: 'BSc Accounting Sciences · CPA (Advanced) – ICPAR',
    img: '/public/images/profile3.jpeg',
    bio: [
      'UTUJE Honoratha is a seasoned financial management professional with over 15 years of experience in accounting, auditing, and public fund administration. She currently serves as an Internal Auditor at the Gender Monitoring Office, where she leads compliance audits, risk assessments, and financial reporting initiatives.',
      'Her expertise spans across various public institutions, including local government and the health sector, where she has consistently demonstrated her capability in maintaining financial transparency, implementing internal controls, and guiding financial strategy.',
      'Her professional journey includes significant roles such as Sector Accountant in Musanze District and CBHI Section Manager at Busogo Health Center under RSSB. In these capacities, she led budgeting processes, facilitated audits, and oversaw financial reporting, contributing to institutional performance and service delivery improvement.',
      'UTUJE holds a Bachelor of Accounting Sciences and is an advanced-level candidate in the Certified Public Accountant (CPA) program with ICPAR. She has received specialized training in public procurement, financial systems (IFMIS, SEAS), and audit management, and is proficient in multiple accounting platforms.',
    ],
  },
  {
    name: 'Mr. Joseph Seba Mutware',
    role: 'Board Chairperson',
    qualification: 'MSc. Economic and Rural Development · Wageningen University',
    img: '/public/images/profile2.jpeg',
    bio: [
      'Joseph Seba Mutware is a seasoned expert in policy and institutional development with over 18 years of experience in the public, private, and development sectors. His work focuses on sustainable agriculture, agribusiness, agricultural finance, food systems, and rural development.',
      'He is widely recognized for his ability to integrate cross-cutting priorities like gender equity, youth inclusion, climate resilience, and private sector engagement into both national and regional strategies. Joseph has successfully led complex, evidence-based policy reforms and has an extensive track record in advisory services, strategic planning, and institutional capacity building.',
      'In his most recent role as Deputy Chief of Party and Senior Advisor for the USAID-funded "Feed the Future Rwanda Kungahara Wagura Amasoko" project, Joseph provided strategic oversight for accelerating high-value agricultural exports and investments. He has also served as Senior Policy Advisor for the "Orora Wihaze" project and previously held senior government roles, including as Head of the Government Action Coordination Unit in the Prime Minister\'s Office of Rwanda.',
      'Beyond his full-time roles, Joseph has been a sought-after consultant on high-profile assignments with organizations like AGRA, AfDB, UNDP, FAO, and the Government of Rwanda. Fluent in English, French, Swahili, and Kinyarwanda.',
    ],
  },
  {
    name: 'Mr. Elijah Kihooto Mariga',
    role: 'Board Member',
    qualification: 'CIFA · CPA · MBA Finance (Daystar University)',
    img: '/public/images/profile6.jpg',
    bio: [
      'An accomplished Finance/Accounting expert with extensive experience in budgeting, managing overall accounting functions, preparing and analyzing financial reports, bank and cash management, handling external audit and tax matters.',
      'He possesses a proven ability to improve and maximize overall business and finance function integration through effective communication processes, with strong skills in coordinating all aspects from inception through completion.',
      'He holds a Master\'s in Business Administration in Finance from Daystar University (2011–2013) and a Bachelor of Business Administration with IT–Finance, 2nd Upper (2006–2010).',
      'He is a certified member of both the Institute of Certified Investment and Financial Analysts (CIFA) and the Institute of Certified Public Accountants (CPA), bringing dual professional certification to the board.',
    ],
  },
];



function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        data-reveal
        style={{ transitionDelay: `${index * 100}ms` }}
        className="group relative overflow-hidden rounded-2xl bg-secondary-50 border border-secondary-200 hover:border-accent-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-900/10"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
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

      <Modal open={open} onClose={() => setOpen(false)} size="lg" title={member.name}>
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={member.img}
            alt={member.name}
            className="w-full sm:w-36 h-48 sm:h-44 object-cover rounded-xl shrink-0"
          />
          <div>
            <p className="text-primary-300 font-bold text-sm">{member.role}</p>
            <p className="text-secondary-400 text-xs mt-1 leading-relaxed">{member.qualification}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {member.bio.map((para, i) => (
            <p key={i} className="text-sm text-secondary-300 leading-relaxed">{para}</p>
          ))}
        </div>
      </Modal>
    </>
  );
}

export function AboutTeam() {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
