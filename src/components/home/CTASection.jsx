import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-secondary/20 border border-border p-10 md:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Ready to <span className="text-primary">Elevate</span> Your Brand?
            </h2>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto mb-8">
              Join the elite. Apply now and let our team transform your creator career. 
              We'll follow up within 24-72 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold rounded-lg hover:opacity-90 transition-all"
              >
                Apply as Creator <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ambassador"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary/30 text-primary font-display font-semibold rounded-lg hover:bg-primary/10 transition-all"
              >
                Become an Ambassador
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}