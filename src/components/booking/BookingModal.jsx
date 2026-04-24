import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, Instagram, ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { format, addDays, startOfDay, isBefore, isToday, isSunday, isSaturday } from 'date-fns';

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM',
];

function CalendarPicker({ selectedDate, onSelect }) {
  const [viewDate, setViewDate] = useState(new Date());
  const today = startOfDay(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isDisabled = (date) => {
    if (!date) return true;
    if (isBefore(startOfDay(date), today)) return true;
    if (isSaturday(date) || isSunday(date)) return true;
    return false;
  };

  const isSelected = (date) =>
    date && selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-4 h-4 text-white/60" />
        </button>
        <span className="font-display font-semibold text-white text-sm">
          {format(viewDate, 'MMMM yyyy')}
        </span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronRight className="w-4 h-4 text-white/60" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-xs font-display text-white/30 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => (
          <button
            key={i}
            disabled={isDisabled(date)}
            onClick={() => date && !isDisabled(date) && onSelect(date)}
            className={`
              h-8 w-full rounded-lg text-xs font-body transition-all duration-200
              ${!date ? 'invisible' : ''}
              ${isDisabled(date) ? 'text-white/20 cursor-not-allowed' : 'hover:bg-[#C9A96E]/20 cursor-pointer text-white/70 hover:text-white'}
              ${isSelected(date) ? '!bg-[#C9A96E] !text-black font-bold' : ''}
              ${isToday(date) && !isSelected(date) ? 'ring-1 ring-[#C9A96E]/50' : ''}
            `}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BookingModal({ isOpen, onClose, defaultTier = 'General' }) {
  const [step, setStep] = useState(1); // 1: pick date/time, 2: fill details, 3: success
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', instagram_handle: '', notes: '', service_tier: defaultTier });
  const [submitting, setSubmitting] = useState(false);

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setLoadingSlots(true);
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const existing = await base44.entities.Appointment.filter({ date: dateStr });
      setBookedSlots(existing.map(a => a.time_slot));
    } catch {
      setBookedSlots([]);
    }
    setLoadingSlots(false);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.Appointment.create({
      ...form,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time_slot: selectedTime,
      status: 'pending',
    });
    setSubmitting(false);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: '', email: '', phone: '', instagram_handle: '', notes: '', service_tier: defaultTier });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: '#1a1a1a', border: '1px solid rgba(201,169,110,0.2)' }}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)' }}>
                    <Calendar className="w-3 h-3" style={{ color: '#C9A96E' }} />
                    <span className="text-xs font-display font-bold uppercase tracking-widest" style={{ color: '#C9A96E' }}>
                      Book a Discovery Call
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    {step === 1 && 'Choose Your Date & Time'}
                    {step === 2 && 'Your Details'}
                    {step === 3 && 'You\'re Booked!'}
                  </h2>
                </div>
                <button onClick={handleClose} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>

              {/* Step indicator */}
              {step < 3 && (
                <div className="flex items-center gap-2 mt-4">
                  {[1, 2].map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all ${s <= step ? 'text-black' : 'text-white/30'}`}
                        style={{ background: s <= step ? '#C9A96E' : 'rgba(255,255,255,0.1)' }}>
                        {s < step ? <Check className="w-3 h-3" /> : s}
                      </div>
                      {s < 2 && <div className="w-12 h-px" style={{ background: step > 1 ? '#C9A96E' : 'rgba(255,255,255,0.1)' }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-8 max-h-[65vh] overflow-y-auto">
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-display uppercase tracking-widest text-white/40 mb-4">Select Date</p>
                    <CalendarPicker selectedDate={selectedDate} onSelect={handleDateSelect} />
                  </div>

                  <div>
                    <p className="text-xs font-display uppercase tracking-widest text-white/40 mb-4">
                      {selectedDate ? `Available on ${format(selectedDate, 'MMM d')}` : 'Select a date first'}
                    </p>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-5 h-5 animate-spin text-[#C9A96E]" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map(slot => {
                          const booked = bookedSlots.includes(slot);
                          const selected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              disabled={!selectedDate || booked}
                              onClick={() => setSelectedTime(slot)}
                              className={`
                                px-3 py-2.5 rounded-xl text-xs font-display font-semibold transition-all duration-200
                                ${booked ? 'opacity-30 cursor-not-allowed line-through' : ''}
                                ${selected ? 'text-black' : 'text-white/60 hover:text-white'}
                                ${!selectedDate && !booked ? 'opacity-30 cursor-not-allowed' : ''}
                              `}
                              style={{
                                background: selected ? '#C9A96E' : 'rgba(255,255,255,0.06)',
                                border: `1px solid ${selected ? '#C9A96E' : 'rgba(255,255,255,0.1)'}`,
                              }}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }}>
                    <Calendar className="w-4 h-4 shrink-0" style={{ color: '#C9A96E' }} />
                    <span className="font-body text-sm text-white/70">
                      <strong className="text-white">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</strong> at <strong className="text-white">{selectedTime}</strong>
                    </span>
                  </div>

                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'Jane Doe', icon: User, required: true, type: 'text' },
                    { key: 'email', label: 'Email Address', placeholder: 'jane@example.com', icon: Mail, required: true, type: 'email' },
                    { key: 'phone', label: 'Phone Number', placeholder: '(555) 000-0000', icon: Phone, required: false, type: 'tel' },
                    { key: 'instagram_handle', label: 'Instagram Handle', placeholder: '@yourusername', icon: Instagram, required: false, type: 'text' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-display font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                        {field.label} {field.required && <span style={{ color: '#C9A96E' }}>*</span>}
                      </label>
                      <div className="relative">
                        <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={form[field.key]}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-body text-white placeholder-white/20 outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                          onFocus={e => e.target.style.borderColor = '#C9A96E'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-display font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                      Interested Tier
                    </label>
                    <select
                      value={form.service_tier}
                      onChange={e => setForm(f => ({ ...f, service_tier: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body text-white outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {['General', 'Growth', 'Premium', 'Elite'].map(t => (
                        <option key={t} value={t} style={{ background: '#1a1a1a' }}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-display font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                      Anything we should know?
                    </label>
                    <textarea
                      placeholder="Tell us about your goals, current platform, audience size..."
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body text-white placeholder-white/20 outline-none transition-all resize-none"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </form>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.4)' }}
                  >
                    <Check className="w-10 h-10" style={{ color: '#C9A96E' }} />
                  </motion.div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">Booking Confirmed!</h3>
                  <p className="font-body text-white/50 text-sm max-w-sm mx-auto mb-2">
                    Your discovery call is scheduled for
                  </p>
                  <p className="font-display font-bold text-white mb-1">
                    {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="font-display font-bold mb-6" style={{ color: '#C9A96E' }}>{selectedTime}</p>
                  <p className="font-body text-white/40 text-sm">
                    Our team will reach out to {form.email} within 24 hours to confirm your session.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {step < 3 && (
              <div className="px-8 pb-8 flex items-center justify-between gap-4">
                {step === 2 ? (
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-display font-semibold text-white/50 hover:text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step === 1 && (
                  <button
                    onClick={handleNext}
                    disabled={!selectedDate || !selectedTime}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-display font-bold transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#fff' }}
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="submit"
                    form="booking-form"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-display font-bold transition-all hover:scale-105 disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#fff' }}
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    {submitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="px-8 pb-8 text-center">
                <button onClick={handleClose} className="px-8 py-3 rounded-xl text-sm font-display font-bold text-white transition-all hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}