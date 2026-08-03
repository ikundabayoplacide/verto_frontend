import {
  FiBriefcase,
  FiClock,
  FiExternalLink,
  FiImage,
  FiMail,
  FiMessageSquare,
  FiUsers,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  useGetContactsQuery,
  useGetMediaQuery,
  useGetPartnersQuery,
  useGetServicesQuery,
  useGetTeamQuery,
  useGetTestimonialsQuery,
} from '../../app/api';
import { selectCurrentUser, selectIsAdmin } from '../../app/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import type { TableColumn } from '../../types';

/* ── helpers ── */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

/* ── table row types ── */
type ContactRow = Record<string, unknown>;
type TeamRow    = Record<string, unknown>;

/* ── contact columns ── */
const contactCols: TableColumn<ContactRow>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (r) => (
      <div className="flex items-center gap-2">
        <Avatar initials={initials(String(r.name ?? '?'))} size="xs" />
        <span className="font-medium text-secondary-100">{String(r.name ?? '—')}</span>
      </div>
    ),
  },
  {
    key: 'email',
    header: 'Email',
    render: (r) => <span className="text-secondary-400 text-xs">{String(r.email ?? '—')}</span>,
  },
  {
    key: 'subject',
    header: 'Subject',
    render: (r) => <span className="truncate max-w-[160px] block text-secondary-300">{String(r.subject ?? '—')}</span>,
  },
  {
    key: 'read',
    header: 'Status',
    render: (r) =>
      r.read
        ? <Badge label="Read" variant="secondary" dot size="sm" />
        : <Badge label="New"  variant="primary"   dot size="sm" />,
  },
  {
    key: 'createdAt',
    header: 'Received',
    render: (r) => (
      <span className="text-secondary-500 text-xs">
        {r.createdAt ? timeAgo(String(r.createdAt)) : '—'}
      </span>
    ),
  },
];

/* ── team columns ── */
const teamCols: TableColumn<TeamRow>[] = [
  {
    key: 'name',
    header: 'Member',
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <Avatar
          src={r.image ? String(r.image) : undefined}
          initials={initials(String(r.name ?? '?'))}
          size="sm"
        />
        <div>
          <p className="font-medium text-secondary-100 leading-tight">{String(r.name ?? '—')}</p>
          <p className="text-xs text-secondary-500 leading-tight">{String(r.role ?? '')}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'department',
    header: 'Department',
    render: (r) => <span className="text-secondary-400 text-xs">{String(r.department ?? '—')}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) =>
      r.status === 'inactive'
        ? <Badge label="Inactive" variant="error"   dot size="sm" />
        : <Badge label="Active"   variant="success" dot size="sm" />,
  },
];

/* ── stat card ── */
interface StatProps {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
}

function Stat({ label, value, sub, icon }: StatProps) {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 p-5 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-secondary-800 tabular-nums">{value}</p>
        <p className="text-xs text-secondary-400 mt-0.5">{sub}</p>
      </div>
      <span className="w-10 h-10 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 shrink-0">
        {icon}
      </span>
    </div>
  );
}

