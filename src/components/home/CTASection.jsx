import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Phone, Mail, Instagram } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(116,240,237,0.10)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(234,68,90,0.10)' }} />
      {/* Gradient border line at top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #74F0ED, #EA445A, #74F0ED, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ borderColor: 'rgba(116,240,237,0.3)', background: 'rgba(116,240,237,0.08)' }}>
              <Crown className="w-4 h-4" style={{ color: '#74F0ED' }} />
              <span className="text-xs font-display font-bold uppercase tracking-widest" style={{ color: '#74F0ED' }}>Join the Elite</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-black text-white leading-tight">
              Ready to{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #74F0ED, #EA445A)' }}>
                Transform
              </span>
              <br />Your Career?
            </h2>
            <p className="mt-6 text-white/50 font-body text-lg leading-relaxed">
              Join the elite. Apply now and let our team transform your creator career. We'll follow up within 24–72 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-bold rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #74F0ED, #5dd8d5)', color: '#000', boxShadow: '0 8px 30px rgba(116,240,237,0.25)' }}
              >
                Apply as Creator <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ambassador"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border font-display font-semibold text-white rounded-xl transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(234,68,90,0.4)', color: '#EA445A' }}
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
            <div className="p-6 rounded-2xl border" style={{ borderColor: 'rgba(116,240,237,0.15)', background: 'rgba(116,240,237,0.04)' }}>
              <p className="text-white/30 text-xs font-display uppercase tracking-widest mb-4">Get in Touch</p>
              <div className="space-y-4">
                {[
                  { href: 'tel:9548017858', icon: Phone, label: '(954) 801-7858', color: '#74F0ED' },
                  { href: 'mailto:elitemarketing@proton.me', icon: Mail, label: 'elitemarketing@proton.me', color: '#EA445A' },
                  { href: 'https://instagram.com/elite_glocreatoragency', icon: Instagram, label: '@elite_glocreatoragency', color: '#74F0ED', external: true },
                ].map(item => (
                  <a key={item.href} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" style={{ background: `${item.color}15` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="font-body text-sm">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[{ val: '#1', lbl: 'South Florida', c: '#74F0ED' }, { val: '3x', lbl: 'Income Boost', c: '#EA445A' }, { val: '24/7', lbl: 'Support', c: '#74F0ED' }].map(s => (
                <div key={s.lbl} className="p-4 rounded-xl border text-center" style={{ borderColor: `${s.c}20`, background: `${s.c}08` }}>
                  <div className="font-serif text-2xl font-black" style={{ color: s.c }}>{s.val}</div>
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