import { motion } from 'framer-motion';
import { Target, Rocket, Eye, Users, Shield, Crown } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const timeline = [
  { year: '2016–2019', title: 'The Beginning', desc: 'Years of trial and error across every platform. Learning what works and what doesn\'t in creator marketing.' },
  { year: '2020–2022', title: 'Perfecting the Craft', desc: 'Developed our personality-driven chatting system and emotional connection strategies that set us apart.' },
  { year: '2023–2024', title: 'Scaling Up', desc: 'Expanded our team with top coders, strategists, and managers. Built systems that deliver consistent results.' },
  { year: '2025–2026', title: 'The Elite Era', desc: 'Named #1 agency in South Florida. Up-and-coming CEO and management team leading the next generation of creator success.' },
];

const values = [
  { icon: Shield, title: 'Integrity First', desc: 'We\'re not here for the money — we\'re here to get you to the top. Period.' },
  { icon: Users, title: 'Personal Touch', desc: '1-on-1 support, a whole team behind you, and a hiring process that ensures top-line service.' },
  { icon: Target, title: 'Results Driven', desc: 'We guarantee 3x your income in the first month. Our track record speaks for itself.' },
  { icon: Eye, title: 'Your Vision, Our Execution', desc: 'We adapt to YOUR personality, YOUR brand, YOUR goals — never a one-size-fits-all approach.' },
];

export default function About() {
  const aboutImg = '/__generating__/img_39e735dbc458.png';

  return (
    <div>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutImg} alt="Elite Digital Office" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Story"
            title={<>Built on <span className="text-primary">Experience</span></>}
            subtitle="5-10 years of trial and error. We've done it all and perfected the perfect marketing strategy to share with the world."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5" />
                      {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                    </div>
                    <div className="pb-8">
                      <span className="text-xs font-display font-semibold text-primary uppercase tracking-wider">{item.year}</span>
                      <h3 className="font-display font-bold text-lg text-foreground mt-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="w-6 h-6 text-primary" />
                  <h3 className="font-display font-bold text-xl text-foreground">The Elite Difference</h3>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  We make small creators become top percentile earners. We're different from other agencies because we're not here for the money — we're here to help you get to the top.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  You get 1-on-1 attention if you need it and a whole team behind you. That's why we have our hiring process — we want to give you the top line of service you deserve.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Based in South Florida with an up-and-coming CEO and management team, plus some of the top coders in the industry. We don't just manage — we transform.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-card border border-border"
                  >
                    <v.icon className="w-5 h-5 text-primary mb-3" />
                    <h4 className="font-display font-semibold text-sm text-foreground mb-1">{v.title}</h4>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}