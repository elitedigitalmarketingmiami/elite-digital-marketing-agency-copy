import { motion } from 'framer-motion';
import { Target, Rocket, Eye, Users, Shield, Crown } from 'lucide-react';
import ResultsPortfolio from '../components/about/ResultsPortfolio';
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

      {/* About Elite — Brand Statement Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-black">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(116,240,237,0.06)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(234,68,90,0.06)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border p-8 md:p-14"
            style={{ borderColor: 'rgba(116,240,237,0.15)', background: 'rgba(116,240,237,0.03)' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 text-xs font-display font-bold uppercase tracking-widest"
              style={{ borderColor: 'rgba(116,240,237,0.3)', background: 'rgba(116,240,237,0.08)', color: '#74F0ED' }}>
              Who We Are
            </div>

            <div className="space-y-6 text-white/70 font-body text-base leading-relaxed">
              <p>
                Elite Digital Marketing Agency is a <span className="text-white font-semibold">commission-based powerhouse founded in 2025</span> — built on extensive research and proven experimentation in the trade for over three years. We've been watching, learning, listening, and running strategy tests until we finally cracked the code.
              </p>
              <p>
                Our mission is simple: <span className="font-semibold" style={{ color: '#74F0ED' }}>guarantee you'll triple your monthly revenue — or we don't consider the work done.</span> With a team dedicated <span className="text-white font-semibold">24/7</span>, we don't chase quick wins — we build momentum that compounds.
              </p>
              <p>
                So what makes Elite ranked <span className="text-white font-semibold">#1 across the board?</span> Most agencies want money in hand before the conversation. Not us. We don't lock you into subscriptions or force you into long-term commitments. <span className="font-semibold" style={{ color: '#74F0ED' }}>We only get paid through commissions based on the service levels we deliver.</span> That's because we're confident in our process — and we hire only the best of the best. No fill-ins. No second-rate talent.
              </p>
              <p>
                We're based in <span className="text-white font-semibold">South Florida</span>, but we welcome applicants from <span className="text-white font-semibold">anywhere in the United States</span> as long as you're <span className="text-white font-semibold">18+</span>. Whether you're an experienced creator with no time or resources to spare — or you're brand new to the industry and starting from scratch — we'll sit with you, guide you, and work patiently until you're on top.
              </p>

              <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-display font-black text-xl" style={{ background: 'linear-gradient(135deg, #74F0ED, #EA445A)', color: '#000' }}>MT</div>
                <div>
                  <p className="text-white font-display font-bold text-lg">Meaghan Taylor</p>
                  <p className="text-sm" style={{ color: '#74F0ED' }}>Owner & CEO — Elite Digital Marketing Agency</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-white/60 italic">
                  "If you want real results, real accountability, and a team that's ready to go 24/7 — <span className="text-white font-semibold not-italic">Elite is ready for you.</span>"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
      <ResultsPortfolio />
    </div>
  );
}