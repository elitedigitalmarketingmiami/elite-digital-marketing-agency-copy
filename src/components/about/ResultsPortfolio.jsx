import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, DollarSign, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const caseStudies = [
  {
    name: 'Ashley M.',
    age: 24,
    tag: 'OnlyFans Creator',
    before: '$800/mo',
    after: '$5,200/mo',
    growth: '+550%',
    timeframe: '30 Days',
    tier: 'Growth Tier',
    story: 'Ashley came to us with a small but dedicated audience and no clear monetization strategy. Within the first 30 days, our persona engineering and PPV campaign framework pushed her monthly revenue from $800 to over $5,200.',
    stats: [
      { icon: DollarSign, label: 'Revenue Growth', value: '+550%' },
      { icon: Users, label: 'New Subscribers', value: '+312' },
      { icon: TrendingUp, label: 'Retention Rate', value: '91%' },
      { icon: Star, label: 'Tier', value: 'Growth' },
    ],
    accentColor: '#74F0ED',
    gradient: 'from-[#74F0ED]/20 to-[#74F0ED]/5',
  },
  {
    name: 'Tyler B.',
    age: 34,
    tag: 'Fansly Creator',
    before: '$2,000/mo',
    after: '$8,400/mo',
    growth: '+320%',
    timeframe: '6 Weeks',
    tier: 'Premium Tier',
    story: 'Tyler had tried two other agencies before finding Elite. Our team rebuilt his entire messaging strategy from the ground up — the result was a 320% income increase in under 6 weeks, now consistently earning $8K+ monthly.',
    stats: [
      { icon: DollarSign, label: 'Revenue Growth', value: '+320%' },
      { icon: Users, label: 'New Subscribers', value: '+480' },
      { icon: TrendingUp, label: 'PPV Conversion', value: '68%' },
      { icon: Star, label: 'Tier', value: 'Premium' },
    ],
    accentColor: '#EA445A',
    gradient: 'from-[#EA445A]/20 to-[#EA445A]/5',
  },
  {
    name: 'Savannah L.',
    age: 20,
    tag: 'New Creator — Zero Experience',
    before: '$0/mo',
    after: '$3,800/mo',
    growth: 'Top 5%',
    timeframe: '60 Days',
    tier: 'Elite Tier',
    story: 'Savannah had never created before. Zero audience, zero content, zero experience. Our Elite tier team handled everything from persona creation to full content generation. Two months later, she was in the top 5% of all creators on her platform.',
    stats: [
      { icon: DollarSign, label: 'Monthly Revenue', value: '$3,800' },
      { icon: Users, label: 'Active Subscribers', value: '290+' },
      { icon: TrendingUp, label: 'Platform Rank', value: 'Top 5%' },
      { icon: Star, label: 'Tier', value: 'Elite' },
    ],
    accentColor: '#74F0ED',
    gradient: 'from-[#74F0ED]/20 to-[#EA445A]/10',
  },
  {
    name: 'Marcus T.',
    age: 29,
    tag: 'Fanvue Creator',
    before: '$1,200/mo',
    after: '$6,100/mo',
    growth: '+408%',
    timeframe: '45 Days',
    tier: 'Premium Tier',
    story: 'Marcus was skeptical — he had been burned before. We gave him full transparency into our process and let results do the talking. A custom emotional connection strategy and subscriber reactivation campaign delivered a 408% income jump.',
    stats: [
      { icon: DollarSign, label: 'Revenue Growth', value: '+408%' },
      { icon: Users, label: 'Reactivated Subs', value: '140+' },
      { icon: TrendingUp, label: 'Retention Rate', value: '87%' },
      { icon: Star, label: 'Tier', value: 'Premium' },
    ],
    accentColor: '#EA445A',
    gradient: 'from-[#EA445A]/20 to-[#74F0ED]/10',
  },
  {
    name: 'Kayla W.',
    age: 28,
    tag: 'OnlyFans Creator',
    before: '$1,800/mo',
    after: '$7,600/mo',
    growth: '+322%',
    timeframe: '30 Days',
    tier: 'Elite Tier',
    story: 'Kayla was posting consistently but her PPV was underperforming. After our team rebuilt her entire campaign structure and introduced daily timed pushes, she saw an immediate revenue surge — tripling in her very first month.',
    stats: [
      { icon: DollarSign, label: 'Revenue Growth', value: '+322%' },
      { icon: Users, label: 'PPV Revenue', value: '$4,200' },
      { icon: TrendingUp, label: 'Open Rate', value: '74%' },
      { icon: Star, label: 'Tier', value: 'Elite' },
    ],
    accentColor: '#74F0ED',
    gradient: 'from-[#74F0ED]/20 to-[#74F0ED]/5',
  },
  {
    name: 'David C.',
    age: 45,
    tag: 'Fansly Creator',
    before: '$600/mo',
    after: '$4,900/mo',
    growth: '+717%',
    timeframe: '60 Days',
    tier: 'Growth Tier',
    story: 'David came to us with doubts about whether this space could work for him. Our team crafted a unique, authentic persona tailored to his voice and audience — and the numbers speak for themselves. 717% growth in 60 days.',
    stats: [
      { icon: DollarSign, label: 'Revenue Growth', value: '+717%' },
      { icon: Users, label: 'Subscriber Count', value: '380+' },
      { icon: TrendingUp, label: 'Avg Spend/Sub', value: '$12.90' },
      { icon: Star, label: 'Tier', value: 'Growth' },
    ],
    accentColor: '#EA445A',
    gradient: 'from-[#EA445A]/20 to-[#EA445A]/5',
  },
];

