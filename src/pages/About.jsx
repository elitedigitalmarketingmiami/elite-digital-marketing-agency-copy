import { motion } from 'framer-motion';
import { Target, Rocket, Eye, Users, Shield, Crown } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const timeline = [
  { year: '2016–2019', title: 'The Foundation', desc: 'While others were guessing, we were studying. Years of deep immersion across every major creator platform gave us an unmatched understanding of what it truly takes to build a loyal, paying audience from the ground up.' },
  { year: '2020–2022', title: 'Engineering the Edge', desc: 'This era defined our identity. We developed and stress-tested our proprietary personality-driven chatting system — a methodology that creates authentic emotional connections between creators and their subscribers at scale.' },
  { year: '2023–2024', title: 'Building an Empire', desc: 'With a proven system in place, we scaled. We assembled a world-class team of strategists, developers, and creative directors — and built operational infrastructure designed to deliver elite outcomes for every single client.' },
  { year: '2025–2026', title: 'The Apex Era', desc: 'Recognized as the #1 agency in South Florida, we are now leading the industry standard. Our CEO and leadership team represent the next generation of creator management — relentless, visionary, and uncompromising in the pursuit of your success.' },
];

const values = [
  { icon: Shield, title: 'Uncompromising Integrity', desc: 'We are not motivated by commissions alone — we are driven by legacy. Every decision we make is rooted in what\'s best for the creator we serve.' },
  { icon: Users, title: 'Concierge-Level Attention', desc: 'From your dedicated account strategist to direct CEO access, every touchpoint in the Elite experience is crafted for one purpose: your ascent.' },
  { icon: Target, title: 'Outcome-Obsessed Strategy', desc: 'We don\'t chase vanity metrics. We engineer guaranteed, measurable income growth — because results are the only currency that matters.' },
  { icon: Eye, title: 'Your Vision, Perfected', desc: 'We don\'t impose a formula on you. We study your brand, your voice, your audience — and architect a strategy that is unmistakably, powerfully yours.' },
];

export default function About() {
  const aboutImg = 'https://media.base44.com/images/public/69dcf9f1af90480281ca6ada/0cc69edf5_generated_9719f702.png';

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
            title={<>Forged Through <span className="text-primary">Experience</span></>}
            subtitle="What we offer today isn't theory — it's the product of a decade spent studying, failing, iterating, and ultimately mastering the science of creator growth. Every strategy we deploy has been earned through real-world results."
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
                  We have one singular purpose: to take creators who are underperforming their true potential and transform them into top-percentile earners. Not through gimmicks or generic playbooks — but through a deeply personalized, data-driven approach that evolves with your brand.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  You receive the full weight of our team behind you — strategists, chatters, developers, and creatives operating in concert. Every role in our agency exists for one reason: to maximize your income and elevate your brand to where it deserves to be.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Headquartered in South Florida, led by an elite management team and some of the most technically advanced developers in the creator space. We don't just manage creators — we build careers, legacies, and futures.
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