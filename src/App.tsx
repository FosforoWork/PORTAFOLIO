import React, { Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { SkillsGrid } from '@/components/skills-grid';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import { FooterMinimal } from '@/components/footer-minimal';
import { SectionReveal } from '@/components/section-reveal';
import { Ambient3DBackground } from '@/components/ambient-3d-background';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

const Loader = React.lazy(() =>
  import('@/components/loader').then((m) => ({ default: m.Loader }))
);

export function App() {
  useScrollTrigger();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Suspense fallback={null}>
        <Loader />
      </Suspense>

      <div className="noise-overlay" />
      <Ambient3DBackground />
      <main id="main-content" className="w-full flex flex-col items-center">
        <Hero />
        <Projects />
        <SectionReveal index={0}><About /></SectionReveal>
        <SectionReveal index={1}><SkillsGrid /></SectionReveal>
        <SectionReveal index={2}><Contact /></SectionReveal>
      </main>
      <FooterMinimal />
    </MotionConfig>
  );
}
