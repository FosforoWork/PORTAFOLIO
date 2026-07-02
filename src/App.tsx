import React, { Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { SkillsGrid } from '@/components/skills-grid';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import { FooterMinimal } from '@/components/footer-minimal';
import { SectionReveal } from '@/components/section-reveal';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

const Loader = React.lazy(() =>
  import('@/components/loader').then((m) => ({ default: m.Loader }))
);
const ParticleBackground = React.lazy(() =>
  import('@/components/particle-background').then((m) => ({
    default: m.ParticleBackground,
  }))
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
        <ParticleBackground />
      </Suspense>

      <div className="noise-overlay" />
      <Navbar />
      <main id="main-content" className="w-full flex flex-col items-center">
        <Hero />
        <Projects />
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><SkillsGrid /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
      </main>
      <FooterMinimal />
    </MotionConfig>
  );
}
