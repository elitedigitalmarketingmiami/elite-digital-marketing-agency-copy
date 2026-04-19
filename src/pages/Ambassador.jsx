import { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Loader2, Share2, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SectionHeading from '../components/SectionHeading';
import { toast } from 'sonner';

export default function Ambassador() {
  const [form, setForm] = useState({
    full_name: '', age: '', current_workplace: '', email: '', phone: '', plan_to_help: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ambassadorCode, setAmbassadorCode] = useState('');

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const existing = await base44.entities.BrandAmbassador.list();
    const signupNumber = (existing?.length || 0) + 1;
    const cleanName = form.full_name.replace(/\s+/g, '').toLowerCase();
    const code = `elite${cleanName}digitalagency${signupNumber}`;

    await base44.entities.BrandAmbassador.create({
      ...form,
      age: Number(form.age),
      ambassador_code: code,
      signup_number: signupNumber,
      status: 'active'
    });

    await base44.integrations.Core.SendEmail({
      to: 'elitemarketing@proton.me',
      from_name: 'Elite Digital Marketing',
      subject: `[NEW AMBASSADOR] ${form.full_name}`,
      body: `
New Brand Ambassador Signup!

Name: ${form.full_name}
Age: ${form.age}
Current Workplace: ${form.current_workplace}
Email: ${form.email}
Phone: ${form.phone}
Ambassador Code: ${code}
Signup #: ${signupNumber}

Plan to Help:
${form.plan_to_help}

— Elite Digital Marketing Agency
      `.trim()
    });

    setAmbassadorCode(code);
    setLoading(false);
    setSubmitted(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(ambassadorCode);
    toast.success('Code copied to clipboard!');
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Welcome to the Inner Circle.</h2>
          <p className="text-muted-foreground font-body mb-6">
            You are now an official Elite Brand Ambassador. Every creator you refer with your code earns you commission — and helps someone else access a life-changing opportunity.
          </p>
          <div className="bg-card border border-border rounded-xl p-6 mb-4">
            <p className="text-xs text-muted-foreground font-body mb-2">Your Exclusive Ambassador Code</p>
            <div className="flex items-center gap-2 justify-center">
              <code className="text-primary font-display font-bold text-lg">{ambassadorCode}</code>
              <button onClick={copyCode} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            Our team will be in touch at <span className="text-primary">(954) 801-7858</span> with your full onboarding details.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Brand Ambassador Program"
          title={<>Earn With <span className="text-primary">Elite</span></>}
          subtitle="Our Ambassador Program is open to anyone with the drive to connect creators with an opportunity that changes lives. Refer a creator, earn commission on their success, and become part of the Elite network."
        />

        <div className="mb-8 p-6 rounded-xl bg-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" /> How the Program Works
          </h3>
          <ol className="space-y-2 text-sm text-muted-foreground font-body">
            <li>1. Complete your Ambassador registration below</li>
            <li>2. Receive your unique referral code immediately upon submission</li>
            <li>3. Share your code with creators who deserve more from their career</li>
            <li>4. Earn commission every time a creator signs with Elite through your referral</li>
          </ol>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-10"
        >
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

          <div>
            <Label className="font-body text-sm text-muted-foreground">Current Workplace *</Label>
            <Input required value={form.current_workplace} onChange={e => handleChange('current_workplace', e.target.value)}
              className="mt-1 bg-muted border-border font-body" placeholder="Where do you currently work?" />
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

          <div>
            <Label className="font-body text-sm text-muted-foreground">How do you intend to represent and grow the Elite brand? *</Label>
            <Textarea required value={form.plan_to_help} onChange={e => handleChange('plan_to_help', e.target.value)}
              className="mt-1 bg-muted border-border font-body min-h-[100px]"
              placeholder="Describe your network, your approach, and how you'll connect creators with Elite..." />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-6 font-display font-bold text-base" style={{ background: '#74F0ED', color: '#000' }}>
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Join the Ambassador Program'}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}