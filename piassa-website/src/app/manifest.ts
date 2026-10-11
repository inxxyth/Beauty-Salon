import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Luxe Salon & Spa',
    short_name: 'Luxe',
    description:
      'Premium beauty and wellness studio offering hair care, facials, nail art, massage and bridal styling.',
    start_url: '/',
    display: 'standalone',
    background_color: '#120821',
    theme_color: '#1A0F26',
    orientation: 'portrait-primary',
    categories: ['beauty', 'lifestyle', 'health'],
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Book a Session',
        short_name: 'Book',
        url: '/#booking',
      },
      {
        name: 'Our Services',
        short_name: 'Services',
        url: '/#services',
      },
      {
        name: 'Visit Us',
        short_name: 'Visit',
        url: '/#visit',
      },
    ],
  };
}
