'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * CustomCursor — a luxury two-dot cursor that morphs on hover.
 * Desktop only, hides on touch.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'cta'>('default');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });
  const trailX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.9 });
  const trailY = useSpring(y, { stiffness: 80, damping: 18, mass: 0.9 });
  const lastTouch = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    // schedule state update outside effect body to avoid cascading render
    const raf = requestAnimationFrame(() => setEnabled(true));

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest('[data-cursor="cta"]');
      const hover = target.closest('a, button, [data-cursor="hover"]');
      if (cta) setVariant('cta');
      else if (hover) setVariant('hover');
      else setVariant('default');
    };
    const onTouch = () => {
      lastTouch.current = Date.now();
      setEnabled(false);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchstart', onTouch);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onTouch);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize =
    variant === 'cta' ? 92 : variant === 'hover' ? 56 : 32;
  const dotSize = variant === 'default' ? 6 : 0;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{ mixBlendMode: 'difference' }}
    >
      <motion.div
        className="absolute rounded-full border border-luxe-gold/80 flex items-center justify-center"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: variant === 'cta' ? 1 : 0.85,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <AnimatePresence>
          {variant === 'cta' && (
            <motion.span
              key="label"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="font-accent text-[10px] text-luxe-gold uppercase tracking-[0.25em]"
            >
              Book
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute rounded-full bg-luxe-gold"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          opacity: variant === 'default' ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </div>
  );
}
