import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Star } from 'lucide-react';

export default function HeroSection({ heroImg }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Elite Digital Marketing" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-primary font-display text-sm font-semibold uppercase tracking-widest">
              #1 Agency in South Florida — 2026
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-foreground">
            Your Brand.
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Elevated.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-xl">
            Elite Digital Marketing Agency transforms creators into top earners. Specializing in OnlyFans, Fanvue & Fansly management — we handle everything so you can focus on creating.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/apply"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-base rounded-lg hover:opacity-90 transition-all duration-300"
            >
              Apply as Creator
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-display font-semibold text-base rounded-lg hover:bg-muted/50 transition-all duration-300"
            >
              View Services
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 border-2 border-background" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Trusted by 500+ creators worldwide
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}