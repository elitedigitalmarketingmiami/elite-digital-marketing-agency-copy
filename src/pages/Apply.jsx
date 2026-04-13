import { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Loader2, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import SectionHeading from '../components/SectionHeading';

export default function Apply() {
  const [form, setForm] = useState({
    full_name: '', age: '', city: '', state: '', email: '', phone: '',
    has_experience: false, explanation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await base44.entities.CreatorApplication.create({
      ...form,
      age: Number(form.age),
      status: 'new'
    });

    await base44.integrations.Core.SendEmail({
      to: 'elitemarketing@proton.me',
      subject: `New Creator Application: ${form.full_name}`,
      body: `
New Creator Application Received!

Name: ${form.full_name}
Age: ${form.age}
Location: ${form.city}, ${form.state}
Email: ${form.email}
Phone: ${form.phone}
Experience: ${form.has_experience ? 'Yes' : 'No'}

Why they want to work with Elite:
${form.explanation}

— Elite Digital Marketing Agency
      `.trim()
    });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Application Received!</h2>
          <p className="text-muted-foreground font-body">
            Thank you for applying, {form.full_name}. Our team will follow up with you within <span className="text-primary font-semibold">24-72 hours</span>. 
            You can also reach us at <a href="tel:5618884869" className="text-primary">(561) 888-4869</a>.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Creator Application"
          title="Join the Elite"
          subtitle="Take the first step to transforming your creator career. Fill out the application below and we'll be in touch."
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-10"
        >
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <Crown className="w-5 h-5 text-primary" />
            <span className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Creator Application</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-body text-sm text-muted-foreground">Full Name *</Label>
              <Input required value={form.full_name} onChange={e => handleChange('full_name', e.target.value)}
                className="mt-1 bg-muted border-border font-body" placeholder="Your full name" />
            </div>
            <div>
              <Label className="font-body text-sm text-muted-foreground">Age *</Label>
              <Input required type="number" min="18" value={form.age} onChange={e => handleChange('age', e.target.value)}
                className="mt-1 bg-muted border-border font-body" placeholder="18+" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-body text-sm text-muted-foreground">City *</Label>
              <Input required value={form.city} onChange={e => handleChange('city', e.target.value)}
                className="mt-1 bg-muted border-border font-body" placeholder="Your city" />
            </div>
            <div>
              <Label className="font-body text-sm text-muted-foreground">State *</Label>
              <Input required value={form.state} onChange={e => handleChange('state', e.target.value)}
                className="mt-1 bg-muted border-border font-body" placeholder="Your state" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-body text-sm text-muted-foreground">Email *</Label>
              <Input required type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                className="mt-1 bg-muted border-border font-body" placeholder="your@email.com" />
            </div>
            <div>
              <Label className="font-body text-sm text-muted-foreground">Phone *</Label>
              <Input required type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)}
                className="mt-1 bg-muted border-border font-body" placeholder="(555) 123-4567" />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Switch checked={form.has_experience} onCheckedChange={v => handleChange('has_experience', v)} />
            <Label className="font-body text-sm text-foreground">I have prior experience on creator platforms</Label>
          </div>

          <div>
            <Label className="font-body text-sm text-muted-foreground">
              Tell us about yourself — do you have experience? Why do you want to work with Elite? *
            </Label>
            <Textarea required value={form.explanation} onChange={e => handleChange('explanation', e.target.value)}
              className="mt-1 bg-muted border-border font-body min-h-[120px]"
              placeholder="Share your story, goals, and what you're looking for..." />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-6 font-display font-bold text-base bg-primary text-primary-foreground">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}
          </Button>

          <p className="text-center text-xs text-muted-foreground font-body">
            We will reach out within 24-72 hours. You must be 18+ to apply.
          </p>
        </motion.form>
      </div>
    </div>
  );
}