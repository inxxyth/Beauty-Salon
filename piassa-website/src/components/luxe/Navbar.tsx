'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { NAV_LINKS, whatsappLink, EXT_LINK_ATTRS } from '@/lib/luxe/config';

const WHATSAPP = whatsappLink();

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div
            className={`flex items-center justify-between rounded-full px-4 md:px-7 py-2.5 md:py-3 transition-all duration-500 ${
              scrolled ? 'glass-luxe-strong shadow-glow-purple' : 'bg-transparent'
            }`}
          >
            <a href="#top" className="group flex items-center gap-2" aria-label="Luxe Salon & Spa — Home">
              <span className="font-display text-2xl md:text-[28px] tracking-tight leading-none">
                <span className="text-luxe-ivory">L</span>
                <span className="text-gradient-gold">uxe</span>
              </span>
              <span className="hidden md:inline-block ml-2 h-4 w-px bg-luxe-gold/30" />
              <span className="hidden md:inline font-accent text-[10px] uppercase tracking-[0.3em] text-luxe-mute">
                Salon &amp; Spa
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-accent text-[11px] uppercase tracking-[0.22em] text-luxe-ivory/70 hover:text-luxe-gold transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <MagneticButton
                as="a"
                href={WHATSAPP}
                dataCursor="cta"
                {...EXT_LINK_ATTRS}
                className="group hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-luxe-orchid to-luxe-plum px-5 py-2.5 text-luxe-ivory font-accent text-[11px] uppercase tracking-[0.22em] ring-gold-soft transition-all hover:shadow-glow-gold"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Now
              </MagneticButton>

              {/* Mobile Book Now — compact, always visible */}
              <a
                href={WHATSAPP}
                {...EXT_LINK_ATTRS}
                aria-label="Book on WhatsApp"
                className="md:hidden inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-luxe-orchid to-luxe-plum px-4 py-2 text-luxe-ivory font-accent text-[10px] uppercase tracking-[0.2em] ring-gold-soft"
              >
                <Phone className="w-3 h-3" />
                Book
              </a>

              <button
                aria-label="Open menu"
                aria-expanded={open}
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass-luxe text-luxe-gold"
                onClick={() => setOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              className="absolute inset-0 bg-luxe-void/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-gradient-luxe-soft p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-2xl">
                  <span className="text-luxe-ivory">L</span>
                  <span className="text-gradient-gold">uxe</span>
                </span>
                <button
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full glass-luxe text-luxe-gold"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-2xl text-luxe-ivory hover:text-luxe-gold transition-colors"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
              <a
                href={WHATSAPP}
                {...EXT_LINK_ATTRS}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-luxe-orchid to-luxe-plum px-5 py-4 text-luxe-ivory font-accent text-xs uppercase tracking-[0.22em] ring-gold-soft"
              >
                <Phone className="w-4 h-4" />
                Book on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
