'use client';

import { Sparkles } from 'lucide-react';

const items = [
  'Hair Care',
  'Facials & Skincare',
  'Nail Art',
  'Massage & Spa',
  'Makeup Artistry',
  'Bridal & Events',
  'Lash & Brow',
  'Waxing & Threading',
];

export default function Marquee() {
  // duplicate items so the loop is seamless
  const loop = [...items, ...items];

  return (
    <section className="relative py-10 border-y border-luxe-gold/10 bg-luxe-aubergine/40 overflow-hidden">
      <div className="marquee-wrap mask-fade-edges">
        <div className="marquee-track" style={{ ['--marquee-duration' as any]: '52s' }}>
          {loop.map((item, i) => (
            <span key={i} className="flex items-center gap-6 pr-10">
              <span className="font-display italic text-2xl md:text-4xl text-luxe-ivory/80 whitespace-nowrap">
                {item}
              </span>
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-luxe-gold/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
