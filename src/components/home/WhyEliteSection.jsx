import { motion } from 'framer-motion';
import { Shield, Users, Brain, TrendingUp, MessageCircle, Heart } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const features = [
  {
    icon: Brain,
    title: 'Precision-Crafted Persona Architecture',
    desc: 'Every creator who joins Elite undergoes a comprehensive personality deep-dive. We engineer a custom persona rooted in authentic psychology — ensuring every interaction your audience has feels genuinely personal, deeply captivating, and impossible to walk away from.',
    accent: '#74F0ED'
  },
  {
    icon: Heart,
    title: 'The Art of Emotional Monetization',
    desc: 'Surface-level agencies chase quick transactions. We build empires. Our proprietary emotional connection methodology cultivates subscriber loyalty that transcends content — transforming casual viewers into devoted, long-term paying fans who keep coming back.',
    accent: '#EA445A'
  },
  {
    icon: Users,
    title: 'Dedicated White-Glove Support',
    desc: 'You are not a number in our system. Every creator receives direct, personalized attention from a dedicated account strategist. When you need escalation, our CEO is personally accessible. This is the standard of care reserved for those who demand excellence.',
    accent: '#74F0ED'
  },
  {
    icon: TrendingUp,
    title: 'A Guaranteed Income Revolution',
    desc: 'Most agencies make promises. We make guarantees backed by a decade of data. We contractually commit to tripling your monthly income within the first 30 days — a bold standard that our flawless track record has allowed us to stand behind, every single time.',
    accent: '#EA445A'
  },
  {
    icon: MessageCircle,
    title: 'Full-Spectrum Revenue Management',
    desc: 'From strategically timed PPV campaigns and high-converting DM flows to subscriber reactivation sequences and upsell frameworks — our team operates as your elite revenue engine, running around the clock so every dollar of earning potential is captured.',
    accent: '#74F0ED'
  },
  {
    icon: Shield,
    title: 'Mission-Driven, Not Commission-Driven',
    desc: 'Our success is unconditionally tied to yours. We do not profit unless you do — and that alignment of incentives drives every decision we make. No shortcuts. No half-measures. Just relentless, strategic execution in pursuit of your ascent to the top.',
    accent: '#EA445A'
  },
];

export default function WhyEliteSection() {
  return (
    <section className="py-24 md:py-40 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(116,240,237,0.05)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(234,68,90,0.05)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Elite Advantage"
          title={<>The Standard Others <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #74F0ED, #EA445A)' }}>Can't Reach</span></>}
          subtitle="We don't compete with other agencies — we operate in a different category entirely. What follows is not a list of features. It's a declaration of the principles that have made us the most trusted creator management agency in South Florida, and the fastest-growing in the country."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-8 md:p-10 rounded-2xl border transition-all duration-500 hover:-translate-y-2 bg-black/60"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${f.accent}40`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ background: `${f.accent}12` }}>
                <f.icon className="w-7 h-7" style={{ color: f.accent }} />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-3 leading-snug">{f.title}</h3>
              <p className="text-sm text-white/50 font-body leading-relaxed">{f.desc}</p>
              <div className="mt-6 h-px w-10 rounded-full group-hover:w-20 transition-all duration-500" style={{ background: f.accent }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}