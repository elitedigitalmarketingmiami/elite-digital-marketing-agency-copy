import { motion } from 'framer-motion';
import { Shield, Users, Brain, TrendingUp, MessageCircle, Heart } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const features = [
  { icon: Brain, title: 'Personality-Driven Chatting', desc: 'We build unique personas for each creator through deep profiling — making every conversation feel real and authentic.', gradient: 'from-primary/10 to-amber-50', border: 'hover:border-primary/40', iconBg: 'bg-primary/15', iconColor: 'text-primary' },
  { icon: Heart, title: 'Emotional Connection Building', desc: 'Long-term subscriber retention through genuine bonds — not just quick sales.', gradient: 'from-accent/10 to-pink-50', border: 'hover:border-accent/40', iconBg: 'bg-accent/15', iconColor: 'text-accent' },
  { icon: Users, title: '1-on-1 Support', desc: 'Personal attention from our team and even direct access to our CEO when you need it.', gradient: 'from-secondary/10 to-purple-50', border: 'hover:border-secondary/40', iconBg: 'bg-secondary/15', iconColor: 'text-secondary' },
  { icon: TrendingUp, title: '3x Income Guarantee', desc: 'We guarantee to triple your usual income in the first month. Our strategies are battle-tested.', gradient: 'from-primary/10 to-amber-50', border: 'hover:border-primary/40', iconBg: 'bg-primary/15', iconColor: 'text-primary' },
  { icon: MessageCircle, title: 'Full Message Management', desc: 'From daily PPV pushes to casual DMs, we handle all conversations to maximize your revenue.', gradient: 'from-accent/10 to-pink-50', border: 'hover:border-accent/40', iconBg: 'bg-accent/15', iconColor: 'text-accent' },
  { icon: Shield, title: "We're Not Here for the Money", desc: "We're here to help you reach the top. Your success is our success — that's the Elite difference.", gradient: 'from-secondary/10 to-purple-50', border: 'hover:border-secondary/40', iconBg: 'bg-secondary/15', iconColor: 'text-secondary' },
];

export default function WhyEliteSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50/80 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Elite"
          title={<>What Makes Us <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Different</span></>}
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
              className={`group p-7 md:p-8 rounded-2xl bg-gradient-to-br ${f.gradient} border border-border ${f.border} transition-all duration-500 shadow-sm hover:shadow-md hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
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