import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function TopContentList({ data }) {
  const topEntries = [...data]
    .filter(d => d.top_content_description && d.daily_revenue)
    .sort((a, b) => (b.daily_revenue || 0) - (a.daily_revenue || 0))
    .slice(0, 5);

  if (!topEntries.length) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white border rounded-2xl p-6" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
        <p className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-4">Top Performing Content</p>
        <p className="text-sm text-muted-foreground font-body text-center py-8">No content data recorded yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="bg-white border rounded-2xl p-6" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
      <p className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-1">Top Performing Content</p>
      <p className="text-xs text-muted-foreground font-body mb-5">Highest revenue days by content</p>
      <div className="space-y-3">
        {topEntries.map((entry, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: i === 0 ? 'rgba(201,169,110,0.07)' : 'rgba(0,0,0,0.02)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: i === 0 ? 'rgba(201,169,110,0.2)' : 'rgba(0,0,0,0.06)' }}>
              {i === 0 ? <Sparkles className="w-3.5 h-3.5" style={{ color: '#C9A96E' }} /> : <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground truncate">{entry.top_content_description}</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                {format(parseISO(entry.date), 'MMM d, yyyy')} · {entry.platform}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display font-bold text-sm" style={{ color: '#C9A96E' }}>${entry.daily_revenue?.toFixed(0)}</p>
              <p className="text-xs text-muted-foreground font-body">revenue</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}