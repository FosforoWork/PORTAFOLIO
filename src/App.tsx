import React, { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import { FooterMinimal } from '@/components/footer-minimal';
import { useGameStore } from '@/store/game-store';

export function App() {
  const addXp = useGameStore((state) => state.addXp);

  useEffect(() => {
    let highestScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > highestScroll) {
        const gained = Math.floor((currentScroll - highestScroll) / 4); // 1 XP for every 4px scrolled down
        if (gained > 0) {
          addXp(gained);
          highestScroll = currentScroll;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [addXp]);

  return (
    <>
      <div className="crt-overlay" />
      <div className="noise-overlay" />
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <FooterMinimal />
    </>
  );
}
