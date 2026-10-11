'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * SmartImage — drop-in for <img> using next/image with:
 * - blur-up placeholder
 * - shimmer skeleton while loading
 * - automatic AVIF/WebP via Next.js image optimization
 * - fetchPriority support for above-the-fold critical images
 *
 * Container must have position: relative + explicit size (the parent
 * already handles this in all our usages).
 */
type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  imgClassName?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
};

export default function SmartImage({
  src,
  alt,
  priority,
  className = '',
  sizes = '100vw',
  imgClassName = '',
  fetchPriority,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 shimmer bg-luxe-aubergine" aria-hidden />}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        fetchPriority={fetchPriority}
        className={`object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
