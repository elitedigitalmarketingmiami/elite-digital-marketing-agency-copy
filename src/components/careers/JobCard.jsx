import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function JobCard({ icon: Icon, title, description, onClick, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className="w-full text-left p-6 md:p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 shrink-0" />
      </div>
    </motion.button>
  );
}