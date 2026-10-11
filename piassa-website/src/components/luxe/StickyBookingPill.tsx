'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Phone, X, CalendarHeart } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { SERVICES, whatsappLink, EXT_LINK_ATTRS } from '@/lib/luxe/config';

const WHATSAPP = whatsappLink();

export default function StickyBookingPill() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setProgress(v);
    setVisible(v > 0.05 && v < 0.94);
  });

  // Hide expanded when scrolled away — schedule outside effect body
  useEffect(() => {
    if (visible) return;
    const raf = requestAnimationFrame(() => setExpanded(false));
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[min(94vw,680px)]"
        >
          {/* Top progress bar */}
          <div className="absolute -top-1 left-3 right-3 h-px bg-luxe-ivory/10 overflow-hidden rounded-full">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full bg-gradient-to-r from-luxe-orchid via-luxe-lavender to-luxe-gold origin-left"
            />
          </div>

          <div className="glass-luxe-strong rounded-full p-1.5 md:p-2 shadow-glow-purple ring-gold-soft flex items-center gap-2">
            <a
              href={WHATSAPP}
              data-cursor="cta"
              {...EXT_LINK_ATTRS}
              className="flex-1 flex items-center justify-center gap-2 px-4 md:px-5 py-3 rounded-full bg-gradient-to-r from-luxe-orchid to-luxe-plum text-luxe-ivory font-accent text-[11px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.22em] min-h-[48px]"
            >
              <Phone className="w-3.5 h-3.5" />
              Book on WhatsApp
            </a>
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? 'Close quick booking' : 'Open quick booking'}
              aria-expanded={expanded}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full glass-luxe text-luxe-gold hover:text-luxe-ivory transition-colors"
            >
              {expanded ? <X className="w-4 h-4" /> : <CalendarHeart className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 12, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mt-2"
              >
                <div className="glass-luxe-strong rounded-3xl p-4 md:p-5 ring-gold-soft shadow-glow-purple">
                  <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-luxe-gold mb-2">
                    Quick Reserve
                  </div>
                  <p className="text-xs md:text-sm text-luxe-ivory/70 mb-4">
                    Tap a ritual and we&apos;ll open WhatsApp pre-filled.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map((s) => (
                      <MagneticButton
                        key={s.id}
                        as="a"
                        href={whatsappLink(`Hi Luxe, I'd love to book ${s.name}`)}
                        {...EXT_LINK_ATTRS}
                        className="glass-luxe rounded-full px-3 py-2.5 text-xs text-luxe-ivory/80 hover:text-luxe-gold hover:border-luxe-gold/40 transition-colors font-accent uppercase tracking-[0.18em] min-h-[44px] flex items-center justify-center"
                      >
                        {s.name}
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
