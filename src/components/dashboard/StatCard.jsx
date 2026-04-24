import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, subtitle, trend, icon: Icon, index = 0 }) {
  const trendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const TrendIcon = trendIcon;
  const trendColor = trend > 0 ? '#22c55e' : trend < 0 ? '#EA445A' : '#C9A96E';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white border rounded-2xl p-5 flex flex-col gap-3"
      style={{ borderColor: 'rgba(201,169,110,0.2)' }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-display uppercase tracking-wider text-muted-foreground">{title}</p>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.1)' }}>
            <Icon className="w-4 h-4" style={{ color: '#C9A96E' }} />
          </div>
        )}
      </div>
      <p className="font-serif text-3xl font-black text-foreground">{value}</p>
      <div className="flex items-center gap-1.5">
        {trend !== undefined && (
          <TrendIcon className="w-3.5 h-3.5" style={{ color: trendColor }} />
        )}
        <p className="text-xs font-body text-muted-foreground">{subtitle}</p>
      </div>
    </motion.div>
  );
}