function Lightbox({ study, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl border overflow-hidden"
        style={{ borderColor: `${study.accentColor}30`, background: '#0a0a0a' }}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10" style={{ background: `linear-gradient(135deg, ${study.accentColor}12, transparent)` }}>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-4"
            style={{ background: `${study.accentColor}18`, color: study.accentColor, border: `1px solid ${study.accentColor}30` }}>
            {study.tag}
          </div>
          <div className="flex items-end gap-6">
            <div>
              <p className="text-white/40 text-sm font-body mb-1">Creator</p>
              <h3 className="font-serif text-3xl font-bold text-white">{study.name}, <span className="text-white/50 text-xl">Age {study.age}</span></h3>
            </div>
            <div className="ml-auto text-right">
              <p className="font-serif text-5xl font-black" style={{ color: study.accentColor }}>{study.growth}</p>
              <p className="text-white/40 text-xs font-body">in {study.timeframe}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 divide-x divide-white/10 border-b border-white/10">
          {study.stats.map(s => (
            <div key={s.label} className="p-5 text-center">
              <s.icon className="w-4 h-4 mx-auto mb-2 opacity-50" style={{ color: study.accentColor }} />
              <p className="font-display font-bold text-white text-sm">{s.value}</p>
              <p className="text-white/30 text-xs font-body mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
          <div className="p-6 text-center">
            <p className="text-white/30 text-xs font-body uppercase tracking-widest mb-2">Before Elite</p>
            <p className="font-serif text-3xl font-bold text-white/50">{study.before}</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-xs font-body uppercase tracking-widest mb-2" style={{ color: study.accentColor }}>After Elite</p>
            <p className="font-serif text-3xl font-bold text-white">{study.after}</p>
          </div>
        </div>

        {/* Story */}
        <div className="p-8">
          <p className="text-white/60 font-body text-sm leading-relaxed">{study.story}</p>
        </div>

        {/* Nav */}
        <div className="flex justify-between items-center px-8 pb-6">
          <button onClick={onPrev} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-body">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button onClick={onNext} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-body">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ResultsPortfolio() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (i) => setActiveIndex(i);
  const closeLightbox = () => setActiveIndex(null);
  const prev = () => setActiveIndex(i => (i - 1 + caseStudies.length) % caseStudies.length);
  const next = () => setActiveIndex(i => (i + 1) % caseStudies.length);

  return (
    <section className="py-24 md:py-36 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(116,240,237,0.05)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(234,68,90,0.05)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Creator Case Studies"
          title={<>Real Numbers. <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #74F0ED, #EA445A)' }}>Real Proof.</span></>}
          subtitle="These are not projections or promises. Every figure below is drawn from the documented performance of real creators under Elite management. Click any card to explore the full case study."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.button
              key={study.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => openLightbox(i)}
              className={`group relative text-left rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-2`}
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0a0a0a' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${study.accentColor}40`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              {/* Gradient top band */}
              <div className={`h-1 w-full`} style={{ background: `linear-gradient(90deg, ${study.accentColor}, transparent)` }} />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-display font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${study.accentColor}15`, color: study.accentColor }}>
                    {study.tier}
                  </span>
                  <span className="text-xs text-white/30 font-body">{study.timeframe}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-0.5">{study.name}</h3>
                <p className="text-xs text-white/40 font-body mb-6">{study.tag}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/30 text-xs font-body">Before</p>
                    <p className="font-display font-semibold text-white/50 text-lg">{study.before}</p>
                  </div>
                  <div className="text-white/20 text-2xl font-light">→</div>
                  <div className="text-right">
                    <p className="text-xs font-body" style={{ color: study.accentColor }}>After</p>
                    <p className="font-display font-bold text-white text-lg">{study.after}</p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="font-serif text-3xl font-black" style={{ color: study.accentColor }}>{study.growth}</span>
                  <span className="text-xs text-white/30 font-body group-hover:text-white/60 transition-colors">View Case Study →</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            study={caseStudies[activeIndex]}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}