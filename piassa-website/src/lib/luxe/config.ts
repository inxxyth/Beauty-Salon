/**
 * Luxe Salon & Spa — Centralized Site Configuration
 *
 * Single source of truth for all business contact info, services, pricing,
 * and navigation. Update here once — propagates everywhere.
 *
 * This file is imported by both client and server components,
 * so it must not contain any server-only logic.
 *
 * NOTE: All details below are placeholder/demo data for a template.
 */

// ─── Brand ─────────────────────────────────────────────────────────────
export const BRAND = {
  name: 'Luxe Salon & Spa',
  shortName: 'Luxe',
  tagline: 'Beauty & Wellness Atelier',
} as const;

// ─── Contact Information ───────────────────────────────────────────────
export const CONTACT = {
  /** WhatsApp number in international format (no +, no spaces) */
  whatsappNumber: '15551234567',
  /** Display format for UI */
  whatsappDisplay: '+1 (555) 123-4567',
  email: 'info@your-salon.com',
  instagram: '@luxesalon',
  instagramUrl: 'https://instagram.com/luxesalon',
  googleMapsUrl: 'https://maps.google.com/?q=123+Beauty+Lane+Suite+100',
  location: '123 Beauty Lane, Suite 100',
  region: 'Beverly Hills, CA 90210',
} as const;

// ─── WhatsApp Link Builder ─────────────────────────────────────────────
/**
 * Build a pre-filled WhatsApp deep link.
 * @param message — the pre-filled text the user will send
 */
export function whatsappLink(message?: string): string {
  const text = message || `Hi ${BRAND.shortName}, I'd love to book a session`;
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// ─── Service Catalog (matches Services.tsx + Pricing.tsx) ──────────────
export const SERVICES = [
  {
    id: 'hair',
    name: 'Hair Care',
    tagline: 'Cut · Color · Style',
    price: 'from $65',
    duration: '45–150 min',
  },
  {
    id: 'facial',
    name: 'Facials & Skincare',
    tagline: 'Glow · Clinical · Bespoke',
    price: 'from $85',
    duration: '60–90 min',
  },
  {
    id: 'makeup',
    name: 'Makeup Artistry',
    tagline: 'Event · Editorial · Daily',
    price: 'from $95',
    duration: '45–90 min',
  },
  {
    id: 'nails',
    name: 'Nail Art',
    tagline: 'Manicure · Gel · Design',
    price: 'from $45',
    duration: '45–90 min',
  },
  {
    id: 'bridal',
    name: 'Bridal & Events',
    tagline: 'Trial · Day-of · Party',
    price: 'from $650',
    duration: 'Multi-session',
  },
  {
    id: 'spa',
    name: 'Massage & Spa',
    tagline: 'Relax · Restore · Renew',
    price: 'from $75',
    duration: '60–120 min',
  },
] as const;

// ─── Pricing Tiers ─────────────────────────────────────────────────────
export const PRICING = {
  singleVisit: '$65+',
  glowClub: '$250',
  bridalJourney: '$650+',
} as const;

// ─── Navigation ────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Method' },
  { href: '#team', label: 'Stylists' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#packages', label: 'Packages' },
  { href: '#visit', label: 'Visit' },
] as const;

// ─── Footer Links (only valid section IDs) ─────────────────────────────
export const FOOTER_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Method' },
  { href: '#team', label: 'Stylists' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#packages', label: 'Packages' },
  { href: '#booking', label: 'Reserve' },
  { href: '#faq', label: 'FAQ' },
  { href: '#visit', label: 'Visit' },
] as const;

// ─── Site URLs ─────────────────────────────────────────────────────────
export const SITE_URL = 'https://your-salon.example.com';

// ─── External link attributes (security) ───────────────────────────────
export const EXT_LINK_ATTRS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
