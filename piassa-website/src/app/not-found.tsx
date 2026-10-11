'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] bg-gradient-luxe flex flex-col items-center justify-center px-5 overflow-hidden">
      {/* Atmospheric bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-luxe-orchid/30 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[50vmax] w-[50vmax] rounded-full bg-luxe-gold/15 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="block h-px w-12 bg-gradient-gold-line" />
          <span className="font-accent text-[11px] uppercase tracking-[0.3em] text-luxe-gold/90">
            Lost in the void
          </span>
          <span className="block h-px w-12 bg-gradient-gold-line" />
        </div>

        <h1 className="font-display text-[20vw] md:text-[14vw] leading-[0.92] tracking-tight text-luxe-ivory">
          <span className="block italic font-light">4</span>
          <span className="block text-gradient-plum-gold">0</span>
          <span className="block italic font-light">4</span>
        </h1>

        <p className="mt-8 max-w-md mx-auto text-base md:text-lg text-luxe-ivory/65 leading-relaxed">
          The page you're seeking has drifted into the aubergine. Maybe it never existed —
          or maybe it's still being crafted with the same slow care as our rituals.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-luxe-gold via-luxe-gold-deep to-luxe-gold px-7 py-4 text-luxe-void font-accent text-xs uppercase tracking-[0.22em] transition-all hover:shadow-glow-gold"
          >
            <Home className="w-4 h-4" />
            Return to the atelier
          </Link>
          <Link
            href="/#booking"
            className="group inline-flex items-center gap-3 rounded-full glass-luxe px-7 py-4 text-luxe-ivory font-accent text-xs uppercase tracking-[0.22em] hover:text-luxe-gold transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Book a session
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-luxe-mute">
          <ArrowLeft className="w-3 h-3" />
          <span className="font-accent text-[10px] uppercase tracking-[0.3em]">
            Luxe Salon & Spa
          </span>
        </div>
      </motion.div>
    </main>
  );
}
