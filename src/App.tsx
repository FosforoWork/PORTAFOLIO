import React, { Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Hero } from '@/components/hero';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

export function App() {
  useScrollTrigger();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <div className="noise-overlay" />
      <main id="main-content" className="w-full flex flex-col items-center">
        <Hero />
      </main>
    </MotionConfig>
  );
}
