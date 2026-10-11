'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Reveal — slide-up + fade-in on scroll into view. Default subtle.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' });
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * EyebrowLabel — small caps champagne label with hairline rule.
 */
export function EyebrowLabel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="block h-px w-10 bg-gradient-gold-line" />
      <span className="font-accent text-[11px] md:text-xs uppercase tracking-[0.3em] text-luxe-gold/90">
        {children}
      </span>
    </div>
  );
}

/**
 * SplitText — stagger-reveal word-by-word. Use sparingly.
 */
export function SplitText({
  text,
  className = '',
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const words = text.split(' ');
  return (
    <Tag
      ref={ref}
      className={`font-display ${className}`}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: '110%' }}
            animate={inView ? { opacity: 1, y: '0%' } : {}}
            transition={{
              duration: 0.8,
              delay: 0.06 * i,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
