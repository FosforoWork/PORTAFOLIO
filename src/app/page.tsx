import React from 'react';
import { Navbar } from '@/components/navbar';
import { HeroMinimal } from '@/components/hero-minimal';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { SkillsOrbit } from '@/components/skills-orbit';
import { Contact } from '@/components/contact';
import { FooterMinimal } from '@/components/footer-minimal';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <HeroMinimal />
        <About />
        <Projects />
        <SkillsOrbit />
        <Contact />
      </main>
      <FooterMinimal />
    </>
  );
}
