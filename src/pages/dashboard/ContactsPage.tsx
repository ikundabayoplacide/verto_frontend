import { useState } from 'react';
import { FiCheck, FiMail, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
  useMarkContactReadMutation,
  useReplyContactMutation,
} from '../../app/api';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { Table } from '../../components/ui/Table';
import type { TableColumn } from '../../types';

type Row = Record<string, unknown>;
function initials(name: string) { return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase(); }
function timeAgo(d: string) {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ContactsPage() {
  const { data: contacts = [], isLoading } = useGetContactsQuery();
  const [markRead] = useMarkContactReadMutation();
  const [remove]   = useDeleteContactMutation();
  const [reply, { isLoading: replying }] = useReplyContactMutation();

  const [replyTarget, setReplyTarget] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = async () => {
    if (!replyTarget || !replyText.trim()) return;
    await reply({ id: replyTarget.id, reply: replyText }).unwrap();
    setReplyTarget(null);
    setReplyText('');
  };

  const cols: TableColumn<Row>[] = [
    {
      key: 'name', header: 'Sender',
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar initials={initials(String(r.name ?? '?'))} size="sm" />
          <div>
            <p className="font-medium text-secondary-800 leading-tight">{String(r.name ?? '—')}</p>
            <p className="text-xs text-secondary-400">{String(r.email ?? '')}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone',   header: 'Phone',   render: (r) => <span className="text-xs text-secondary-500">{String(r.phone ?? '—')}</span> },
    { key: 'subject', header: 'Subject', render: (r) => <span className="text-sm text-secondary-700 truncate max-w-[180px] block">{String(r.subject ?? '—')}</span> },
    { key: 'message', header: 'Message', render: (r) => <span className="text-xs text-secondary-400 truncate max-w-[200px] block">{String(r.message ?? '—')}</span> },
    { key: 'read',    header: 'Status',  render: (r) => <Badge label={r.read ? 'Read' : 'New'} variant={r.read ? 'secondary' : 'primary'} dot size="sm" /> },
    { key: 'reply',   header: 'Reply',   render: (r) => r.reply ? <span className="text-xs text-secondary-400 truncate max-w-[160px] block italic">"{String(r.reply).slice(0, 60)}…"</span> : <span className="text-xs text-secondary-300">—</span> },
    { key: 'createdAt', header: 'Received', render: (r) => <span className="text-xs text-secondary-400">{r.createdAt ? timeAgo(String(r.createdAt)) : '—'}</span> },
    {
      key: 'actions', header: '',
      render: (r) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => { setReplyTarget(r); setReplyText(String(r.reply ?? '')); }}
            title="Reply"
            className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors"
          >
            <FiMessageSquare size={14} />
          </button>
          {!r.read && (
            <button onClick={() => markRead(r.id as number)} title="Mark as read" className="p-1.5 rounded hover:bg-secondary-100 text-secondary-400 hover:text-primary-600 transition-colors">
              <FiCheck size={14} />
            </button>
          )}
          {!!r.read && <FiMail size={14} className="text-secondary-200 mx-1.5" />}
          <button onClick={() => remove(r.id as number)} className="p-1.5 rounded hover:bg-error-50 text-secondary-400 hover:text-error-500 transition-colors"><FiTrash2 size={14} /></button>
        </div>
      ),
    },
  ];

  const unread = contacts.filter((c: any) => !c.read).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-secondary-800">Contact Messages</h1>
          <p className="text-sm text-secondary-400">{unread} unread · {contacts.length} total</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-secondary-200">
        {isLoading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          : <Table columns={cols} data={contacts as Row[]} keyField="id" emptyText="No contact messages yet." />}
      </div>

      <Modal open={!!replyTarget} onClose={() => setReplyTarget(null)} title="Reply to Message" size="lg">
        {replyTarget && (
          <div className="flex flex-col gap-5">
            <div className="bg-secondary-50 rounded-xl p-4 border border-secondary-200">
              <div className="flex items-center gap-2 mb-2">
                <Avatar initials={initials(String(replyTarget.name ?? '?'))} size="xs" />
                <div>
                  <p className="text-sm font-bold text-secondary-800">{String(replyTarget.name ?? '')}</p>
                  <p className="text-xs text-secondary-400">{String(replyTarget.email ?? '')}</p>
                </div>
              </div>
              <p className="text-sm text-secondary-600 mt-2 whitespace-pre-wrap">{String(replyTarget.message ?? '')}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-secondary-700">Your Reply</label>
              <textarea
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-sm text-secondary-800 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-y min-h-[96px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setReplyTarget(null)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSendReply} loading={replying} disabled={!replyText.trim()}>Send Reply</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
