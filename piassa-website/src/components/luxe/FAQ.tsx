'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Plus } from 'lucide-react';
import { whatsappLink, EXT_LINK_ATTRS } from '@/lib/luxe/config';

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: 'Do I need an appointment, or do you take walk-ins?',
    a: 'Booking ahead is always recommended so we can reserve the right specialist for you, but we happily welcome walk-ins whenever a chair is free. For weekends and evenings, booking is the safer bet.',
  },
  {
    q: 'How early should I book?',
    a: 'For single treatments, 3–5 days notice is usually enough. For bridal and event packages, we recommend 90 days minimum so we can build the proper skin-prep and trial schedule.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Free reschedule up to 24 hours before your appointment. Within 24 hours, a 25% fee applies (waived for first-time clients and members). No-shows are charged at 50% — but we\'ll always try to fit you back in if life happens.',
  },
  {
    q: 'Which products do you use?',
    a: 'We work with professional, cruelty-free product lines. Your specialist will walk you through every formula before it touches your skin or hair, and we can note sensitivities on your client profile.',
  },
  {
    q: 'Can I bring a friend or family member?',
    a: 'For bridal trials and consultation sessions, yes — bring one or two people. For the treatment itself, we keep the room private so you can fully relax. We can also arrange private group sessions on request.',
  },
  {
    q: 'Do you offer on-location services?',
    a: 'For bridal and event packages, yes — we travel to your home or venue. For single treatments, we keep the work at the studio where our equipment and product library live.',
  },
  {
    q: 'How do payments work?',
    a: 'Cash, all major cards, and mobile pay are accepted at the studio. Bridal packages are typically split 30% deposit on booking, 40% at trial, 30% on the day. We never charge hidden fees — your specialist confirms every line item before any work begins.',
  },
  {
    q: 'Do you offer gift cards?',
    a: 'Yes — digital and physical gift cards are available for any amount or package. Just ask at the front desk or send us a message and we\'ll set one up for you.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-36 bg-luxe-aubergine overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-luxe-orchid/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — sticky header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <Reveal>
              <EyebrowLabel>Quiet Questions</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-luxe-ivory">
                Everything you
                <span className="block italic font-light text-gradient-plum-gold mt-1">might wonder.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 text-base text-luxe-ivory/65 leading-relaxed max-w-md">
                Still curious? Ping us on WhatsApp — we'll answer in 15 minutes during studio hours.
                No bots, no forms, just a real person at the other end.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <a
                href={whatsappLink('Hi Luxe, I have a question')}
                data-cursor="cta"
                {...EXT_LINK_ATTRS}
                className="mt-8 inline-flex items-center gap-3 rounded-full glass-luxe-strong px-5 py-3.5 text-luxe-gold font-accent text-xs uppercase tracking-[0.22em] hover:text-luxe-ivory transition-colors ring-gold-soft"
              >
                Ask on WhatsApp
              </a>
            </Reveal>
          </div>

          {/* Right — FAQ accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {faqs.map((qa, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={i} delay={(i % 4) * 0.05}>
                    <div
                      className={`rounded-2xl overflow-hidden transition-all duration-500 ${
                        isOpen
                          ? 'glass-luxe-strong ring-1 ring-luxe-gold/30'
                          : 'glass-luxe ring-1 ring-luxe-gold/10 hover:ring-luxe-gold/25'
                      }`}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center gap-4 px-5 md:px-6 py-5 text-left"
                      >
                        <span className="flex-1 font-display text-lg md:text-xl text-luxe-ivory leading-tight">
                          {qa.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-luxe-orchid/30 text-luxe-gold flex-shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 md:px-6 pb-6 text-sm md:text-base text-luxe-ivory/65 leading-relaxed">
                              {qa.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
