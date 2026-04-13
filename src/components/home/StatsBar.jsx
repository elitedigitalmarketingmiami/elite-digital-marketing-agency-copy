import { motion } from 'framer-motion';

const stats = [
  { value: '#1', label: 'Agency in South Florida', color: 'from-primary to-amber-400' },
  { value: '3x', label: 'Avg. Income Boost Guaranteed', color: 'from-secondary to-purple-400' },
  { value: '2026', label: 'Best Agency Award', color: 'from-accent to-pink-400' },
  { value: '24/7', label: 'Dedicated Team Support', color: 'from-primary to-accent' },
];

export default function StatsBar() {
  return (
    <section className="py-16 bg-white border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className={`inline-block font-serif text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-sm`}>
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-muted-foreground font-body">{stat.label}</p>
              <div className={`mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r ${stat.color} opacity-60 group-hover:w-20 transition-all duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}