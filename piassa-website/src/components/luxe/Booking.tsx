'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, EyebrowLabel } from './Reveal';
import { Phone, Mail, Instagram, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import SmartImage from './SmartImage';
import { CONTACT, whatsappLink, EXT_LINK_ATTRS } from '@/lib/luxe/config';

const WHATSAPP = whatsappLink();

const schema = z.object({
  name: z.string().min(2, 'Please share your name'),
  phone: z.string().min(6, 'A phone helps us reach you'),
  service: z.string().min(1, 'Pick a ritual'),
  date: z.string().optional(),
  message: z.string().optional(),
});

type Form = z.infer<typeof schema>;

const serviceOptions = [
  'Hair Care',
  'Facials & Skincare',
  'Makeup Artistry',
  'Nail Art',
  'Bridal & Events',
  'Massage & Spa',
  'Not sure yet — surprise me',
];

export default function Booking() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    // 1. Persist lead to database via API (silent fail — WhatsApp is primary)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          service: data.service,
          preferredDate: data.date || null,
          message: data.message || null,
          source: 'website-form',
        }),
      });
    } catch {
      // Silent — WhatsApp fallback still works
    }

    // 2. Build WhatsApp message + open it
    const msg = `Hi Luxe — I'd love to book a session.\n\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}${data.date ? `\nPreferred date: ${data.date}` : ''}${data.message ? `\nNotes: ${data.message}` : ''}`;

    toast.success('Saved. Opening WhatsApp — see you soon.');
    setTimeout(() => {
      window.open(whatsappLink(msg), '_blank', 'noopener,noreferrer');
    }, 400);
    reset();
  };

  return (
    <section
      ref={ref}
      id="booking"
      className="relative min-h-screen bg-luxe-void overflow-hidden"
    >
      {/* Background atmospheric */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 pointer-events-none">
        <SmartImage
          src="/luxe/cta-bg.png"
          alt="Luxe Salon & Spa atmosphere — flowing purple and gold gradient"
          sizes="100vw"
          className="h-full w-full opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxe-void/80 via-luxe-void/60 to-luxe-void" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Left — headline + contact chips */}
          <div className="lg:col-span-5">
            <Reveal>
              <EyebrowLabel>Reserve Your Ritual</EyebrowLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl leading-[0.92] text-luxe-ivory">
                Step into
                <span className="block italic font-light text-gradient-plum-gold mt-1">
                  the chair.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 md:mt-7 text-sm md:text-lg text-luxe-ivory/70 leading-relaxed max-w-md">
                Send a note or ping us on WhatsApp — we reply within 15 minutes during studio hours.
                Your chair, your time, your glow.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 md:mt-10 flex flex-col gap-2.5">
                {/* WhatsApp — primary contact */}
                <a
                  href={WHATSAPP}
                  data-cursor="cta"
                  {...EXT_LINK_ATTRS}
                  className="group glass-luxe-strong rounded-2xl px-4 md:px-5 py-3.5 md:py-4 flex items-center gap-3 md:gap-4 hover-lift min-h-[60px]"
                >
                  <span className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-luxe-orchid/40 text-luxe-gold flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute">
                      WhatsApp
                    </div>
                    <div className="font-display text-base md:text-lg text-luxe-ivory">{CONTACT.whatsappDisplay}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-luxe-gold transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group glass-luxe rounded-2xl px-4 md:px-5 py-3.5 md:py-4 flex items-center gap-3 md:gap-4 hover-lift min-h-[60px]"
                >
                  <span className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-luxe-orchid/40 text-luxe-gold flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute">
                      Email
                    </div>
                    <div className="font-display text-base md:text-lg text-luxe-ivory truncate">{CONTACT.email}</div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={CONTACT.instagramUrl}
                  {...EXT_LINK_ATTRS}
                  className="group glass-luxe rounded-2xl px-4 md:px-5 py-3.5 md:py-4 flex items-center gap-3 md:gap-4 hover-lift min-h-[60px]"
                >
                  <span className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-luxe-orchid/40 text-luxe-gold flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute">
                      Instagram
                    </div>
                    <div className="font-display text-base md:text-lg text-luxe-ivory">{CONTACT.instagram}</div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — booking form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-luxe-strong rounded-3xl p-5 md:p-10 ring-gold-soft shadow-glow-purple relative overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 font-display text-[12rem] leading-none text-luxe-gold/5 select-none pointer-events-none" aria-hidden>
                  L
                </div>
                <div className="relative">
                  <h3 className="font-display text-2xl md:text-4xl text-luxe-ivory">
                    Request a session
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-luxe-ivory/55">
                    We&apos;ll confirm by WhatsApp within minutes during studio hours.
                  </p>

                  <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <Field label="Your Name">
                      <Input
                        {...register('name')}
                        placeholder="Layla A."
                        autoComplete="name"
                        className="bg-luxe-void/50 border-luxe-gold/15 text-luxe-ivory placeholder:text-luxe-mute/50 focus:border-luxe-gold h-11 md:h-10"
                      />
                      {errors.name && <ErrText>{errors.name.message}</ErrText>}
                    </Field>
                    <Field label="Phone / WhatsApp">
                      <Input
                        {...register('phone')}
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                        className="bg-luxe-void/50 border-luxe-gold/15 text-luxe-ivory placeholder:text-luxe-mute/50 focus:border-luxe-gold h-11 md:h-10"
                      />
                      {errors.phone && <ErrText>{errors.phone.message}</ErrText>}
                    </Field>
                    <Field label="Ritual">
                      <select
                        {...register('service')}
                        className="w-full bg-luxe-void/50 border border-luxe-gold/15 rounded-md px-3 py-2.5 text-luxe-ivory focus:border-luxe-gold focus:outline-none h-11 md:h-10 [color-scheme:dark]"
                      >
                        <option value="">Select a ritual…</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s} className="bg-luxe-aubergine">
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.service && <ErrText>{errors.service.message}</ErrText>}
                    </Field>
                    <Field label="Preferred Date (optional)">
                      <Input
                        type="date"
                        {...register('date')}
                        className="bg-luxe-void/50 border-luxe-gold/15 text-luxe-ivory placeholder:text-luxe-mute/50 focus:border-luxe-gold h-11 md:h-10 [color-scheme:dark]"
                      />
                    </Field>
                  </div>

                  <div className="mt-3 md:mt-4">
                    <Field label="Anything we should know? (optional)">
                      <Textarea
                        {...register('message')}
                        rows={3}
                        placeholder="Skin concerns, hair history, event date, or just say hi."
                        className="bg-luxe-void/50 border-luxe-gold/15 text-luxe-ivory placeholder:text-luxe-mute/50 focus:border-luxe-gold resize-none"
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="cta"
                    className="group mt-6 md:mt-8 inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-luxe-gold via-luxe-gold-deep to-luxe-gold px-7 py-4 text-luxe-void font-accent text-xs uppercase tracking-[0.22em] transition-all hover:shadow-glow-gold disabled:opacity-50 min-h-[52px]"
                  >
                    {isSubmitting ? 'Securing your slot…' : 'Send my request'}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="mt-3 md:mt-4 text-[11px] text-luxe-mute">
                    By sending, you agree to be contacted by Luxe Salon &amp; Spa. No spam, ever.
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-mute block mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function ErrText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-[11px] text-luxe-gold/80">{children}</p>;
}
