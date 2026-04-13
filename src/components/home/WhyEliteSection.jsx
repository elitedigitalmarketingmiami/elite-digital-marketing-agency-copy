import { motion } from 'framer-motion';
import { Shield, Users, Brain, TrendingUp, MessageCircle, Heart } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const features = [
  { icon: Brain, title: 'Personality-Driven Chatting', desc: 'We build unique personalities for each creator through deep profiling — making every conversation feel real and authentic.' },
  { icon: Heart, title: 'Emotional Connection Building', desc: 'Long-term subscriber retention through genuine emotional bonds — not just quick sales.' },
  { icon: Users, title: '1-on-1 Support', desc: 'Personal attention from our team and even direct access to our CEO when you need it.' },
  { icon: TrendingUp, title: '3x Income Guarantee', desc: 'We guarantee to triple your usual income in the first month. Our strategies are battle-tested.' },
  { icon: MessageCircle, title: 'Full Message Management', desc: 'From daily PPV pushes to casual DMs, we handle all conversations to maximize your revenue.' },
  { icon: Shield, title: 'We\'re Not Here for the Money', desc: 'We\'re here to help you reach the top. Your success is our success — that\'s the Elite difference.' },
];

export default function WhyEliteSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Elite"
          title="What Makes Us Different"
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
              className="group p-6 md:p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}