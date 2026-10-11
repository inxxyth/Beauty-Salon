'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: 'Layla A.',
    role: 'Bride',
    text: 'My bridal journey with Luxe was the most cared-for I have ever felt. From the skin prep program to the morning-of styling — every photograph of me is the version of me I love. Worth every cent.',
    rating: 5,
  },
  {
    name: 'Priya M.',
    role: 'Regular Guest',
    text: 'I have tried every "luxury" salon in town. Luxe is the only one that actually slows down. My signature facial left me glowing for nine days. Nine. I am now a monthly member.',
    rating: 5,
  },
  {
    name: 'Sara K.',
    role: 'Client',
    text: 'I came in for a manicure and walked out with chrome-petal nails that have been shared a hundred times. The studio feels like a private members club crossed with a magazine set.',
    rating: 5,
  },
  {
    name: 'Aisha R.',
    role: 'Monthly Member',
    text: 'The spa room at Luxe is the only 90 minutes a month that belong to me. Soundproofed, candle-lit, and the head-and-scalp ritual at the end makes me forget I am a person with a phone.',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '-45%']);
  const [idx, setIdx] = useState(0);

  // auto-rotate as fallback for non-scroll users
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} id="voices" className="relative py-24 md:py-36 bg-luxe-void overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-luxe-orchid/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-luxe-gold/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <EyebrowLabel>Quiet Voices</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-luxe-ivory max-w-3xl">
                What they say
                <span className="block italic font-light text-gradient-plum-gold mt-1">when they leave.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-3">
              <button
                aria-label="Previous"
                onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-luxe text-luxe-gold hover:text-luxe-ivory transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next"
                onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-luxe text-luxe-gold hover:text-luxe-ivory transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Featured testimonial — big block */}
        <Reveal delay={0.1}>
          <div className="glass-luxe-strong rounded-3xl p-8 md:p-14 ring-gold-soft shadow-glow-purple relative overflow-hidden">
            <div className="absolute -top-10 -left-6 font-display text-[18rem] leading-none text-luxe-gold/5 select-none pointer-events-none">
              ”
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonials[idx].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-luxe-gold text-luxe-gold" />
                  ))}
                </div>
                <p className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.18] text-luxe-ivory italic font-light">
                  {testimonials[idx].text}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-luxe-orchid to-luxe-plum text-luxe-gold font-display text-lg">
                    {testimonials[idx].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-accent text-sm uppercase tracking-[0.18em] text-luxe-ivory">
                      {testimonials[idx].name}
                    </div>
                    <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute mt-1">
                      {testimonials[idx].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === idx ? 'w-12 bg-luxe-gold' : 'w-5 bg-luxe-ivory/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
