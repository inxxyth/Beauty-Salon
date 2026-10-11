'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  LogOut,
  Users,
  Mail,
  TrendingUp,
  Calendar,
  Sparkles,
  RefreshCw,
  Download,
  Filter,
} from 'lucide-react';

type Lead = {
  id: string;
  name: string;
  phone: string;
  service: string;
  preferredDate: string | null;
  message: string | null;
  status: 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'ARCHIVED';
  source: string;
  createdAt: string;
};

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  source: string;
  createdAt: string;
};

const STATUSES: Lead['status'][] = [
  'NEW',
  'CONTACTED',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
  'ARCHIVED',
];

const STATUS_COLORS: Record<Lead['status'], string> = {
  NEW: 'bg-luxe-orchid/40 text-luxe-lavender',
  CONTACTED: 'bg-luxe-gold/20 text-luxe-gold',
  CONFIRMED: 'bg-emerald-500/20 text-emerald-300',
  COMPLETED: 'bg-emerald-500/30 text-emerald-200',
  CANCELLED: 'bg-rose-500/20 text-rose-300',
  ARCHIVED: 'bg-luxe-ivory/10 text-luxe-mute',
};

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [token, setToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | Lead['status']>('ALL');
  const [activeTab, setActiveTab] = useState<'leads' | 'subscribers'>('leads');

  // Persist token in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('luxe-admin-token');
    if (saved) {
      setToken(saved);
      setAuthed(true);
    }
  }, []);

  const fetchData = async (tk: string) => {
    setLoading(true);
    try {
      const [lRes, sRes] = await Promise.all([
        fetch('/api/leads', { headers: { authorization: `Bearer ${tk}` } }),
        fetch('/api/subscribers', { headers: { authorization: `Bearer ${tk}` } }),
      ]);
      if (lRes.status === 401 || sRes.status === 401) {
        throw new Error('Unauthorized');
      }
      const [lData, sData] = await Promise.all([lRes.json(), sRes.json()]);
      setLeads(lData.leads || []);
      setSubs(sData.subscribers || []);
    } catch (e: any) {
      setAuthError(e.message || 'Failed to fetch');
      setAuthed(false);
      localStorage.removeItem('luxe-admin-token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed && token) fetchData(token);
  }, [authed, token]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!token.trim()) {
      setAuthError('Enter your admin token');
      return;
    }
    // Verify by attempting first fetch
    fetch('/api/leads', { headers: { authorization: `Bearer ${token.trim()}` } })
      .then((r) => {
        if (!r.ok) throw new Error('Invalid token');
        setAuthed(true);
        localStorage.setItem('luxe-admin-token', token.trim());
      })
      .catch((e) => setAuthError(e.message || 'Auth failed'));
  };

  const handleLogout = () => {
    setAuthed(false);
    setToken('');
    localStorage.removeItem('luxe-admin-token');
  };

  const updateStatus = async (id: string, status: Lead['status']) => {
    try {
      const r = await fetch('/api/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      if (!r.ok) throw new Error('Failed');
      setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (e) {
      // Silent — admin can retry via refresh
    }
  };

  const filteredLeads = useMemo(() => {
    if (filterStatus === 'ALL') return leads;
    return leads.filter((l) => l.status === filterStatus);
  }, [leads, filterStatus]);

  // Stats
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = leads.filter((l) => new Date(l.createdAt) >= today).length;
    const newCount = leads.filter((l) => l.status === 'NEW').length;
    const confirmed = leads.filter((l) => l.status === 'CONFIRMED' || l.status === 'COMPLETED').length;
    const convRate = leads.length ? ((confirmed / leads.length) * 100).toFixed(1) : '0';
    const byService: Record<string, number> = {};
    leads.forEach((l) => {
      byService[l.service] = (byService[l.service] || 0) + 1;
    });
    const topService = Object.entries(byService).sort((a, b) => b[1] - a[1])[0];
    return {
      total: leads.length,
      today: todayCount,
      newCount,
      convRate,
      topService: topService ? topService[0] : '—',
    };
  }, [leads]);

  const exportCsv = () => {
    const rows = [
      ['Name', 'Phone', 'Service', 'Date', 'Status', 'Source', 'Created', 'Message'],
      ...filteredLeads.map((l) => [
        l.name,
        l.phone,
        l.service,
        l.preferredDate || '',
        l.status,
        l.source,
        new Date(l.createdAt).toISOString(),
        (l.message || '').replace(/[\n,]/g, ' '),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${c}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luxe-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-gradient-luxe flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="font-display text-5xl mb-2">
              <span className="text-luxe-ivory">L</span>
              <span className="text-gradient-gold">uxe</span>
            </div>
            <div className="font-accent text-[11px] uppercase tracking-[0.3em] text-luxe-gold/80">
              Admin Atelier
            </div>
          </div>
          <form onSubmit={handleAuth} className="glass-luxe-strong rounded-3xl p-6 md:p-8 ring-gold-soft shadow-glow-purple">
            <label className="block">
              <span className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute block mb-2">
                Admin Token
              </span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxe-mute" />
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your admin token"
                  className="w-full bg-luxe-void/50 border border-luxe-gold/15 rounded-md pl-10 pr-3 py-2.5 text-luxe-ivory placeholder:text-luxe-mute/50 focus:border-luxe-gold focus:outline-none"
                />
              </div>
            </label>
            {authError && (
              <p className="mt-3 text-[11px] text-rose-400">{authError}</p>
            )}
            <button
              type="submit"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-deep px-5 py-3 text-luxe-void font-accent text-xs uppercase tracking-[0.22em] hover:shadow-glow-gold transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              Unlock dashboard
            </button>
            <p className="mt-4 text-[11px] text-luxe-mute text-center">
              Token is stored locally in your browser only.
            </p>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-luxe-void text-luxe-ivory">
      {/* Top bar */}
      <header className="sticky top-0 z-30 glass-luxe-strong border-b border-luxe-gold/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-display text-2xl">
              <span className="text-luxe-ivory">L</span>
              <span className="text-gradient-gold">uxe</span>
            </div>
            <span className="hidden md:inline font-accent text-[10px] uppercase tracking-[0.25em] text-luxe-mute">
              Admin Atelier
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchData(token)}
              aria-label="Refresh"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full glass-luxe text-luxe-gold hover:text-luxe-ivory transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full glass-luxe px-4 py-2 text-xs text-luxe-ivory/80 hover:text-luxe-gold transition-colors font-accent uppercase tracking-[0.18em]"
            >
              View site
            </a>
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full glass-luxe text-luxe-mute hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 md:py-12">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <StatCard
            icon={<Users className="w-4 h-4" />}
            label="Total Leads"
            value={stats.total}
            sub={`${stats.newCount} new`}
          />
          <StatCard
            icon={<Calendar className="w-4 h-4" />}
            label="Today"
            value={stats.today}
            sub="fresh leads"
          />
          <StatCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Conversion"
            value={`${stats.convRate}%`}
            sub="confirmed + done"
          />
          <StatCard
            icon={<Sparkles className="w-4 h-4" />}
            label="Top Service"
            value={stats.topService}
            sub="most-requested"
            small
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-5">
          <TabButton
            active={activeTab === 'leads'}
            onClick={() => setActiveTab('leads')}
            icon={<Users className="w-3.5 h-3.5" />}
            label={`Leads (${leads.length})`}
          />
          <TabButton
            active={activeTab === 'subscribers'}
            onClick={() => setActiveTab('subscribers')}
            icon={<Mail className="w-3.5 h-3.5" />}
            label={`Subscribers (${subs.length})`}
          />
        </div>

        {activeTab === 'leads' && (
          <>
            {/* Filter + Export */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-luxe-mute flex-shrink-0" />
                <button
                  onClick={() => setFilterStatus('ALL')}
                  className={`px-3 py-1.5 rounded-full font-accent text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    filterStatus === 'ALL'
                      ? 'bg-luxe-gold text-luxe-void'
                      : 'glass-luxe text-luxe-ivory/60 hover:text-luxe-gold'
                  }`}
                >
                  All
                </button>
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-full font-accent text-[10px] uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${
                      filterStatus === s
                        ? 'bg-luxe-gold text-luxe-void'
                        : 'glass-luxe text-luxe-ivory/60 hover:text-luxe-gold'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={exportCsv}
                className="inline-flex items-center gap-2 rounded-full glass-luxe-strong px-4 py-2 text-xs text-luxe-gold hover:text-luxe-ivory transition-colors font-accent uppercase tracking-[0.18em]"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            {/* Leads table */}
            <div className="glass-luxe rounded-2xl overflow-hidden ring-gold-soft">
              {filteredLeads.length === 0 ? (
                <div className="py-16 text-center text-luxe-mute">
                  No leads yet — your booking form will populate this list.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-luxe-gold/10 bg-luxe-void/40">
                        <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3">Name</th>
                        <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3">Service</th>
                        <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3 hidden md:table-cell">Date</th>
                        <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3 hidden lg:table-cell">Notes</th>
                        <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3">Created</th>
                        <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-luxe-gold/5 hover:bg-luxe-void/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="text-luxe-ivory font-medium">{lead.name}</div>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-luxe-gold/80 hover:text-luxe-gold"
                            >
                              {lead.phone} ↗
                            </a>
                          </td>
                          <td className="px-4 py-3 text-luxe-ivory/70 text-xs">{lead.service}</td>
                          <td className="px-4 py-3 text-luxe-ivory/70 text-xs hidden md:table-cell">
                            {lead.preferredDate || '—'}
                          </td>
                          <td className="px-4 py-3 text-luxe-ivory/60 text-xs hidden lg:table-cell max-w-[200px] truncate">
                            {lead.message || '—'}
                          </td>
                          <td className="px-4 py-3 text-luxe-mute text-[11px]">
                            {new Date(lead.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={lead.status}
                              onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                              className={`text-[10px] font-accent uppercase tracking-[0.15em] rounded-full px-2.5 py-1 border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[lead.status]}`}
                            >
                              {STATUSES.map((s) => (
                                <option key={s} value={s} className="bg-luxe-aubergine text-luxe-ivory">
                                  {s}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'subscribers' && (
          <div className="glass-luxe rounded-2xl overflow-hidden ring-gold-soft">
            {subs.length === 0 ? (
              <div className="py-16 text-center text-luxe-mute">
                No subscribers yet — the email signup in the footer will populate this list.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-luxe-gold/10 bg-luxe-void/40">
                      <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3">Email</th>
                      <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3 hidden md:table-cell">Name</th>
                      <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3">Source</th>
                      <th className="text-left font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute px-4 py-3">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map((s) => (
                      <tr key={s.id} className="border-b border-luxe-gold/5 hover:bg-luxe-void/30">
                        <td className="px-4 py-3 text-luxe-ivory">{s.email}</td>
                        <td className="px-4 py-3 text-luxe-ivory/70 text-xs hidden md:table-cell">{s.name || '—'}</td>
                        <td className="px-4 py-3 text-luxe-gold/80 text-xs font-accent uppercase tracking-[0.15em]">{s.source}</td>
                        <td className="px-4 py-3 text-luxe-mute text-[11px]">
                          {new Date(s.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub: string;
  small?: boolean;
}) {
  return (
    <div className="glass-luxe rounded-2xl p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-luxe-orchid/30 text-luxe-gold">
          {icon}
        </span>
        <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-mute">
          {label}
        </span>
      </div>
      <div className={`font-display ${small ? 'text-xl md:text-2xl' : 'text-3xl'} text-gradient-gold leading-tight truncate`}>
        {value}
      </div>
      <div className="mt-1 text-[11px] text-luxe-ivory/50">{sub}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-accent uppercase tracking-[0.18em] transition-all ${
        active
          ? 'bg-gradient-to-r from-luxe-orchid to-luxe-plum text-luxe-ivory'
          : 'glass-luxe text-luxe-ivory/60 hover:text-luxe-gold'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
