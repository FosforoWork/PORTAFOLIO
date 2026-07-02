'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return globalLenisInstance;
}

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;

    let rafId: number;
    const updateRaf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(updateRaf);
    };

    rafId = requestAnimationFrame(updateRaf);

    return () => {
      cancelAnimationFrame(rafId);
      globalLenisInstance = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
