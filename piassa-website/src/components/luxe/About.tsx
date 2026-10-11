'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import SmartImage from './SmartImage';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <section ref={ref} className="relative py-24 md:py-36 bg-luxe-void overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-luxe-orchid/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-luxe-gold/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — sticky text */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 self-start">
            <Reveal>
              <EyebrowLabel>The Atelier</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-luxe-ivory">
                A sanctuary of
                <span className="block italic font-light text-gradient-plum-gold mt-2">
                  slow beauty.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 text-lg leading-relaxed text-luxe-ivory/70 max-w-xl">
                Luxe Salon & Spa is a modern beauty and wellness studio where time slows down. We treat
                each session as a private ritual — from the warmth of the welcome to the last
                sweep of the brush. No rush, no conveyor. Only craft.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-5 text-base leading-relaxed text-luxe-ivory/55 max-w-xl">
                Our specialists are hand-picked across hair, skin, makeup, nails, bridal, and
                spa — each with their own quiet obsession for detail. We blend clinical-grade
                products with sensorial care, so you leave glowing — and a little more yourself.
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
                <div>
                  <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-luxe-gold/80">
                    Founder's Promise
                  </div>
                  <p className="mt-2 font-display italic text-lg text-luxe-ivory">
                    “You leave as the most you, you've ever been.”
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — parallax image column */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-5 md:gap-7">
            <motion.div
              style={{ y: imgY }}
              className="col-span-1 aspect-[3/4] rounded-[180px_180px_180px_180px/240px_240px_240px_240px] overflow-hidden ring-1 ring-luxe-gold/20 shadow-glow-purple"
            >
              <SmartImage
                src="/luxe/salon-interior.png"
                alt="Luxe Salon & Spa interior"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="h-full w-full"
              />
            </motion.div>
            <motion.div
              style={{ y: imgY2 }}
              className="col-span-1 mt-16 aspect-[3/4] rounded-[180px_180px_180px_180px/240px_240px_240px_240px] overflow-hidden ring-1 ring-luxe-gold/20 shadow-glow-purple"
            >
              <SmartImage
                src="/luxe/products-flatlay.png"
                alt="Luxe beauty products"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="h-full w-full"
              />
            </motion.div>
            <div className="col-span-2 mt-2 grid grid-cols-3 gap-4 md:gap-6">
              <div className="glass-luxe rounded-2xl p-4 md:p-5">
                <div className="font-display text-3xl text-gradient-gold">01</div>
                <div className="font-accent text-[10px] uppercase tracking-[0.2em] text-luxe-mute mt-1">
                  Consult
                </div>
              </div>
              <div className="glass-luxe rounded-2xl p-4 md:p-5">
                <div className="font-display text-3xl text-gradient-gold">02</div>
                <div className="font-accent text-[10px] uppercase tracking-[0.2em] text-luxe-mute mt-1">
                  Ritual
                </div>
              </div>
              <div className="glass-luxe rounded-2xl p-4 md:p-5">
                <div className="font-display text-3xl text-gradient-gold">03</div>
                <div className="font-accent text-[10px] uppercase tracking-[0.2em] text-luxe-mute mt-1">
                  Reveal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
