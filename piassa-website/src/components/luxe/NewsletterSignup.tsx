'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, ArrowRight } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const r = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || null, source: 'footer' }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Failed');
      setStatus('ok');
      setEmail('');
      setName('');
      // Auto-reset after 4s
      setTimeout(() => setStatus('idle'), 4000);
    } catch (e: any) {
      setStatus('err');
      setErrorMsg(e.message || 'Something went wrong');
    }
  };

  return (
    <div className="glass-luxe rounded-2xl p-5 ring-gold-soft">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-3.5 h-3.5 text-luxe-gold" />
        <span className="font-accent text-[10px] uppercase tracking-[0.22em] text-luxe-gold/90">
          The Ritual Letter
        </span>
      </div>
      <p className="text-sm text-luxe-ivory/65 leading-relaxed mb-4">
        Monthly skincare notes, member-only invites, and the occasional birthday gift.
        No spam — just beauty.
      </p>
      <form onSubmit={submit} className="space-y-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="w-full bg-luxe-void/50 border border-luxe-gold/15 rounded-md px-3 py-2.5 text-sm text-luxe-ivory placeholder:text-luxe-mute/50 focus:border-luxe-gold focus:outline-none"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full bg-luxe-void/50 border border-luxe-gold/15 rounded-md px-3 py-2.5 text-sm text-luxe-ivory placeholder:text-luxe-mute/50 focus:border-luxe-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-deep px-4 py-3 text-luxe-void font-accent text-xs uppercase tracking-[0.22em] hover:shadow-glow-gold transition-all disabled:opacity-50"
        >
          {status === 'loading' ? (
            'Joining…'
          ) : status === 'ok' ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Welcome to the ritual
            </>
          ) : (
            <>
              Join the ritual
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        <AnimatePresence>
          {status === 'err' && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-rose-400"
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
