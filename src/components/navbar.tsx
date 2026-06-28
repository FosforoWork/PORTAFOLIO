'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { name: 'INICIO', href: '#hero' },
  { name: 'NPC BIO', href: '#about' },
  { name: 'QUESTS', href: '#projects' },
  { name: 'SAVE', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Game global state
  const { 
    soundEnabled, 
    reducedMotion, 
    xp, 
    maxXp, 
    level, 
    toggleSound, 
    toggleMotion,
    playSfx 
  } = useGameStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Play hover sound
  const handleHover = () => {
    playSfx('hover');
  };

  // Play click sound
  const handleClick = () => {
    playSfx('click');
  };

  const xpPercent = Math.min((xp / maxXp) * 100, 100);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#1e1b18]/90 backdrop-blur-md border-[var(--color-concrete)]/60 py-2'
          : 'bg-[#1A1613]/40 border-transparent py-4'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center relative">
        {/* HUD Logo */}
        <a 
          href="#hero" 
          onClick={handleClick}
          onMouseEnter={handleHover}
          className="text-xs font-hud tracking-tighter text-[var(--color-rust)] flex items-center gap-1 hover:brightness-125 transition-all" 
          aria-label="Ir al inicio"
        >
          <span>SA.EXE</span>
          <span className="animate-ping w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        </a>

        {/* Desktop Nav HUD */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  className="text-xs font-hud text-[var(--color-charcoal)]/80 hover:text-[var(--color-rust)] transition-colors relative group py-1"
                >
                  [{link.name}]
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Status Indicators & Controls */}
        <div className="flex items-center gap-4">
          {/* Level Badge */}
          <div className="flex items-center gap-1.5 bg-[#26201B] border border-[var(--color-concrete)] px-2 py-0.5 rounded text-[10px] font-hud text-[var(--color-accentGold)] select-none">
            <span>LV</span>
            <span className="font-bold">{level}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
            }}
            onMouseEnter={handleHover}
            className={`p-1.5 rounded border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-950/40 border-emerald-700 text-emerald-400 hover:bg-emerald-900/60'
                : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:bg-zinc-800'
            }`}
            aria-label={soundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido'}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Motion Toggle */}
          <button
            onClick={() => {
              handleClick();
              toggleMotion();
            }}
            onMouseEnter={handleHover}
            className={`p-1.5 rounded border transition-all cursor-pointer ${
              !reducedMotion
                ? 'bg-amber-950/40 border-amber-700 text-amber-400 hover:bg-amber-900/60'
                : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:bg-zinc-800'
            }`}
            aria-label={!reducedMotion ? 'Activar movimiento reducido' : 'Desactivar movimiento reducido'}
          >
            {!reducedMotion ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-[var(--color-charcoal)] p-1 cursor-pointer"
            onClick={() => {
              handleClick();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            onMouseEnter={handleHover}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <nav id="mobile-menu" aria-label="Navegación móvil">
          <ul className="md:hidden absolute top-full left-0 right-0 bg-[#1e1b18] border-b border-[var(--color-concrete)] py-4 px-6 flex flex-col gap-4 shadow-lg list-none m-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-hud text-[var(--color-charcoal)] hover:text-[var(--color-rust)] transition-colors block py-1.5"
                  onClick={() => {
                    handleClick();
                    setIsMobileMenuOpen(false);
                  }}
                  onMouseEnter={handleHover}
                >
                  [{link.name}]
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Experience HUD Bar (Scrolling indicator) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#26201B] border-t border-[var(--color-concrete)]/20 overflow-hidden">
        <div 
          className="h-full bg-emerald-500 transition-all duration-100 ease-out" 
          style={{ width: `${xpPercent}%` }}
        />
      </div>
    </header>
  );
}
