import { Link } from 'react-router-dom';
import { Crown, Instagram, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg text-foreground">
                ELITE <span className="text-primary">DIGITAL</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              South Florida's #1 rated digital marketing agency. Turning creators into top earners since day one.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[{ l: 'Home', p: '/' }, { l: 'Services', p: '/services' }, { l: 'About', p: '/about' }, { l: 'Reviews', p: '/reviews' }].map(i => (
                <Link key={i.p} to={i.p} className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">{i.l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Join Us</h4>
            <div className="space-y-2">
              {[{ l: 'Apply as Creator', p: '/apply' }, { l: 'Brand Ambassador', p: '/ambassador' }, { l: 'Careers', p: '/careers' }].map(i => (
                <Link key={i.p} to={i.p} className="block text-sm text-muted-foreground hover:text-primary transition-colors font-body">{i.l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:5618884869" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Phone className="w-4 h-4" /> (561) 888-4869
              </a>
              <a href="mailto:elitemarketing@proton.me" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Mail className="w-4 h-4" /> elitemarketing@proton.me
              </a>
              <a href="https://instagram.com/elite_glocreatoragency" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                <Instagram className="w-4 h-4" /> @elite_glocreatoragency
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 Elite Digital Marketing Agency. All rights reserved. Based in South Florida.
          </p>
        </div>
      </div>
    </footer>
  );
}