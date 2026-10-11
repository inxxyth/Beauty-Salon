'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';
import SmartImage from './SmartImage';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax and zoom on the hero image
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mouse parallax for the floating image
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(((e.clientX - cx) / cx) * 16);
      my.set(((e.clientY - cy) / cy) * 16);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-luxe"
    >
      {/* Background atmospheric layer */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute -top-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-luxe-orchid/30 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[50vmax] w-[50vmax] rounded-full bg-luxe-gold/15 blur-[120px]" />
      </motion.div>

      {/* Hero portrait with parallax */}
      <motion.div
        style={{
          y: imgY,
          scale: imgScale,
          x: sx,
          translateY: sy,
        }}
        className="absolute right-[3%] top-1/2 -translate-y-1/2 h-[78svh] w-[38vw] hidden md:block"
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-[260px_260px_260px_260px/300px_300px_300px_300px] overflow-hidden ring-1 ring-luxe-gold/30 shadow-glow-purple">
            <SmartImage
              src="/luxe/hero-portrait.png"
              alt="Luxe beauty ritual — luxury serum drop on silk"
              priority
              fetchPriority="high"
              sizes="42vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxe-void/80 via-transparent to-luxe-void/30" />
          </div>
          {/* Floating gold orbital */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 pointer-events-none"
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-luxe-gold shadow-glow-gold" />
            <span className="absolute left-1/2 bottom-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-luxe-lavender" />
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile image */}
      <div className="md:hidden absolute inset-0">
        <SmartImage
          src="/luxe/hero-portrait.png"
          alt="Luxe beauty ritual — luxury serum drop on silk"
          priority
          fetchPriority="high"
          sizes="100vw"
          className="h-full w-full opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-void via-luxe-void/70 to-luxe-void/40" />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 min-h-[100svh] flex flex-col justify-center pt-24 md:pt-28 pb-16 md:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-7"
        >
          <span className="block h-px w-12 bg-gradient-gold-line" />
          <span className="font-accent text-[11px] uppercase tracking-[0.32em] text-luxe-gold/90">
            Beauty Atelier & Spa
          </span>
        </motion.div>

        <div className="max-w-2xl">
          <h1 className="font-display text-[13vw] sm:text-[11vw] md:text-[8.2vw] lg:text-[7.2vw] leading-[0.92] tracking-tight text-luxe-ivory">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block italic font-light"
            >
              Where
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <span className="text-gradient-plum-gold">beauty</span>{' '}
              <span className="font-light italic text-luxe-lavender">becomes</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              ritual.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 max-w-md md:max-w-xl text-sm md:text-lg text-luxe-ivory/70 leading-relaxed font-body"
          >
            Where beauty becomes ritual — hair, skin, makeup, nails & bridal
            treatments crafted with obsessive precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <MagneticButton
              as="a"
              href="#booking"
              dataCursor="cta"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-luxe-gold via-luxe-gold-deep to-luxe-gold px-7 py-4 text-luxe-void font-accent text-xs sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] transition-all hover:shadow-glow-gold min-h-[52px]"
            >
              <Sparkles className="w-4 h-4" />
              Reserve a Session
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#services"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full glass-luxe px-7 py-4 text-luxe-ivory font-accent text-xs sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] hover:text-luxe-gold transition-colors min-h-[52px]"
            >
              Explore Services
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-10 md:mt-14 flex items-center gap-6 md:gap-8"
          >
            <div>
              <div className="font-display text-4xl text-luxe-gold leading-none">12+</div>
              <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute mt-1">
                Years of Ritual
              </div>
            </div>
            <span className="h-10 w-px bg-luxe-gold/20" />
            <div>
              <div className="font-display text-4xl text-luxe-gold leading-none">8K+</div>
              <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute mt-1">
                Happy Clients
              </div>
            </div>
            <span className="h-10 w-px bg-luxe-gold/20" />
            <div>
              <div className="font-display text-4xl text-luxe-gold leading-none">5.0</div>
              <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute mt-1">
                ★ Rating
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-accent text-[10px] uppercase tracking-[0.3em] text-luxe-mute">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-luxe-gold to-transparent">
          <motion.span
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-2 w-px bg-luxe-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
