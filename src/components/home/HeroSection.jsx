import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Star, Sparkles } from 'lucide-react';

const ticker = ['OnlyFans Management', 'Fanvue Strategy', 'Fansly Growth', 'Top 1% Creators', 'South Florida\'s Finest', '3x Income — Guaranteed', 'Elite-Level Execution', 'Luxury Creator Management'];

export default function HeroSection({ heroImg }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Elite" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/70" />
      </div>

      <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl animate-glow pointer-events-none" style={{ background: 'rgba(116,240,237,0.12)' }} />
      <div className="absolute bottom-32 left-10 w-72 h-72 rounded-full blur-3xl animate-glow pointer-events-none" style={{ background: 'rgba(234,68,90,0.12)', animationDelay: '1.5s' }} />

      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{ borderColor: 'rgba(116,240,237,0.3)', background: 'rgba(116,240,237,0.08)' }}
          >
            <Crown className="w-4 h-4" style={{ color: '#74F0ED' }} />
            <span className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: '#74F0ED' }}>
              South Florida's #1 Creator Agency — 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight text-white"
          >
            Your Brand.
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #74F0ED, #EA445A)' }}>
              Elevated.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white/60 font-body leading-relaxed max-w-xl"
          >
            Elite Digital Marketing Agency is the premier destination for creators who refuse to settle. We don't just manage — we architect success. Specializing in OnlyFans, Fanvue, and Fansly, our team handles everything while you focus on what you do best.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/apply"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-bold text-base rounded-xl transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #74F0ED, #5dd8d5)', color: '#000000', boxShadow: '0 8px 30px rgba(116,240,237,0.3)' }}
            >
              Apply as Creator
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border font-display font-semibold text-base rounded-xl text-white transition-all duration-300 hover:bg-white/5"
              style={{ borderColor: 'rgba(234,68,90,0.4)' }}
            >
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="flex -space-x-2">
              {['rgba(116,240,237,0.7)', 'rgba(234,68,90,0.7)', 'rgba(116,240,237,0.5)', 'rgba(234,68,90,0.5)', 'rgba(116,240,237,0.9)'].map((bg, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black" style={{ background: bg }} />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#74F0ED' }} />
                ))}
              </div>
              <p className="text-xs text-white/40 font-body mt-0.5">Trusted by top-earning creators worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 py-3" style={{ background: 'linear-gradient(90deg, #74F0ED, #EA445A, #74F0ED)' }}>
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} className="text-black font-display font-bold text-sm uppercase tracking-widest flex items-center gap-3">
              <Sparkles className="w-3 h-3 opacity-70" /> {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}