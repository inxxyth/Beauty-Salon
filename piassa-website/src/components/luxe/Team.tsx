'use client';

import { motion } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Instagram } from 'lucide-react';
import SmartImage from './SmartImage';

type Stylist = {
  name: string;
  role: string;
  specialty: string;
  image: string;
  years: string;
};

const team: Stylist[] = [
  {
    name: 'Amina K.',
    role: 'Founder · Creative Director',
    specialty: 'Bridal & Events · Editorial',
    image: '/luxe/team-1.png',
    years: '14 yrs',
  },
  {
    name: 'Mariam R.',
    role: 'Master Colorist',
    specialty: 'Balayage · Gloss · Repair',
    image: '/luxe/team-2.png',
    years: '11 yrs',
  },
  {
    name: 'Lina A.',
    role: 'Senior Aesthetician',
    specialty: 'Clinical Facials · Skin Health',
    image: '/luxe/team-3.png',
    years: '9 yrs',
  },
  {
    name: 'Yara M.',
    role: 'Lead Makeup Artist',
    specialty: 'Bridal · Event · Editorial',
    image: '/luxe/team-4.png',
    years: '8 yrs',
  },
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 md:py-36 bg-luxe-void overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 h-96 w-96 rounded-full bg-luxe-orchid/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-luxe-gold/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <EyebrowLabel>The Hands</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-luxe-ivory max-w-3xl">
                Quiet obsessions,
                <span className="block italic font-light text-gradient-plum-gold mt-1">behind the chair.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm text-luxe-ivory/55 leading-relaxed">
              Each of our specialists has been hand-picked — for their craft, their patience,
              and their quiet obsession with detail. You will know your stylist by name.
            </p>
          </Reveal>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {team.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.08}>
              <div
                data-cursor="hover"
                className="group relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden ring-1 ring-luxe-gold/15 hover:ring-luxe-gold/40 transition-all duration-500 hover-lift"
              >
                <SmartImage
                  src={s.image}
                  alt={s.name}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="h-full w-full"
                  imgClassName="transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-void via-luxe-void/30 to-transparent" />

                {/* Years badge */}
                <div className="absolute top-4 right-4 glass-luxe-strong rounded-full px-3 py-1.5">
                  <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-luxe-gold">
                    {s.years}
                  </span>
                </div>

                {/* Info */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-accent text-[10px] uppercase tracking-[0.28em] text-luxe-gold/80 mb-1.5">
                    {s.role}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-luxe-ivory leading-tight">
                    {s.name}
                  </h3>
                  {/* Reveal on hover */}
                  <motion.div
                    initial={false}
                    className="overflow-hidden"
                    style={{
                      maxHeight: 0,
                    }}
                  >
                    <p className="mt-2 text-sm text-luxe-ivory/65">{s.specialty}</p>
                  </motion.div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute bottom-5 right-5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-luxe-gold/20 backdrop-blur-md text-luxe-gold">
                      <Instagram className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
