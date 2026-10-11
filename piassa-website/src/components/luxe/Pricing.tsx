'use client';

import { motion } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Check, Crown, Sparkles, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  icon: any;
  cta: string;
};

const tiers: Tier[] = [
  {
    id: 'single',
    name: 'Single Visit',
    tagline: 'Try the studio',
    price: '$65+',
    period: 'per service',
    icon: Sparkles,
    features: [
      'Single treatment of your choice',
      '15-min consult included',
      'Take-home ritual card',
      'Standard scheduling',
    ],
    cta: 'Book a treatment',
  },
  {
    id: 'member',
    name: 'The Glow Club',
    tagline: 'For the regulars',
    price: '$250',
    period: 'per month',
    highlight: true,
    icon: Crown,
    features: [
      '3 treatments per month (any mix)',
      'Priority booking',
      '10% off all add-ons',
      'Quarterly skincare consult',
      'Birthday gift & member-only events',
      'Same-day reschedule flexibility',
    ],
    cta: 'Become a member',
  },
  {
    id: 'bridal',
    name: 'Bridal & Events',
    tagline: 'The signature package',
    price: '$650+',
    period: 'multi-session',
    icon: Crown,
    features: [
      '90-day skin prep program',
      'Trial styling + look development',
      'Day-of styling (studio or on-site)',
      'On-site touch-up support (4 hrs)',
      'Bridal party add-on available',
      'Custom fragrance layering',
    ],
    cta: 'Plan the day',
  },
];

export default function Pricing() {
  return (
    <section id="packages" className="relative py-24 md:py-36 bg-luxe-void overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-luxe-orchid/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-luxe-gold/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="text-center mb-14">
          <Reveal>
            <EyebrowLabel className="justify-center">Investments</EyebrowLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-luxe-ivory">
              Choose your
              <span className="block italic font-light text-gradient-plum-gold mt-1">way in.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl mx-auto text-base text-luxe-ivory/55 leading-relaxed">
              Three doors into the atelier. No hidden fees, no surprise line items.
              Every price below is a starting point — your specialist confirms before any work begins.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.id} delay={(i % 3) * 0.1}>
                <div
                  className={`group relative h-full rounded-3xl p-6 md:p-8 transition-all duration-500 hover-lift flex flex-col ${
                    t.highlight
                      ? 'bg-gradient-to-br from-luxe-orchid/40 via-luxe-plum/30 to-luxe-aubergine ring-1 ring-luxe-gold/40 shadow-glow-purple'
                      : 'glass-luxe ring-1 ring-luxe-gold/15 hover:ring-luxe-gold/30'
                  }`}
                >
                  {/* Highlight badge */}
                  {t.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-deep px-4 py-1.5 text-luxe-void font-accent text-[10px] uppercase tracking-[0.22em]">
                        <Crown className="w-3 h-3" />
                        Most Loved
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6 mt-2">
                    <div>
                      <div className="font-accent text-[10px] uppercase tracking-[0.28em] text-luxe-gold/80 mb-1.5">
                        {t.tagline}
                      </div>
                      <h3 className="font-display text-3xl text-luxe-ivory">{t.name}</h3>
                    </div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-luxe-strong text-luxe-gold">
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="mb-6 pb-6 border-b border-luxe-gold/15">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl md:text-5xl text-gradient-gold">
                        {t.price}
                      </span>
                      <span className="font-accent text-[11px] uppercase tracking-[0.18em] text-luxe-mute">
                        {t.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-luxe-ivory/75">
                        <Check className="w-4 h-4 mt-0.5 text-luxe-gold flex-shrink-0" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <MagneticButton
                    as="a"
                    href="#booking"
                    dataCursor="cta"
                    className={`group/cta mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-accent text-xs uppercase tracking-[0.22em] transition-all ${
                      t.highlight
                        ? 'bg-gradient-to-r from-luxe-gold via-luxe-gold-deep to-luxe-gold text-luxe-void hover:shadow-glow-gold'
                        : 'glass-luxe-strong text-luxe-ivory hover:text-luxe-gold'
                    }`}
                  >
                    {t.cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
                  </MagneticButton>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-[11px] text-luxe-mute font-accent tracking-[0.18em]">
            ALL PRICES IN USD · TAX INCLUDED · NO TIPPING EXPECTED
          </p>
        </Reveal>
      </div>
    </section>
  );
}
