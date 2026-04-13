import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Crown, Sparkles, Zap, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const tiers = [
  {
    name: 'Growth',
    commission: '20%',
    icon: Zap,
    color: 'from-primary/20 to-primary/5',
    borderColor: 'border-primary/20 hover:border-primary/40',
    features: [
      'Full marketing strategy & execution',
      'Guaranteed 3x your usual income in the first month',
      'Complete conversation & DM management',
      'Personality test & custom persona building',
      'Real, casual conversations — not scripted',
      'Emotional connection building for long-term subs',
      'Daily PPV message pushes',
    ]
  },
  {
    name: 'Premium',
    commission: '30%',
    icon: Crown,
    popular: true,
    color: 'from-secondary/20 to-accent/10',
    borderColor: 'border-secondary/30 hover:border-secondary/50',
    features: [
      'Everything in the 20% tier',
      'Content creation assistance & idea generation',
      'Help generating content when you lack time or ideas',
      'Consistent content flow for steady income',
      'Advanced scheduling & posting strategy',
      'Priority team support',
    ]
  },
  {
    name: 'Elite',
    commission: '40%',
    icon: Sparkles,
    color: 'from-accent/20 to-primary/10',
    borderColor: 'border-accent/30 hover:border-accent/50',
    features: [
      'Everything in 20% and 30% tiers',
      'Weekly 1-on-1 coaching sessions',
      'Direct call access to the CEO',
      'Up to 75% content generation for you',
      'We just need startup images & videos',
      'Custom niche creation based on client demands',
      'Full hands-off management experience',
    ]
  }
];

export default function Services() {
  const servicesImg = 'https://media.base44.com/images/public/69dcf9f1af90480281ca6ada/069426b76_generated_498d01f4.png';

  return (
    <div>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={servicesImg} alt="Elite Services" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Services"
            title={<>Commission-Based <span className="text-primary">Excellence</span></>}
            subtitle="Every tier includes our personality-driven chatting system, emotional connection building, and battle-tested marketing strategies. Pick the level that fits your ambition."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative rounded-2xl bg-gradient-to-b ${tier.color} border ${tier.borderColor} p-6 md:p-8 transition-all duration-500 flex flex-col`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground text-xs font-display font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                    <tier.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground font-body">Tier</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="font-serif text-5xl font-bold text-foreground">{tier.commission}</span>
                  <span className="text-muted-foreground font-body ml-1">commission</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground font-body">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/apply"
                  className="group flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground font-display font-bold text-sm rounded-lg hover:opacity-90 transition-all"
                >
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">
              Not sure which tier is right? Apply and our team will help you pick the best plan for your goals. 
              We're here to help — not to upsell.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}