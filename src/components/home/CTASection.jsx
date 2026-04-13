import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Phone, Mail, Instagram } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-foreground relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-6">
              <Crown className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs font-display font-bold uppercase tracking-widest">Join the Elite</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-black text-white leading-tight">
              Ready to{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Transform
              </span>
              <br />Your Career?
            </h2>
            <p className="mt-6 text-white/60 font-body text-lg leading-relaxed">
              Join the elite. Apply now and let our team transform your creator career. We'll follow up within 24–72 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-amber-400 text-white font-display font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all"
              >
                Apply as Creator <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ambassador"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 bg-white/5 text-white font-display font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Become Ambassador
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-white/40 text-xs font-display uppercase tracking-widest mb-4">Get in Touch</p>
              <div className="space-y-4">
                <a href="tel:5618884869" className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-body">(561) 888-4869</span>
                </a>
                <a href="mailto:elitemarketing@proton.me" className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center group-hover:bg-accent/25 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-body">elitemarketing@proton.me</span>
                </a>
                <a href="https://instagram.com/elite_glocreatoragency" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center group-hover:bg-secondary/25 transition-colors">
                    <Instagram className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="font-body">@elite_glocreatoragency</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[{ val: '#1', lbl: 'South Florida' }, { val: '3x', lbl: 'Income Boost' }, { val: '24/7', lbl: 'Support' }].map(s => (
                <div key={s.lbl} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="font-serif text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{s.val}</div>
                  <div className="text-xs text-white/40 font-body mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}