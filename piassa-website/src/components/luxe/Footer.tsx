'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, EyebrowLabel } from './Reveal';
import { MapPin, Clock, Instagram, Phone, Mail, ArrowUpRight } from 'lucide-react';
import SmartImage from './SmartImage';
import NewsletterSignup from './NewsletterSignup';
import { CONTACT, FOOTER_LINKS, whatsappLink, EXT_LINK_ATTRS } from '@/lib/luxe/config';

const WHATSAPP = whatsappLink();

const hours = [
  { day: 'Monday', time: '10:00 — 21:00' },
  { day: 'Tuesday', time: '10:00 — 21:00' },
  { day: 'Wednesday', time: '10:00 — 21:00' },
  { day: 'Thursday', time: '10:00 — 22:00' },
  { day: 'Friday', time: '10:00 — 22:00' },
  { day: 'Saturday', time: '09:00 — 22:00' },
  { day: 'Sunday', time: '11:00 — 19:00' },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <footer ref={ref} id="visit" className="relative bg-luxe-aubergine pt-24 md:pt-32 pb-10">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-gold-line opacity-50" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-luxe-orchid/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Visit / location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-6">
            <Reveal>
              <EyebrowLabel>Find Us</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] text-luxe-ivory">
                Come visit
                <span className="block italic font-light text-gradient-plum-gold mt-1">the studio.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-4">
                <a
                  href={CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group glass-luxe rounded-2xl px-5 py-4 flex items-start gap-4 hover-lift"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-luxe-orchid/40 text-luxe-gold shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute">
                      Luxe Salon &amp; Spa
                    </div>
                    <div className="font-display text-lg text-luxe-ivory mt-1">
                      123 Beauty Lane, Suite 100
                    </div>
                    <div className="text-sm text-luxe-ivory/55 mt-1">
                      Beverly Hills, CA 90210 · Tap for directions
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-luxe-gold mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="glass-luxe rounded-2xl px-5 py-4 flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-luxe-orchid/40 text-luxe-gold shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute mb-2">
                      Studio Hours
                    </div>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                      {hours.map((h) => (
                        <li key={h.day} className="flex items-center justify-between text-sm">
                          <span className="text-luxe-ivory/70">{h.day}</span>
                          <span className="text-luxe-ivory/90 font-accent text-[11px] tracking-[0.12em]">
                            {h.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <motion.div
                style={{ y: mapY }}
                className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden ring-1 ring-luxe-gold/20 shadow-glow-purple"
              >
                <iframe
                  title="Luxe Salon & Spa location"
                  src="https://www.google.com/maps?q=123+Beauty+Lane+Suite+100&output=embed"
                  className="absolute inset-0 h-full w-full grayscale-[40%] contrast-110"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-luxe-gold/20 rounded-3xl" />
              </motion.div>
            </Reveal>
          </div>
        </div>

        {/* Brand wordmark + quick links */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pb-12 border-b border-luxe-gold/10">
          <div className="flex-1 w-full">
            <div className="font-display text-7xl md:text-[10rem] leading-[0.9] tracking-tight">
              <span className="text-luxe-ivory">L</span>
              <span className="text-gradient-gold">uxe</span>
              <span className="block italic font-light text-luxe-lavender text-3xl md:text-5xl mt-2">
                salon &amp; spa
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm text-luxe-ivory/55 leading-relaxed">
              A modern beauty and wellness studio. Hair, skin, nails, massage, makeup and bridal.
              Crafted with obsessive precision.
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <NewsletterSignup />
          </div>

          <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href} label={l.label} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href={WHATSAPP}
              {...EXT_LINK_ATTRS}
              aria-label="Contact on WhatsApp"
              className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full glass-luxe text-luxe-gold hover:text-luxe-ivory transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              aria-label={`Email ${CONTACT.email}`}
              className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full glass-luxe text-luxe-gold hover:text-luxe-ivory transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={CONTACT.instagramUrl}
              {...EXT_LINK_ATTRS}
              aria-label={`Follow ${CONTACT.instagram} on Instagram`}
              className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full glass-luxe text-luxe-gold hover:text-luxe-ivory transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[11px] text-luxe-mute font-accent tracking-[0.15em] text-center">
            © {new Date().getFullYear()} LUXE SALON &amp; SPA
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="font-accent text-[11px] uppercase tracking-[0.22em] text-luxe-ivory/60 hover:text-luxe-gold transition-colors"
    >
      {label}
    </a>
  );
}
