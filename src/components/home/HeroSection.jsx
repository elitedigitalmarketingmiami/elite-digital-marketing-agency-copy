import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Star, Sparkles } from 'lucide-react';

const ticker = ['OnlyFans Management', 'Fanvue Strategy', 'Fansly Growth', 'Top 1% Creators', 'South Florida\'s Finest', '3x Income — Guaranteed', 'Elite-Level Execution', 'Luxury Creator Management'];

export default function HeroSection({ heroImg }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden" style={{ background: '#F8F5F0' }}>
      <div className="absolute inset-0">
        <img src={heroImg} alt="Elite" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(248,245,240,0.97) 50%, rgba(214,195,163,0.15) 100%)' }} />
      </div>

      <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl animate-glow pointer-events-none" style={{ background: 'rgba(214,195,163,0.18)' }} />
      <div className="absolute bottom-32 left-10 w-72 h-72 rounded-full blur-3xl animate-glow pointer-events-none" style={{ background: 'rgba(214,195,163,0.12)', animationDelay: '1.5s' }} />

      <div className="bg-transparent mx-auto px-4 py-20 relative flex-1 flex items-center max-w-7xl sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{ borderColor: 'rgba(214,195,163,0.5)', background: 'rgba(214,195,163,0.15)' }}>
            
            <Crown className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: '#C9A96E' }}>
              South Florida's #1 Creator Agency — 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight" style={{ color: '#2B2B2B' }}>
            
            Your Brand.
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>
              Elevated.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl font-body leading-relaxed max-w-xl" style={{ color: 'rgba(43,43,43,0.6)' }}>
            
            Elite Digital Marketing Agency is the premier destination for creators who refuse to settle. We don't just manage — we architect success. Specializing in OnlyFans, Fanvue, and Fansly, our team handles everything while you focus on what you do best.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4">
            
            <Link
              to="/apply"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-bold text-base rounded-xl transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#FFFFFF', boxShadow: '0 8px 30px rgba(201,169,110,0.3)' }}>
              
              Apply as Creator
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border font-display font-semibold text-base rounded-xl transition-all duration-300"
              style={{ borderColor: 'rgba(43,43,43,0.25)', color: '#2B2B2B' }}>
              
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex items-center gap-6">
            
            <div className="flex -space-x-2">
              {['rgba(201,169,110,0.7)', 'rgba(168,132,90,0.7)', 'rgba(201,169,110,0.5)', 'rgba(168,132,90,0.5)', 'rgba(201,169,110,0.9)'].map((bg, i) =>
              <div key={i} className="w-10 h-10 rounded-full border-2" style={{ background: bg, borderColor: '#F8F5F0' }} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) =>
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#C9A96E' }} />
                )}
              </div>
              <p className="text-xs font-body mt-0.5" style={{ color: 'rgba(43,43,43,0.4)' }}>Trusted by top-earning creators worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t py-3" style={{ background: 'linear-gradient(90deg, #C9A96E, #a8845a, #C9A96E)', borderColor: 'rgba(214,195,163,0.4)' }}>
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap">
          
          {[...ticker, ...ticker, ...ticker].map((item, i) =>
          <span key={i} className="text-black font-display font-bold text-sm uppercase tracking-widest flex items-center gap-3">
              <Sparkles className="w-3 h-3 opacity-70" /> {item}
            </span>
          )}
        </motion.div>
      </div>
    </section>);

}