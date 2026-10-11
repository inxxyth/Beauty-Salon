'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, MessageCircle, Link as LinkIcon, Check } from 'lucide-react';
import { SITE_URL } from '@/lib/luxe/config';

export default function SocialShare() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : SITE_URL;
  const shareText = 'Luxe Salon & Spa — Where beauty becomes ritual. 123 Beauty Lane, Suite 100.';

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = () => {
    // Copy link to clipboard so user can paste in IG
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed left-4 bottom-24 md:bottom-6 z-40 hidden md:flex flex-col items-center gap-2">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(true)}
            aria-label="Share Luxe Salon & Spa"
            data-cursor="hover"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-luxe-strong text-luxe-gold hover:text-luxe-ivory transition-colors ring-gold-soft"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2 glass-luxe-strong rounded-3xl p-2 ring-gold-soft"
          >
            <button
              onClick={handleWhatsApp}
              aria-label="Share on WhatsApp"
              data-cursor="hover"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-luxe-orchid/30 text-luxe-lavender hover:text-luxe-ivory transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleInstagram}
              aria-label="Copy link for Instagram"
              data-cursor="hover"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-luxe-orchid/30 text-luxe-lavender hover:text-luxe-ivory transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <LinkIcon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close share"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full glass-luxe text-luxe-mute hover:text-luxe-ivory transition-colors mt-1"
            >
              <X className="w-3 h-3" />
            </button>
            {copied && (
              <span className="absolute right-14 whitespace-nowrap font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-gold">
                Copied
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
