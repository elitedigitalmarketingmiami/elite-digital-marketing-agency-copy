import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Share2, X, ChevronDown, RefreshCw } from 'lucide-react';

const STATUS_COLORS = {
  new: '#74F0ED',
  contacted: '#74F0ED',
  approved: '#22c55e',
  rejected: '#EA445A',
  reviewed: '#f59e0b',
  interview: '#a78bfa',
  hired: '#22c55e',
  active: '#22c55e',
  inactive: '#EA445A',
};

const CREATOR_STATUSES = ['new', 'contacted', 'approved', 'rejected'];
const CAREER_STATUSES = ['new', 'reviewed', 'interview', 'hired', 'rejected'];
const AMBASSADOR_STATUSES = ['active', 'inactive'];

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#888';
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      {status}
    </span>
  );
}

function DetailModal({ item, type, onClose, onStatusChange }) {
  const statuses = type === 'creator' ? CREATOR_STATUSES : type === 'career' ? CAREER_STATUSES : AMBASSADOR_STATUSES;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)' }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }} onClick={e => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{ background: '#0d0d0d', borderColor: 'rgba(116,240,237,0.2)' }}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">{item.full_name}</h3>
            <p className="text-white/40 text-sm font-body mt-0.5">
              {new Date(item.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/50" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {Object.entries(item).filter(([k]) => !['id', 'created_date', 'updated_date', 'created_by', 'status'].includes(k)).map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <span className="text-white/30 text-xs font-display uppercase tracking-wider w-32 shrink-0 pt-0.5">
                {k.replace(/_/g, ' ')}
              </span>
              <span className="text-white/80 text-sm font-body break-words flex-1">
                {typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v || '—')}
              </span>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-white/10">
          <p className="text-white/30 text-xs font-display uppercase tracking-wider mb-3">Update Status</p>
          <div className="flex flex-wrap gap-2">
            {statuses.map(s => (
              <button key={s} onClick={() => onStatusChange(item.id, s)}
                className="px-3 py-1.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all"
                style={{
                  background: item.status === s ? `${STATUS_COLORS[s]}25` : 'rgba(255,255,255,0.05)',
                  color: item.status === s ? STATUS_COLORS[s] : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${item.status === s ? STATUS_COLORS[s] + '50' : 'rgba(255,255,255,0.1)'}`,
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ApplicationTable({ data, type, onSelect }) {
  if (!data?.length) return (
    <div className="text-center py-12 text-white/30 font-body text-sm">No entries yet.</div>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            {['Name', 'Email', 'Phone', type === 'career' ? 'Position' : type === 'ambassador' ? 'Workplace' : 'Location', 'Date', 'Status', ''].map(h => (
              <th key={h} className="text-left py-3 px-4 text-xs font-display uppercase tracking-wider text-white/30">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id} className="border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer" onClick={() => onSelect(row)}>
              <td className="py-3 px-4 font-body text-white font-medium">{row.full_name}</td>
              <td className="py-3 px-4 font-body text-white/60">{row.email}</td>
              <td className="py-3 px-4 font-body text-white/60">{row.phone}</td>
              <td className="py-3 px-4 font-body text-white/60">
                {type === 'career' ? row.position : type === 'ambassador' ? row.current_workplace : `${row.city}, ${row.state}`}
              </td>
              <td className="py-3 px-4 font-body text-white/40 text-xs">
                {new Date(row.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </td>
              <td className="py-3 px-4"><StatusBadge status={row.status || 'new'} /></td>
              <td className="py-3 px-4 text-white/20 text-xs">View →</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState('creator');
  const [selected, setSelected] = useState(null);
  const qc = useQueryClient();

  const { data: creators = [], isLoading: l1 } = useQuery({ queryKey: ['admin-creators'], queryFn: () => base44.entities.CreatorApplication.list('-created_date', 100) });
  const { data: careers = [], isLoading: l2 } = useQuery({ queryKey: ['admin-careers'], queryFn: () => base44.entities.CareerApplication.list('-created_date', 100) });
  const { data: ambassadors = [], isLoading: l3 } = useQuery({ queryKey: ['admin-ambassadors'], queryFn: () => base44.entities.BrandAmbassador.list('-created_date', 100) });

  const updateCreator = useMutation({ mutationFn: ({ id, status }) => base44.entities.CreatorApplication.update(id, { status }), onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-creators'] }) });
  const updateCareer = useMutation({ mutationFn: ({ id, status }) => base44.entities.CareerApplication.update(id, { status }), onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-careers'] }) });
  const updateAmbassador = useMutation({ mutationFn: ({ id, status }) => base44.entities.BrandAmbassador.update(id, { status }), onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-ambassadors'] }) });

  const handleStatusChange = (id, status) => {
    if (tab === 'creator') updateCreator.mutate({ id, status });
    else if (tab === 'career') updateCareer.mutate({ id, status });
    else updateAmbassador.mutate({ id, status });
    setSelected(prev => prev ? { ...prev, status } : null);
  };

  const tabs = [
    { id: 'creator', label: 'Creator Applications', icon: Users, count: creators.length, data: creators },
    { id: 'career', label: 'Career Applications', icon: Briefcase, count: careers.length, data: careers },
    { id: 'ambassador', label: 'Ambassadors', icon: Share2, count: ambassadors.length, data: ambassadors },
  ];

  const activeTab = tabs.find(t => t.id === tab);
  const isLoading = l1 || l2 || l3;

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-3"
              style={{ background: 'rgba(116,240,237,0.1)', color: '#74F0ED', border: '1px solid rgba(116,240,237,0.2)' }}>
              Admin Panel
            </div>
            <h1 className="font-serif text-4xl font-black text-white">Applications Dashboard</h1>
            <p className="text-white/40 font-body text-sm mt-1">All incoming applications — Elite Digital Marketing Agency</p>
          </div>
          <button onClick={() => qc.invalidateQueries()} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white text-sm font-body transition-colors">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="p-5 rounded-xl border text-left transition-all"
              style={{
                borderColor: tab === t.id ? 'rgba(116,240,237,0.3)' : 'rgba(255,255,255,0.08)',
                background: tab === t.id ? 'rgba(116,240,237,0.06)' : 'rgba(255,255,255,0.02)',
              }}>
              <t.icon className="w-5 h-5 mb-3" style={{ color: tab === t.id ? '#74F0ED' : 'rgba(255,255,255,0.3)' }} />
              <p className="font-serif text-3xl font-black text-white">{t.count}</p>
              <p className="text-white/40 text-xs font-body mt-1">{t.label}</p>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0a0a0a' }}>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-display font-bold text-white">{activeTab?.label}</h2>
            {isLoading && <RefreshCw className="w-4 h-4 text-white/30 animate-spin" />}
          </div>
          {activeTab && <ApplicationTable data={activeTab.data} type={tab} onSelect={setSelected} />}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <DetailModal item={selected} type={tab} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
        )}
      </AnimatePresence>
    </div>
  );
}