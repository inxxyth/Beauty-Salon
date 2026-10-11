'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Quote } from 'lucide-react';
import MagneticButton from './MagneticButton';
import SmartImage from './SmartImage';

export default function Signature() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const txtY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.5, 0.85]);

  return (
    <section
      ref={ref}
      id="signature"
      className="relative h-[115vh] bg-luxe-void overflow-hidden"
    >
      {/* Sticky full-bleed image */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <SmartImage
            src="/luxe/bridal-portrait.png"
            alt="The Bridal Suite signature ritual — veiled bride"
            sizes="100vw"
            className="h-full w-full"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOp }}
          className="absolute inset-0 bg-gradient-to-t from-luxe-void via-luxe-void/40 to-luxe-void/80"
        />
        <motion.div
          style={{ opacity: overlayOp }}
          className="absolute inset-0 bg-gradient-to-r from-luxe-void/60 via-transparent to-luxe-void/60"
        />

        {/* Content */}
        <motion.div
          style={{ y: txtY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <Reveal>
            <EyebrowLabel className="justify-center" >
              The Signature Ritual
            </EyebrowLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-7 font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] text-luxe-ivory">
              <span className="block italic font-light">The</span>
              <span className="block text-gradient-plum-gold">Bridal Suite</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-base md:text-lg text-luxe-ivory/75 leading-relaxed">
              A multi-session journey — skin prep program, trial sculpt, and the morning-of
              glow ritual. We arrive on-site with a touch-up squad, so every photograph of you
              is the version of you that you actually love.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <div>
                <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-luxe-gold/80">
                  The Investment
                </div>
                <div className="mt-1 font-display text-3xl text-gradient-gold">
                  from $650
                </div>
              </div>
              <span className="hidden md:block h-12 w-px bg-luxe-gold/20" />
              <div>
                <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-luxe-gold/80">
                  The Journey
                </div>
                <div className="mt-1 font-display text-3xl text-luxe-ivory">
                  90 days · 4 sessions
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <MagneticButton
              as="a"
              href="#booking"
              dataCursor="cta"
              className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-luxe-gold via-luxe-gold-deep to-luxe-gold px-7 py-4 text-luxe-void font-accent text-xs uppercase tracking-[0.22em] transition-all hover:shadow-glow-gold min-h-[52px]"
            >
              <Quote className="w-4 h-4" />
              Begin the Journey
            </MagneticButton>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
