'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import SmartImage from './SmartImage';

type Service = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
};

const services: Service[] = [
  {
    id: 'hair',
    name: 'Hair Care',
    tagline: 'Cut · Color · Style',
    desc: 'Precision cuts, dimensional color, and restorative treatments — tailored to your texture, lifestyle, and the way you want to feel leaving the chair.',
    price: 'from $65',
    duration: '45–150 min',
    image: '/luxe/service-hair.png',
    features: ['Precision Cut', 'Color & Highlights', 'Keratin Treatment', 'Scalp Therapy'],
  },
  {
    id: 'facial',
    name: 'Facials & Skincare',
    tagline: 'Glow · Clinical · Bespoke',
    desc: 'A skin reading begins every facial. We pair clinical actives with sculpting massage for a glow that deepens over days, not hours.',
    price: 'from $85',
    duration: '60–90 min',
    image: '/luxe/service-facial.png',
    features: ['Signature Facial', 'Deep Cleansing', 'LED Therapy', 'Gua Sha Sculpt'],
  },
  {
    id: 'makeup',
    name: 'Makeup Artistry',
    tagline: 'Event · Editorial · Daily',
    desc: 'From a candle-lit dinner to a magazine cover — soft glam, sculpted skin, and a single signature lip. Airbrush or hand-blended, your call.',
    price: 'from $95',
    duration: '45–90 min',
    image: '/luxe/service-makeup.png',
    features: ['Soft Glam', 'Airbrush Base', 'Evening Look', 'Lash Application'],
  },
  {
    id: 'nails',
    name: 'Nail Art',
    tagline: 'Manicure · Gel · Design',
    desc: 'A 60-minute pause for your hands. Sculpted shapes, deep-conditioning soaks, chrome finishes and custom nail art — finished slow, polished mirror-deep.',
    price: 'from $45',
    duration: '45–90 min',
    image: '/luxe/service-nails.png',
    features: ['Classic Manicure', 'Gel Polish', 'Nail Art Design', 'Spa Pedicure'],
  },
  {
    id: 'bridal',
    name: 'Bridal & Events',
    tagline: 'Trial · Day-of · Party',
    desc: 'A multi-session journey: from skin prep and trial, to the morning-of glow. We travel with you — quite literally — through the most photographed day of your life.',
    price: 'from $650',
    duration: 'Multi-session',
    image: '/luxe/bridal-portrait.png',
    features: ['Skin Prep Program', 'Trial Session', 'Day-of Styling', 'On-location Service'],
  },
  {
    id: 'spa',
    name: 'Massage & Spa',
    tagline: 'Relax · Restore · Renew',
    desc: 'Heated stone, warm oil, and quiet hands. Our spa room is calm and candle-lit, built for one thing: you forgetting what time it is.',
    price: 'from $75',
    duration: '60–120 min',
    image: '/luxe/service-spa.png',
    features: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy', 'Hot Stone'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 bg-luxe-aubergine overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-luxe-orchid/15 blur-[140px]" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-luxe-gold/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <EyebrowLabel>The Rituals</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-luxe-ivory max-w-3xl">
                Six rituals,
                <span className="block italic font-light text-gradient-plum-gold mt-1">one atelier.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm text-luxe-ivory/55 leading-relaxed">
              Each ritual is a private session — slow, considered, and tailored to you alone.
              Tap any card to expand the details.
            </p>
          </Reveal>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <div
        data-cursor="hover"
        className="group relative rounded-3xl overflow-hidden ring-1 ring-luxe-gold/15 bg-luxe-void/40 hover-lift hover:ring-luxe-gold/40 transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <SmartImage
            src={service.image}
            alt={service.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full"
            imgClassName="transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-void via-luxe-void/40 to-transparent" />

          {/* Price chip */}
          <div className="absolute top-4 right-4 glass-luxe-strong rounded-full px-3 py-1.5 ring-gold-soft">
            <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-gold">
              {service.price}
            </span>
          </div>

          {/* Title */}
          <div className="absolute bottom-5 left-5 right-5">
            <div className="font-accent text-[10px] uppercase tracking-[0.28em] text-luxe-gold/80 mb-1.5">
              {service.tagline}
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-luxe-ivory leading-tight">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Expandable content */}
        <div className="p-5 md:p-6">
          <p className="text-sm text-luxe-ivory/65 leading-relaxed">{service.desc}</p>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? `Hide details for ${service.name}` : `Show details for ${service.name}`}
            className="mt-4 inline-flex items-center gap-2 font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-gold/80 hover:text-luxe-ivory transition-colors"
          >
            {open ? (
              <>
                <Minus className="w-3 h-3" />
                Hide details
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                Show details
              </>
            )}
          </button>

          <motion.div
            initial={false}
            animate={{
              height: open ? 'auto' : 0,
              opacity: open ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 flex flex-wrap gap-2">
              {service.features.map((f) => (
                <span
                  key={f}
                  className="glass-luxe rounded-full px-3 py-1.5 text-[11px] text-luxe-ivory/80"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-6 pt-4 border-t border-luxe-gold/10">
              <div>
                <div className="font-accent text-[9px] uppercase tracking-[0.22em] text-luxe-mute">
                  Investment
                </div>
                <div className="mt-1 font-display text-lg text-gradient-gold">
                  {service.price}
                </div>
              </div>
              <span className="h-8 w-px bg-luxe-gold/20" />
              <div>
                <div className="font-accent text-[9px] uppercase tracking-[0.22em] text-luxe-mute">
                  Duration
                </div>
                <div className="mt-1 font-display text-lg text-luxe-ivory">
                  {service.duration}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reserve CTA */}
          <a
            href="#booking"
            data-cursor="cta"
            className="mt-5 group/cta inline-flex items-center gap-2 font-accent text-[11px] uppercase tracking-[0.22em] text-luxe-gold hover:text-luxe-ivory transition-colors min-h-[32px]"
          >
            Reserve this ritual
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
