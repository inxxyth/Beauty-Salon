'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Plus } from 'lucide-react';
import SmartImage from './SmartImage';
import GalleryLightbox, { useLightbox } from './GalleryLightbox';

type Shot = { src: string; title: string; tag: string; span: 'tall' | 'wide' | 'normal' };

const shots: Shot[] = [
  { src: '/luxe/gallery-1.png', title: 'Aubergine Dreams', tag: 'Texture', span: 'tall' },
  { src: '/luxe/service-makeup.png', title: 'Gold Shimmer', tag: 'Makeup', span: 'normal' },
  { src: '/luxe/gallery-2.png', title: 'The Serum Drop', tag: 'Ritual', span: 'normal' },
  { src: '/luxe/gallery-3.png', title: 'Liquid Gold', tag: 'Texture', span: 'wide' },
  { src: '/luxe/service-facial.png', title: 'Glass Skin', tag: 'Skin', span: 'normal' },
  { src: '/luxe/service-nails.png', title: 'Chrome Petals', tag: 'Nails', span: 'normal' },
  { src: '/luxe/bridal-portrait.png', title: 'The First Look', tag: 'Bridal', span: 'tall' },
  { src: '/luxe/service-hair.png', title: 'Silk Strands', tag: 'Hair', span: 'normal' },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yUp = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lightbox = useLightbox(shots);

  return (
    <section ref={ref} id="gallery" className="relative py-24 md:py-36 bg-luxe-aubergine overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-luxe-orchid/15 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-luxe-gold/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <EyebrowLabel>Visual Atelier</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-luxe-ivory max-w-3xl">
                Moments from
                <span className="block italic font-light text-gradient-plum-gold mt-1">the chair.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a
              href="https://instagram.com/luxesalon"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.22em] text-luxe-gold/90 hover:text-luxe-ivory transition-colors"
            >
              @luxesalon
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </a>
          </Reveal>
        </div>

        {/* Masonry grid */}
        <motion.div style={{ y: yUp }} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 [grid-auto-flow:dense]">
          {shots.map((shot, i) => (
            <Reveal
              key={shot.title}
              delay={(i % 4) * 0.06}
              className={
                shot.span === 'tall'
                  ? 'row-span-2 aspect-[3/4]'
                  : shot.span === 'wide'
                  ? 'col-span-2 aspect-[16/9]'
                  : 'aspect-square'
              }
            >
              <button
                onClick={() => lightbox.setOpen(i)}
                data-cursor="hover"
                aria-label={`View ${shot.title}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-luxe-gold/15 hover-lift block text-left"
              >
                <SmartImage
                  src={shot.src}
                  alt={shot.title}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="h-full w-full"
                  imgClassName="transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-void/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-luxe-gold/90">
                    {shot.tag}
                  </div>
                  <div className="mt-1 font-display text-xl md:text-2xl text-luxe-ivory">
                    {shot.title}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-gold/70">
                    <Plus className="w-3 h-3" /> Tap to expand
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </motion.div>
      </div>

      <GalleryLightbox shots={shots} state={lightbox} />
    </section>
  );
}
