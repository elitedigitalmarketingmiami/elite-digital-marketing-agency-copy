import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Star, ArrowRight } from 'lucide-react';
import BookingModal from '../components/booking/BookingModal';

const benefits = [
  { icon: Clock, title: '30-Minute Deep Dive', desc: 'A focused, no-fluff strategy session tailored to your creator profile.' },
  { icon: Star, title: 'No Commitment Required', desc: 'This call is about fit — we only work with creators we know we can elevate.' },
  { icon: Phone, title: 'Expert Strategy Team', desc: 'You\'ll speak directly with one of our senior growth architects.' },
];

export default function Book() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('General');

  const openModal = (tier = 'General') => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#111' }}>
      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.08)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E55, transparent)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.25)' }}>
              <Calendar className="w-4 h-4" style={{ color: '#C9A96E' }} />
              <span className="text-xs font-display font-bold uppercase tracking-widest" style={{ color: '#C9A96E' }}>Schedule a Discovery Call</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Let's Talk About{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #C9A96E, #a8845a)' }}>
                Your Growth
              </span>
            </h1>

            <p className="font-body text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Book a complimentary 30-minute discovery call with our senior strategy team. No pitch, no pressure — just honest expert counsel on how to scale your creator career.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal('General')}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-display font-bold text-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#fff', boxShadow: '0 12px 40px rgba(201,169,110,0.3)' }}
            >
              Book Your Free Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 border-t" style={{ borderColor: 'rgba(201,169,110,0.1)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,169,110,0.12)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(201,169,110,0.12)' }}>
                  <b.icon className="w-5 h-5" style={{ color: '#C9A96E' }} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{b.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier CTA */}
      <section className="py-20 border-t" style={{ borderColor: 'rgba(201,169,110,0.1)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-display uppercase tracking-widest mb-3" style={{ color: '#C9A96E' }}>Or book by tier</p>
          <h2 className="font-serif text-3xl font-bold text-white mb-10">Already know which tier fits you?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Growth', 'Premium', 'Elite'].map(tier => (
              <motion.button
                key={tier}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal(tier)}
                className="px-8 py-3.5 rounded-xl font-display font-bold text-sm transition-all"
                style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E' }}
              >
                Book for {tier} Tier
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultTier={selectedTier} />
    </div>
  );
}