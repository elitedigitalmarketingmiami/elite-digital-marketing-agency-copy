import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { format, subDays, parseISO } from 'date-fns';
import { DollarSign, Users, MessageCircle, TrendingUp, Crown, CalendarDays } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import SubscriberChart from '@/components/dashboard/SubscriberChart';
import TopContentList from '@/components/dashboard/TopContentList';

const RANGES = [
  { label: '7D', days: 7 },
  { label: '14D', days: 14 },
  { label: '30D', days: 30 },
];

export default function CreatorDashboard() {
  const [range, setRange] = useState(30);
  const [user, setUser] = useState(null);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      if (u?.email) {
        base44.entities.CreatorApplication.filter({ email: u.email }).then(results => {
          if (results?.length) setCreator(results[0]);
        });
      }
    }).catch(() => {});
  }, []);

  const { data: allStats = [] } = useQuery({
    queryKey: ['creator-stats', user?.email],
    queryFn: () => base44.entities.CreatorStats.filter({ creator_email: user?.email }, '-date', 90),
    enabled: !!user?.email,
  });

  const cutoff = format(subDays(new Date(), range), 'yyyy-MM-dd');
  const stats = allStats.filter(s => s.date >= cutoff).sort((a, b) => a.date.localeCompare(b.date));

  // Summary metrics
  const totalRevenue = stats.reduce((s, d) => s + (d.daily_revenue || 0), 0);
  const totalSubs = stats.reduce((s, d) => s + (d.new_subscribers || 0), 0);
  const totalMessages = stats.reduce((s, d) => s + (d.messages_sent || 0), 0);
  const latestSubs = stats.length ? (stats[stats.length - 1].total_subscribers || 0) : 0;

  // Trend: compare first half vs second half of range
  const half = Math.floor(stats.length / 2);
  const first = stats.slice(0, half).reduce((s, d) => s + (d.daily_revenue || 0), 0);
  const second = stats.slice(half).reduce((s, d) => s + (d.daily_revenue || 0), 0);
  const revTrend = first > 0 ? ((second - first) / first) * 100 : 0;

  const firstSubs = stats.slice(0, half).reduce((s, d) => s + (d.new_subscribers || 0), 0);
  const secondSubs = stats.slice(half).reduce((s, d) => s + (d.new_subscribers || 0), 0);
  const subTrend = firstSubs > 0 ? ((secondSubs - firstSubs) / firstSubs) * 100 : 0;

  const avgDaily = stats.length ? (totalRevenue / stats.length).toFixed(2) : '0.00';

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: '#F8F5F0' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-3"
                style={{ background: 'rgba(201,169,110,0.12)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.3)' }}>
                <Crown className="w-3 h-3" /> Creator Dashboard
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-black text-foreground">
                {creator ? `Welcome back, ${creator.full_name.split(' ')[0]}` : 'Performance Dashboard'}
              </h1>
              {creator && (
                <p className="text-muted-foreground font-body text-sm mt-1">
                  {creator.status === 'approved' ? '✦ Active Creator' : `Status: ${creator.status}`} · {creator.city}, {creator.state}
                </p>
              )}
            </div>

            {/* Range selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl border bg-white" style={{ borderColor: 'rgba(201,169,110,0.25)' }}>
              <CalendarDays className="w-4 h-4 text-muted-foreground ml-2 mr-1" />
              {RANGES.map(r => (
                <button key={r.days} onClick={() => setRange(r.days)}
                  className="px-4 py-1.5 rounded-lg text-xs font-display font-bold uppercase transition-all"
                  style={{
                    background: range === r.days ? 'linear-gradient(135deg, #C9A96E, #a8845a)' : 'transparent',
                    color: range === r.days ? '#fff' : '#888',
                  }}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* No data state */}
        {stats.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white border rounded-2xl p-10 text-center mb-8"
            style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
            <Crown className="w-10 h-10 mx-auto mb-3" style={{ color: '#C9A96E' }} />
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">No performance data yet</h2>
            <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
              Your Elite team will begin logging your daily performance stats once your account is active. Check back soon!
            </p>
            {isAdmin && (
              <p className="mt-4 text-xs text-muted-foreground font-body">
                Admin: Add stats via the CreatorStats entity in the admin panel.
              </p>
            )}
          </motion.div>
        )}

        {/* Stat Cards */}
        {stats.length > 0 && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                index={0} title="Total Revenue" value={`$${totalRevenue.toFixed(0)}`}
                subtitle={`${revTrend > 0 ? '+' : ''}${revTrend.toFixed(1)}% vs prior period`}
                trend={revTrend} icon={DollarSign}
              />
              <StatCard
                index={1} title="New Subscribers" value={totalSubs.toLocaleString()}
                subtitle={`${subTrend > 0 ? '+' : ''}${subTrend.toFixed(1)}% vs prior period`}
                trend={subTrend} icon={Users}
              />
              <StatCard
                index={2} title="Avg. Daily Revenue" value={`$${avgDaily}`}
                subtitle={`Over the last ${range} days`}
                trend={revTrend} icon={TrendingUp}
              />
              <StatCard
                index={3} title="Total Subscribers" value={latestSubs.toLocaleString()}
                subtitle="Current total" icon={Users}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <RevenueChart data={stats} />
              <SubscriberChart data={stats} />
            </div>

            {/* Top Content */}
            <TopContentList data={stats} />
          </>
        )}
      </div>
    </div>
  );
}