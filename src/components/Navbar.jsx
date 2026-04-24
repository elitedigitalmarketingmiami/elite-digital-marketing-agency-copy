import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Careers', path: '/careers' },
  { label: 'Ambassador', path: '/ambassador' },
  { label: 'Join Us', path: '/join' },
  { label: 'My Dashboard', path: '/dashboard' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border" style={{ background: 'rgba(248,245,240,0.95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              ELITE <span className="text-primary">DIGITAL</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="ml-2 px-4 py-2.5 font-display font-semibold text-sm rounded-lg border transition-all duration-300 flex items-center gap-1.5"
              style={{ borderColor: 'rgba(201,169,110,0.5)', color: '#C9A96E' }}
            >
              <Calendar className="w-3.5 h-3.5" /> Book a Call
            </Link>
            <Link
              to="/apply"
              className="ml-2 px-6 py-2.5 font-display font-semibold text-sm rounded-lg hover:opacity-90 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#FFFFFF' }}
            >
              Apply Now
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-body font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="block text-center mt-2 px-6 py-3 font-display font-semibold text-sm rounded-lg border flex items-center justify-center gap-2"
                style={{ borderColor: 'rgba(201,169,110,0.4)', color: '#C9A96E' }}
              >
                <Calendar className="w-4 h-4" /> Book a Discovery Call
              </Link>
              <Link
                to="/apply"
                onClick={() => setOpen(false)}
                className="block text-center mt-2 px-6 py-3 font-display font-semibold text-sm rounded-lg"
              style={{ background: 'linear-gradient(135deg, #C9A96E, #a8845a)', color: '#FFFFFF' }}
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}