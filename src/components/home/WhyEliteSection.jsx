import { motion } from 'framer-motion';
import { Shield, Users, Brain, TrendingUp, MessageCircle, Heart } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const features = [
  { icon: Brain, title: 'Personality-Driven Chatting', desc: 'We build unique personas for each creator through deep profiling — making every conversation feel real and authentic.', accent: '#74F0ED' },
  { icon: Heart, title: 'Emotional Connection Building', desc: 'Long-term subscriber retention through genuine bonds — not just quick sales.', accent: '#EA445A' },
  { icon: Users, title: '1-on-1 Support', desc: 'Personal attention from our team and even direct access to our CEO when you need it.', accent: '#74F0ED' },
  { icon: TrendingUp, title: '3x Income Guarantee', desc: 'We guarantee to triple your usual income in the first month. Our strategies are battle-tested.', accent: '#EA445A' },
  { icon: MessageCircle, title: 'Full Message Management', desc: 'From daily PPV pushes to casual DMs, we handle all conversations to maximize your revenue.', accent: '#74F0ED' },
  { icon: Shield, title: "We're Not Here for the Money", desc: "We're here to help you reach the top. Your success is our success — that's the Elite difference.", accent: '#EA445A' },
];

export default function WhyEliteSection() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(116,240,237,0.06)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(234,68,90,0.06)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Elite"
          title={<>What Makes Us <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #74F0ED, #EA445A)' }}>Different</span></>}
          subtitle="5-10 years of trial and error. We've done it all and perfected the strategy to turn small creators into top percentile earners."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-7 md:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg bg-black/60"
              style={{ borderColor: 'rgba(255,255,255,0.08)', '--hover-shadow': `0 20px 40px ${f.accent}20` }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${f.accent}40`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: `${f.accent}15` }}>
                <f.icon className="w-6 h-6" style={{ color: f.accent }} />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 font-body leading-relaxed">{f.desc}</p>
              <div className="mt-4 h-0.5 w-8 rounded-full group-hover:w-16 transition-all duration-500" style={{ background: f.accent }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}