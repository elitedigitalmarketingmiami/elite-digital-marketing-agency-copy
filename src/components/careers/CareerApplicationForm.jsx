import { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const positionQuestions = {
  'Coder': [
    { field: 'skills', label: 'Programming Languages & Frameworks', placeholder: 'React, Python, Node.js, etc.' },
    { field: 'portfolio_link', label: 'Portfolio / GitHub Link', placeholder: 'https://github.com/yourprofile', required: false },
    { field: 'experience_years', label: 'Years of Coding Experience', type: 'number', placeholder: '0' },
  ],
  'Generator': [
    { field: 'skills', label: 'AI Tools & Prompt Experience', placeholder: 'MidJourney, Stable Diffusion, DALL-E, etc.' },
    { field: 'experience_years', label: 'Years of Experience with AI Generation', type: 'number', placeholder: '0' },
  ],
  'Social Media Manager': [
    { field: 'skills', label: 'Platforms & Tools You Manage', placeholder: 'Instagram, TikTok, Twitter, scheduling tools, etc.' },
    { field: 'portfolio_link', label: 'Portfolio / Social Profiles', placeholder: 'Links to accounts you\'ve managed', required: false },
    { field: 'experience_years', label: 'Years of Social Media Management', type: 'number', placeholder: '0' },
  ],
  'General Marketing Manager': [
    { field: 'skills', label: 'Key Management & Marketing Skills', placeholder: 'Team leadership, campaign management, analytics, etc.' },
    { field: 'experience_years', label: 'Years of Management Experience', type: 'number', placeholder: '0' },
  ],
  'Content Strategist': [
    { field: 'skills', label: 'Content Strategy Skills & Tools', placeholder: 'Brand strategy, content calendars, analytics, Canva, etc.' },
    { field: 'portfolio_link', label: 'Portfolio / Work Samples', placeholder: 'Links to your content work', required: false },
    { field: 'experience_years', label: 'Years of Content Strategy Experience', type: 'number', placeholder: '0' },
  ],
};

export default function CareerApplicationForm({ position, onBack }) {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', skills: '', portfolio_link: '',
    experience_years: '', why_elite: '', availability: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const questions = positionQuestions[position] || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await base44.entities.CareerApplication.create({
      ...form,
      position,
      experience_years: form.experience_years ? Number(form.experience_years) : 0,
      status: 'new'
    });

    await base44.integrations.Core.SendEmail({
      to: 'elitemarketing@proton.me',
      subject: `New Career Application: ${position} — ${form.full_name}`,
      body: `
New Career Application for: ${position}

Name: ${form.full_name}
Email: ${form.email}
Phone: ${form.phone}
Position: ${position}
Experience: ${form.experience_years || 'N/A'} years
Skills: ${form.skills}
Portfolio: ${form.portfolio_link || 'N/A'}
Availability: ${form.availability}

Why Elite:
${form.why_elite}

— Elite Digital Marketing Agency
      `.trim()
    });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Application Submitted!</h2>
        <p className="text-muted-foreground font-body">
          Thank you for applying for the <span className="text-primary font-semibold">{position}</span> position. 
          We'll review your application and follow up within 24-72 hours at <a href="tel:5618884869" className="text-primary">(561) 888-4869</a>.
        </p>
        <Button onClick={onBack} variant="outline" className="mt-6 font-display">View Other Positions</Button>
      </motion.div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to all positions
      </button>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-10"
      >
        <div className="pb-4 border-b border-border">
          <h3 className="font-display font-bold text-xl text-foreground">Apply for: <span className="text-primary">{position}</span></h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="font-body text-sm text-muted-foreground">Full Name *</Label>
            <Input required value={form.full_name} onChange={e => handleChange('full_name', e.target.value)}
              className="mt-1 bg-muted border-border font-body" placeholder="Your full name" />
          </div>
          <div>
            <Label className="font-body text-sm text-muted-foreground">Email *</Label>
            <Input required type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
              className="mt-1 bg-muted border-border font-body" placeholder="your@email.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="font-body text-sm text-muted-foreground">Phone *</Label>
            <Input required type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)}
              className="mt-1 bg-muted border-border font-body" placeholder="(555) 123-4567" />
          </div>
          <div>
            <Label className="font-body text-sm text-muted-foreground">Availability *</Label>
            <Input required value={form.availability} onChange={e => handleChange('availability', e.target.value)}
              className="mt-1 bg-muted border-border font-body" placeholder="Full-time, Part-time, etc." />
          </div>
        </div>

        {questions.map(q => (
          <div key={q.field}>
            <Label className="font-body text-sm text-muted-foreground">{q.label} {q.required !== false ? '*' : ''}</Label>
            <Input
              required={q.required !== false}
              type={q.type || 'text'}
              value={form[q.field]}
              onChange={e => handleChange(q.field, e.target.value)}
              className="mt-1 bg-muted border-border font-body"
              placeholder={q.placeholder}
            />
          </div>
        ))}

        <div>
          <Label className="font-body text-sm text-muted-foreground">Why do you want to join Elite? *</Label>
          <Textarea required value={form.why_elite} onChange={e => handleChange('why_elite', e.target.value)}
            className="mt-1 bg-muted border-border font-body min-h-[120px]"
            placeholder="Tell us why you'd be a great fit for this role..." />
        </div>

        <Button type="submit" disabled={loading} className="w-full py-6 font-display font-bold text-base bg-primary text-primary-foreground">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}
        </Button>

        <p className="text-center text-xs text-muted-foreground font-body">
          All applications are sent to our team. We'll contact you at (561) 888-4869 or via email.
        </p>
      </motion.form>
    </div>
  );
}