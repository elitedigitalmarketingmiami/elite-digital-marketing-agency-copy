import { motion } from 'framer-motion';

export default function SectionHeading({ badge, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/15 to-accent/10 text-primary text-xs font-display font-bold uppercase tracking-widest rounded-full mb-4 border border-primary/20">
          {badge}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}