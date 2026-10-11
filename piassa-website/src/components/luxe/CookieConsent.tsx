'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'luxe-consent-v1';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after a short delay so it doesn't interrupt initial scroll
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, dismissed: true, ts: Date.now() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[80] w-[min(94vw,560px)]"
        >
          <div className="glass-luxe-strong rounded-3xl p-5 md:p-6 ring-gold-soft shadow-glow-purple relative">
            <button
              aria-label="Dismiss"
              onClick={dismiss}
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full glass-luxe text-luxe-mute hover:text-luxe-ivory transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3 pr-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-luxe-orchid/30 text-luxe-gold flex-shrink-0">
                <Cookie className="w-4 h-4" />
              </span>
              <div className="flex-1">
                <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-gold/90 mb-1">
                  A Quiet Note on Cookies
                </div>
                <p className="text-xs md:text-sm text-luxe-ivory/70 leading-relaxed">
                  We use essential cookies to keep the booking form working. Optional analytics
                  helps us understand which rituals you love. Read our{' '}
                  <Link href="#" className="text-luxe-gold underline underline-offset-2 hover:text-luxe-ivory transition-colors">
                    privacy notice
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={accept}
                className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-deep px-5 py-3 text-luxe-void font-accent text-[11px] uppercase tracking-[0.22em] hover:shadow-glow-gold transition-all"
              >
                Accept all
              </button>
              <button
                onClick={dismiss}
                className="flex-1 inline-flex items-center justify-center rounded-full glass-luxe px-5 py-3 text-luxe-ivory font-accent text-[11px] uppercase tracking-[0.22em] hover:text-luxe-gold transition-colors"
              >
                Essential only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
