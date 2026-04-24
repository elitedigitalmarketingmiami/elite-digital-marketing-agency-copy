import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border rounded-xl px-4 py-3 shadow-lg" style={{ borderColor: 'rgba(201,169,110,0.3)' }}>
      <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-body font-semibold" style={{ color: p.color }}>
          {p.name}: +{p.value}
        </p>
      ))}
    </div>
  );
};

export default function SubscriberChart({ data }) {
  const chartData = data.map(d => ({
    date: format(parseISO(d.date), 'MMM d'),
    'New Subs': d.new_subscribers || 0,
    Lost: d.churn_count || 0,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="bg-white border rounded-2xl p-6" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
      <p className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-1">Subscriber Growth</p>
      <p className="text-xs text-muted-foreground font-body mb-5">Daily new subscribers vs. unsubscribes</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="New Subs" fill="#C9A96E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Lost" fill="rgba(234,68,90,0.5)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}