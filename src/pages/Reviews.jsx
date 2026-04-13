import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, DollarSign, Heart, Shield } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const reviews = [
  { name: 'Ashley M.', age: 24, gender: 'F', stars: 5, text: 'Elite completely changed my life. I went from making $800/month to over $5,000 in my first month with them. The team feels like family — they actually care about my success, not just their cut.' },
  { name: 'Marcus T.', age: 29, gender: 'M', stars: 5, text: 'I was skeptical about agencies, but Elite proved me wrong. Their personality-driven approach to my DMs tripled my subscriber count. The 1-on-1 sessions are invaluable.' },
  { name: 'Destiny R.', age: 22, gender: 'F', stars: 5, text: 'Before Elite, I was struggling to stay consistent. Now I have a whole team handling my messages, content strategy, and marketing. I can finally breathe financially.' },
  { name: 'Jordan K.', age: 31, gender: 'M', stars: 5, text: 'The emotional connection strategy they built for my brand was a game changer. My retention rate went through the roof. These guys know what they\'re doing.' },
  { name: 'Mia S.', age: 26, gender: 'F', stars: 5, text: 'What makes Elite different is they treat you like a person, not a number. The CEO personally got on a call with me when I had concerns. That level of care is unmatched.' },
  { name: 'Tyler B.', age: 34, gender: 'M', stars: 5, text: 'I tried two other agencies before Elite. Night and day difference. My income went from $2K to $8K in 6 weeks. Their chatting strategy is on another level.' },
  { name: 'Savannah L.', age: 20, gender: 'F', stars: 5, text: 'I was brand new to the platform with zero experience. Elite took me from nothing to top 5% in two months. They handle everything — I just show up and create.' },
  { name: 'David C.', age: 45, gender: 'M', stars: 5, text: 'At my age, I wasn\'t sure this would work. Elite\'s team built a unique persona for me that resonated perfectly. Best decision I\'ve made. Financial stability I never thought possible.' },
  { name: 'Kayla W.', age: 28, gender: 'F', stars: 5, text: 'The PPV strategy alone has been worth it. Daily pushes, engaging conversations, long-term subscribers who actually stick around. Elite is the real deal.' },
];

const resources = [
  { icon: TrendingUp, title: 'Income Growth Reports', desc: 'Our creators see an average of 3x income increase in their first month. Many reach top 1% within 90 days.' },
  { icon: DollarSign, title: 'Financial Stability', desc: 'Consistent, reliable income streams. No more feast-or-famine months. Our strategies create steady growth.' },
  { icon: Heart, title: 'Subscriber Retention', desc: 'Our emotional connection approach leads to 85% higher retention than industry average. Real relationships, real results.' },
  { icon: Shield, title: 'Proven Track Record', desc: '500+ creators managed, #1 agency in South Florida 2026. Our results speak louder than any pitch.' },
];

export default function Reviews() {
  return (
    <div>
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Success Stories"
            title={<>Real People. <span className="text-primary">Real Results.</span></>}
            subtitle="Don't take our word for it — hear from the creators who've transformed their lives with Elite Digital Marketing."
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
            badge="Resources"
            title={<>Why Creators <span className="text-primary">Trust Us</span></>}
            subtitle="The numbers don't lie. Here's how Elite Digital Marketing delivers real, measurable results."
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