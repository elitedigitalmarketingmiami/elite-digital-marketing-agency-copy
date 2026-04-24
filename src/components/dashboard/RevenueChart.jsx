import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border rounded-xl px-4 py-3 shadow-lg" style={{ borderColor: 'rgba(201,169,110,0.3)' }}>
      <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-body font-semibold" style={{ color: p.color }}>
          {p.name}: ${p.value?.toFixed(2)}
        </p>
      ))}
    </div>
  );
};

export default function RevenueChart({ data }) {
  const chartData = data.map(d => ({
    date: format(parseISO(d.date), 'MMM d'),
    Revenue: d.daily_revenue || 0,
    PPV: d.ppv_revenue || 0,
    Tips: d.tips_revenue || 0,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="bg-white border rounded-2xl p-6" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
      <p className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-1">Revenue Trend</p>
      <p className="text-xs text-muted-foreground font-body mb-5">Daily earnings breakdown</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#C9A96E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ppvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a8845a" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#a8845a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="Revenue" stroke="#C9A96E" strokeWidth={2} fill="url(#revGrad)" />
          <Area type="monotone" dataKey="PPV" stroke="#a8845a" strokeWidth={2} fill="url(#ppvGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}