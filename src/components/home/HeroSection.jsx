import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Star, Sparkles } from 'lucide-react';

const ticker = ['OnlyFans', 'Fanvue', 'Fansly', 'Creator Management', 'Top 1%', 'South Florida\'s Best', '3x Income Guaranteed', 'Elite Results'];

export default function HeroSection({ heroImg }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden bg-foreground">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Elite" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/90 to-secondary/60" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-primary/30 blur-3xl animate-glow pointer-events-none" />
      <div className="absolute bottom-32 left-10 w-60 h-60 rounded-full bg-accent/25 blur-3xl animate-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-8"
          >
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-primary font-display text-xs font-bold uppercase tracking-widest">
              #1 Agency in South Florida — 2026
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
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Elevated.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white/70 font-body leading-relaxed max-w-xl"
          >
            Elite Digital Marketing Agency transforms creators into top earners. Specializing in OnlyFans, Fanvue & Fansly management — we handle everything so you can focus on creating.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/apply"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-amber-400 text-white font-display font-bold text-base rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
            >
              Apply as Creator
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 bg-white/10 backdrop-blur-sm text-white font-display font-semibold text-base rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              View Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="flex -space-x-2">
              {['bg-gradient-to-br from-primary to-amber-300', 'bg-gradient-to-br from-secondary to-purple-400', 'bg-gradient-to-br from-accent to-pink-400', 'bg-gradient-to-br from-primary to-secondary', 'bg-gradient-to-br from-accent to-primary'].map((g, i) => (
                <div key={i} className={`w-10 h-10 rounded-full ${g} border-2 border-foreground/50`} />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs text-white/50 font-body mt-0.5">Trusted by creators worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ticker strip */}
      <div className="relative overflow-hidden border-t border-white/10 bg-gradient-to-r from-primary via-accent to-secondary py-3">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} className="text-white font-display font-bold text-sm uppercase tracking-widest flex items-center gap-3">
              <Sparkles className="w-3 h-3 opacity-70" /> {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}