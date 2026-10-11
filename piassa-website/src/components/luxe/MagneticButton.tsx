'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — pulls slightly toward cursor on hover.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as: Tag = 'button',
  href,
  onClick,
  dataCursor,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  dataCursor?: 'cta' | 'hover';
}) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) * strength);
    my.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cursorAttr = dataCursor ? { 'data-cursor': dataCursor } : {};

  if (Tag === 'a') {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x, y }}
        className={className}
        {...cursorAttr}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x, y }}
      className={className}
      {...cursorAttr}
    >
      {children}
    </motion.button>
  );
}
