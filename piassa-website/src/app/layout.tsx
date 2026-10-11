import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Marcellus } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL, CONTACT, BRAND } from "@/lib/luxe/config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const SITE_URL_CONST = SITE_URL;

const TAGLINE = "Beauty & Wellness Studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL_CONST),
  title: {
    default: `${BRAND.name} — ${TAGLINE}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Premium beauty and wellness studio offering hair care, facials, nail art, massage and bridal styling. Crafted with precision — book your appointment today.",
  keywords: [
    BRAND.name,
    "beauty salon",
    "spa",
    "hair care",
    "facial",
    "skincare",
    "nail art",
    "massage",
    "bridal styling",
    "makeup artist",
    "luxury salon",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BRAND.name} — ${TAGLINE}`,
    description:
      "Premium beauty and wellness studio offering hair care, facials, nail art, massage and bridal styling.",
    url: SITE_URL_CONST,
    siteName: BRAND.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${TAGLINE}`,
    description:
      "Premium beauty and wellness studio offering hair care, facials, nail art, massage and bridal styling.",
    creator: CONTACT.instagram,
  },
  category: "Beauty & Personal Care",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A0F26" },
    { media: "(prefers-color-scheme: dark)", color: "#120821" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Schema.org structured data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": `${SITE_URL_CONST}/#salon`,
      name: BRAND.name,
      description:
        "Premium beauty and wellness studio offering hair care, facials, nail art, massage and bridal styling.",
      url: SITE_URL_CONST,
      telephone: `+${CONTACT.whatsappNumber}`,
      image: `${SITE_URL_CONST}/opengraph-image.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Beauty Lane, Suite 100",
        addressLocality: "Beverly Hills",
        addressRegion: "CA",
        postalCode: "90210",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 34.0736,
        longitude: -118.4004,
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday"], opens: "10:00", closes: "21:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Thursday", "Friday"], opens: "10:00", closes: "22:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "22:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "11:00", closes: "19:00" },
      ],
      priceRange: "$45-$650",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "8200",
        bestRating: "5",
      },
      sameAs: [
        `https://wa.me/${CONTACT.whatsappNumber}`,
        CONTACT.instagramUrl,
      ],
    },
    {
      "@type": "Service",
      serviceType: "Hair Care",
      provider: { "@id": `${SITE_URL_CONST}/#salon` },
      areaServed: { "@type": "City", name: "Beverly Hills" },
      offers: { "@type": "Offer", price: "65", priceCurrency: "USD" },
    },
    {
      "@type": "Service",
      serviceType: "Facials & Skincare",
      provider: { "@id": `${SITE_URL_CONST}/#salon` },
      areaServed: { "@type": "City", name: "Beverly Hills" },
      offers: { "@type": "Offer", price: "85", priceCurrency: "USD" },
    },
    {
      "@type": "Service",
      serviceType: "Bridal & Events",
      provider: { "@id": `${SITE_URL_CONST}/#salon` },
      areaServed: { "@type": "City", name: "Beverly Hills" },
      offers: { "@type": "Offer", price: "650", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need an appointment, or do you take walk-ins?",
          acceptedAnswer: { "@type": "Answer", text: "Booking ahead is recommended so we can reserve the right specialist for you. We welcome walk-ins whenever a chair is free." },
        },
        {
          "@type": "Question",
          name: "How early should I book?",
          acceptedAnswer: { "@type": "Answer", text: "For single treatments, 3-5 days notice is usually enough. For bridal and event packages, we recommend booking at least 90 days ahead." },
        },
        {
          "@type": "Question",
          name: "What is your cancellation policy?",
          acceptedAnswer: { "@type": "Answer", text: "Free reschedule up to 24 hours before your appointment. Within 24 hours a 25% fee applies, and no-shows are charged at 50%." },
        },
        {
          "@type": "Question",
          name: "Which products do you use?",
          acceptedAnswer: { "@type": "Answer", text: "We use professional, cruelty-free product lines. Your specialist will walk you through every formula before it touches your skin or hair." },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${marcellus.variable} antialiased bg-luxe-void text-luxe-ivory`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
