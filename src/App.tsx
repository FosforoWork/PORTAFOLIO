import React from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { SkillsGrid } from '@/components/skills-grid';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import { FooterMinimal } from '@/components/footer-minimal';

export function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <About />
        <SkillsGrid />
        <Projects />
        <Contact />
      </main>
      <FooterMinimal />
    </>
  );
}
