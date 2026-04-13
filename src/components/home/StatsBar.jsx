import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Creators Managed' },
  { value: '3x', label: 'Avg. Income Boost' },
  { value: '#1', label: 'South Florida Agency' },
  { value: '24/7', label: 'Dedicated Support' },
];

export default function StatsBar() {
  return (
    <section className="relative py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="mt-1 text-sm text-muted-foreground font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}