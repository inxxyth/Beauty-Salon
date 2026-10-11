'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Compass, HandHeart, Sparkles, Sun } from 'lucide-react';
import SmartImage from './SmartImage';

const steps = [
  {
    icon: Compass,
    no: '01',
    name: 'Consult',
    desc: 'We begin with a quiet conversation — your history, your goals, the way you want to feel. No forms, no rush. Just listening.',
    duration: '15–20 min',
  },
  {
    icon: HandHeart,
    no: '02',
    name: 'Prepare',
    desc: 'A tailored preparation phase — for skin, hair, or hands. We prime the canvas so the ritual lands deeper and lasts longer.',
    duration: '10–15 min',
  },
  {
    icon: Sparkles,
    no: '03',
    name: 'Ritual',
    desc: 'The work itself. Slow, considered, and yours alone — your specialist focused on you, with products chosen in the previous step.',
    duration: '45–120 min',
  },
  {
    icon: Sun,
    no: '04',
    name: 'Reveal',
    desc: 'A final mirror moment, a take-home ritual card, and a quiet minute to settle. We never rush the last look.',
    duration: '5–10 min',
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="process" className="relative py-24 md:py-36 bg-luxe-aubergine overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-luxe-orchid/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — sticky header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <Reveal>
              <EyebrowLabel>The Method</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-luxe-ivory">
                Every ritual,
                <span className="block italic font-light text-gradient-plum-gold mt-1">the same four beats.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 text-base md:text-lg text-luxe-ivory/65 leading-relaxed max-w-md">
                We don't improvise luxury. Each session at Luxe moves through the same four
                movements — so you always know what's next, and you never feel rushed.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <motion.div
                style={{ y: imgY }}
                className="mt-10 aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-luxe-gold/20 shadow-glow-purple"
              >
                <SmartImage
                  src="/luxe/process-tools.png"
                  alt="Luxury beauty tools flat lay"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-full w-full"
                />
              </motion.div>
            </Reveal>
          </div>

          {/* Right — steps */}
          <div className="lg:col-span-7 relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] md:left-[31px] top-8 bottom-8 w-px bg-luxe-gold/15 overflow-hidden">
              <motion.div
                style={{ scaleY: lineScale }}
                className="absolute inset-0 bg-gradient-to-b from-luxe-orchid via-luxe-lavender to-luxe-gold origin-top"
              />
            </div>

            <div className="space-y-10 md:space-y-14">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.no} delay={i * 0.05}>
                    <div className="relative flex gap-6 md:gap-8">
                      {/* Icon circle */}
                      <div className="relative z-10 flex-shrink-0 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-luxe-void ring-1 ring-luxe-gold/30">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-luxe-gold" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 pt-1 md:pt-2">
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="font-display text-2xl md:text-3xl text-gradient-gold">
                            {step.no}
                          </span>
                          <h3 className="font-display text-2xl md:text-3xl text-luxe-ivory">
                            {step.name}
                          </h3>
                          <span className="ml-auto font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-sm md:text-base text-luxe-ivory/65 leading-relaxed max-w-xl">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
