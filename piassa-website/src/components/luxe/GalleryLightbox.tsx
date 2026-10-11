'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Shot = { src: string; title: string; tag: string; span: 'tall' | 'wide' | 'normal' };

export function useLightbox(shots: Shot[]) {
  const [open, setOpen] = useState<number | null>(null);

  const next = useCallback(() => {
    setOpen((i) => (i === null ? i : (i + 1) % shots.length));
  }, [shots.length]);
  const prev = useCallback(() => {
    setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
  }, [shots.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, next, prev]);

  return { open, setOpen, next, prev };
}

export default function GalleryLightbox({
  shots,
  state,
}: {
  shots: Shot[];
  state: ReturnType<typeof useLightbox>;
}) {
  const { open, setOpen, next, prev } = state;
  const current = open !== null ? shots[open] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-luxe-void/95 backdrop-blur-2xl flex items-center justify-center p-5 md:p-8"
          onClick={() => setOpen(null)}
        >
          {/* Top bar */}
          <div className="absolute top-5 left-5 right-5 md:top-7 md:left-7 md:right-7 flex items-center justify-between z-10">
            <div>
              <div className="font-accent text-[10px] uppercase tracking-[0.28em] text-luxe-gold/80">
                {current.tag}
              </div>
              <div className="mt-1 font-display text-2xl md:text-3xl text-luxe-ivory">
                {current.title}
              </div>
            </div>
            <button
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(null);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-luxe-strong text-luxe-gold hover:text-luxe-ivory transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Prev / Next */}
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full glass-luxe-strong text-luxe-gold hover:text-luxe-ivory transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full glass-luxe-strong text-luxe-gold hover:text-luxe-ivory transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image */}
          <motion.div
            key={open}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[78vh] aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-luxe-gold/30 shadow-glow-purple"
          >
            <img
              src={current.src}
              alt={current.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-accent text-[10px] uppercase tracking-[0.28em] text-luxe-mute">
            {(open ?? 0) + 1} / {shots.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
