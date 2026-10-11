'use client';

import dynamic from 'next/dynamic';
import SmoothScrollProvider from '@/components/luxe/SmoothScrollProvider';
import CustomCursor from '@/components/luxe/CustomCursor';
import Navbar from '@/components/luxe/Navbar';
import Hero from '@/components/luxe/Hero';
import Marquee from '@/components/luxe/Marquee';
import About from '@/components/luxe/About';
import StickyBookingPill from '@/components/luxe/StickyBookingPill';
import CookieConsent from '@/components/luxe/CookieConsent';
import SocialShare from '@/components/luxe/SocialShare';

// Lazy-load below-the-fold sections to reduce initial JS bundle.
// Each section appears in viewport during scroll → loads just-in-time.
const Team = dynamic(() => import('@/components/luxe/Team'), { loading: () => <SectionSkeleton /> });
const Services = dynamic(() => import('@/components/luxe/Services'), { loading: () => <SectionSkeleton /> });
const Process = dynamic(() => import('@/components/luxe/Process'), { loading: () => <SectionSkeleton /> });
const Signature = dynamic(() => import('@/components/luxe/Signature'), { loading: () => <SectionSkeleton /> });
const Gallery = dynamic(() => import('@/components/luxe/Gallery'), { loading: () => <SectionSkeleton /> });
const Testimonials = dynamic(() => import('@/components/luxe/Testimonials'), { loading: () => <SectionSkeleton /> });
const Pricing = dynamic(() => import('@/components/luxe/Pricing'), { loading: () => <SectionSkeleton /> });
const FAQ = dynamic(() => import('@/components/luxe/FAQ'), { loading: () => <SectionSkeleton /> });
const Booking = dynamic(() => import('@/components/luxe/Booking'), { loading: () => <SectionSkeleton /> });
const Footer = dynamic(() => import('@/components/luxe/Footer'), { loading: () => <SectionSkeleton /> });

function SectionSkeleton() {
  return (
    <section
      className="relative bg-luxe-void"
      style={{ minHeight: '60vh' }}
      aria-hidden
    >
      <div className="absolute inset-0 shimmer opacity-20" />
    </section>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      <main className="bg-luxe-void text-luxe-ivory overflow-x-hidden">
        <Hero />
        <Marquee />
        <About />
        <Team />
        <Services />
        <Process />
        <Signature />
        <Gallery />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Booking />
        <Footer />
      </main>
      <StickyBookingPill />
      <CookieConsent />
      <SocialShare />
    </SmoothScrollProvider>
  );
}