/* ── section header ── */
function SectionHeader({ title, path, onNavigate }: { title: string; path: string; onNavigate: (p: string) => void }) {
  return (
    <div className="flex items-center justify-between mb-3 bg-accent-50 px-4 py-2 rounded-lg border border-accent-100">
      <h2 className="text-sm font-semibold text-secondary-700">{title}</h2>
      <button
        type="button"
        onClick={() => onNavigate(path)}
        className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-700 transition-colors"
      >
        View all <FiExternalLink size={11} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DashboardHome
══════════════════════════════════════════════ */
export default function DashboardHome() {
  const navigate  = useNavigate();
  const isAdmin   = useAppSelector(selectIsAdmin);
  const user      = useAppSelector(selectCurrentUser);

  const { data: services     = [], isLoading: loadSvc  } = useGetServicesQuery();
  const { data: team         = [], isLoading: loadTeam } = useGetTeamQuery();
  const { data: contacts     = [], isLoading: loadCon  } = useGetContactsQuery();
  const { data: media        = [], isLoading: loadMed  } = useGetMediaQuery();
  const { data: partners     = [], isLoading: loadPar  } = useGetPartnersQuery();
  const { data: testimonials = []                       } = useGetTestimonialsQuery();

  const unread     = contacts.filter((c: any) => !c.read).length;
  const anyLoading = loadSvc || loadTeam || loadCon || loadMed || loadPar;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Overview</h1>
          <p className="text-sm text-secondary-400 mt-0.5">
            Welcome back, <span className="font-semibold text-secondary-600">{user?.name ?? 'Admin'}</span>
            {' '}—{' '}
            <span className={isAdmin ? 'text-primary-500' : 'text-accent-600'}>
              {isAdmin ? 'Administrator' : 'Editor'}
            </span>
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs text-secondary-400 bg-white border border-secondary-200 rounded-lg px-3 py-2 shrink-0">
          <FiClock size={12} />
          {new Date().toLocaleDateString('en-RW', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
          })}
        </span>
      </div>

      {/* ── Stat cards ── */}
      {anyLoading ? (
        <div className="flex items-center justify-center h-28">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Stat label="Services"     value={services.length}     sub="Active offerings"     icon={<FiBriefcase     size={17} />} />
          <Stat label="Team"         value={team.length}         sub="All divisions"        icon={<FiUsers         size={17} />} />
          {isAdmin && (
            <Stat label="Contacts"   value={unread}              sub={`${contacts.length} total`} icon={<FiMail    size={17} />} />
          )}
          <Stat label="Media"        value={media.length}        sub="Press & publications" icon={<FiImage         size={17} />} />
          <Stat label="Partners"     value={partners.length}     sub="Strategic partners"   icon={<FiUsers         size={17} />} />
          <Stat label="Testimonials" value={testimonials.length} sub="Client feedback"      icon={<FiMessageSquare size={17} />} />
        </div>
      )}

      {/* ── Tables row ── */}
      <div className={`grid grid-cols-1 gap-6 ${isAdmin ? 'lg:grid-cols-5' : ''}`}>

        {/* Recent contacts — admin only */}
        {isAdmin && (
          <div className="lg:col-span-3">
            <SectionHeader title="Recent Contact Messages" path="/dashboard/contacts" onNavigate={navigate} />
            <Table
              columns={contactCols}
              data={(contacts as ContactRow[]).slice(0, 5)}
              keyField="id"
              loading={loadCon}
              emptyText="No contact messages yet."
            />
          </div>
        )}

        {/* Team */}
        <div className={isAdmin ? 'lg:col-span-2' : ''}>
          <SectionHeader title="Team Members" path="/dashboard/team" onNavigate={navigate} />
          <Table
            columns={teamCols}
            data={(team as TeamRow[]).slice(0, 5)}
            keyField="id"
            loading={loadTeam}
            emptyText="No team members found."
          />
        </div>
      </div>

      {/* ── Services list ── */}
      <div>
        <SectionHeader title="Services" path="/dashboard/services" onNavigate={navigate} />
        <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
          {loadSvc ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : services.length === 0 ? (
            <p className="text-sm text-secondary-400 text-center py-8">No services added yet.</p>
          ) : (
            <div className="divide-y divide-secondary-100">
              {services.slice(0, 6).map((svc: any) => (
                <div key={svc.id} className="flex items-center gap-4 px-5 py-3 hover:bg-secondary-50 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 shrink-0">
                    <FiBriefcase size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-secondary-700 truncate">
                      {svc.title ?? svc.name ?? 'Untitled'}
                    </p>
                    <p className="text-xs text-secondary-400 truncate mt-0.5">
                      {svc.description ?? svc.shortDescription ?? ''}
                    </p>
                  </div>
                  <Badge label="Active" variant="success" dot size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Partners ── */}
      {partners.length > 0 && (
        <div>
          <SectionHeader title="Strategic Partners" path="/dashboard/partners" onNavigate={navigate} />
          <div className="bg-white rounded-xl border border-secondary-200 px-5 py-4 flex flex-wrap gap-3">
            {partners.slice(0, 10).map((p: any) => (
              <div
                key={p.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-secondary-200 bg-secondary-50"
              >
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="h-5 object-contain" />
                ) : (
                  <Avatar initials={initials(String(p.name ?? 'P'))} size="xs" />
                )}
                <span className="text-xs font-medium text-secondary-600">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
