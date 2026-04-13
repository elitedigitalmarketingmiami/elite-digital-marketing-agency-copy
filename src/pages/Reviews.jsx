import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, DollarSign, Heart, Shield } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const reviews = [
  { name: 'Ashley M.', age: 24, stars: 5, text: 'Elite didn\'t just change my income — they changed my life. I went from barely clearing $800 a month to generating over $5,000 in my very first month under their management. The team operates like family. They are genuinely invested in your success in a way that no other agency comes close to replicating.' },
  { name: 'Marcus T.', age: 29, stars: 5, text: 'I had tried other agencies and left disappointed every time. Elite was a revelation. Their personality-driven approach to DM management tripled my subscriber count within weeks, and the coaching sessions completely reframed how I think about my brand. This is the real thing.' },
  { name: 'Destiny R.', age: 22, stars: 5, text: 'I used to be overwhelmed by every aspect of the business. Consistency felt impossible. With Elite, I have an entire professional team managing my messages, my content strategy, my marketing — and I can finally create from a place of joy instead of desperation. The financial relief alone is life-changing.' },
  { name: 'Jordan K.', age: 31, stars: 5, text: 'The emotional connection framework they built around my brand was unlike anything I had experienced before. My subscriber retention went through the roof. People don\'t just subscribe — they stay, they engage, they spend. Elite understands the psychology behind this business at a level that is genuinely impressive.' },
  { name: 'Mia S.', age: 26, stars: 5, text: 'What separates Elite from every other agency I\'ve encountered is that they treat you as a human being with real goals — not as a revenue stream. When I had concerns, the CEO personally took my call. That level of accountability and genuine care is something I had never experienced from a business before.' },
  { name: 'Tyler B.', age: 34, stars: 5, text: 'Two agencies before Elite. Night and day. My monthly revenue went from $2,000 to over $8,000 in six weeks. Their chatting strategy is on an entirely different level — it doesn\'t feel scripted, it feels real. That authenticity is what converts and retains at such an extraordinary rate.' },
  { name: 'Savannah L.', age: 20, stars: 5, text: 'I came in with zero experience, zero audience, and zero confidence. Elite took me from a blank slate to the top 5% of creators in under two months. They manage everything end-to-end — I simply show up, create, and trust the process. The results have been extraordinary.' },
  { name: 'David C.', age: 45, stars: 5, text: 'I was skeptical that this industry could work for someone my age. Elite\'s team built a persona for me that was authentic, compelling, and perfectly calibrated to resonate with my audience. The financial stability I\'ve achieved is something I genuinely never believed was possible for me.' },
  { name: 'Kayla W.', age: 28, stars: 5, text: 'The PPV strategy alone has justified every decision I made to sign with Elite. Daily pushes, deeply personalized conversations, and subscriber relationships that actually endure over time. This is precision marketing applied to the creator economy, and no one executes it better.' },
];

const resources = [
  { icon: TrendingUp, title: 'Documented Income Transformation', desc: 'Our creators experience an average 3x income increase within their first 30 days — a performance benchmark we don\'t just promise, we guarantee in writing. Many go on to reach the top 1% within their first 90 days under Elite management.' },
  { icon: DollarSign, title: 'Engineered Financial Consistency', desc: 'Feast-or-famine income cycles are a thing of the past under Elite management. Our multi-channel revenue strategies create layered, predictable income streams that compound over time — delivering the financial stability your career deserves.' },
  { icon: Heart, title: 'Industry-Leading Subscriber Retention', desc: 'Our emotional architecture methodology drives an 85% higher subscriber retention rate than the industry average. We don\'t build audiences — we cultivate communities of loyal, long-term paying supporters with genuine investment in your brand.' },
  { icon: Shield, title: 'An Unmatched Track Record', desc: 'Hundreds of creators transformed. Recognized as South Florida\'s premier creator management agency in 2026. Our performance record is not a marketing asset — it is the foundation of trust that every relationship at Elite is built upon.' },
];

export default function Reviews() {
  return (
    <div>
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Creator Testimonials"
            title={<>The Results <span className="text-primary">Speak for Themselves.</span></>}
            subtitle="Every review below represents a creator who made the decision to stop settling and start ascending. These are not curated success stories — they are the consistent, expected outcome of partnering with Elite."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-500"
              >
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-display font-semibold text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground font-body">Age {review.age}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Performance Metrics"
            title={<>Why Elite Is the <span className="text-primary">Industry Standard</span></>}
            subtitle="Behind every testimonial is a body of data, systems, and relentless execution that makes these outcomes not the exception — but the rule. Here is what Elite's performance looks like at scale."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 md:p-8 rounded-xl bg-background border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}