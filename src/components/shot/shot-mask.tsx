'use client';

import { useEffect, useRef, useState } from 'react';

export const ShotMask = () => {
  const [opacity, setOpacity] = useState(1);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Calculate opacity based on intersection ratio (how much is visible)
          // The more visible the element is, the lower the mask opacity
          // We want the mask to be fully opaque (1) when not visible, and transparent (0) when fully visible
          setOpacity(Math.max(1 - entry.intersectionRatio * 1.5, 0.5));
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: Array.from({ length: 20 }, (_, i) => i / 20), // Create thresholds from 0 to 1 in 0.05 increments
      }
    );

    if (maskRef.current) {
      observer.observe(maskRef.current?.parentElement || maskRef.current);
    }

    return () => {
      if (maskRef.current) {
        observer.unobserve(maskRef.current?.parentElement || maskRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={maskRef}
      className="bg-background-inverted pointer-events-none absolute inset-0 transition"
      style={{
        opacity,
      }}
    />
  );
};
