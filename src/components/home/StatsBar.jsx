import { motion } from 'framer-motion';

const stats = [
  { value: '#1', label: 'Agency in South Florida', color: '#C9A96E' },
  { value: '3x', label: 'Avg. Income Boost Guaranteed', color: '#C9A96E' },
  { value: '2026', label: 'Best Agency Award', color: '#C9A96E' },
  { value: '24/7', label: 'Dedicated Team Support', color: '#C9A96E' },
];

export default function StatsBar() {
  return (
    <section className="py-16 border-y relative overflow-hidden" style={{ background: '#EAE3D8', borderColor: 'rgba(214,195,163,0.5)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)' }} />
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
              <div className="font-serif text-4xl md:text-5xl font-black" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="mt-2 text-sm font-body" style={{ color: 'rgba(43,43,43,0.55)' }}>{stat.label}</p>
              <div className="mx-auto mt-3 h-0.5 w-10 rounded-full group-hover:w-16 transition-all duration-500" style={{ background: stat.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}