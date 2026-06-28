'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';
import { useGameStore } from '@/store/game-store';

interface NavLink {
  name: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { name: 'Inicio',    href: '#hero',     id: '01' },
  { name: 'Sobre mí', href: '#about',    id: '02' },
  { name: 'Proyectos',href: '#projects', id: '03' },
  { name: 'Contacto', href: '#contact',  id: '04' },
];
export function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]    = useState('hero');

  const { playSfx } = useGameStore();

  /* ── Scroll listeners ─────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Active section tracker ───────────────────────────── */
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── Mobile menu resize ───────────────────────────────── */
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHover = () => playSfx('hover');
  const handleClick = () => playSfx('click');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-surface-1)]/95 backdrop-blur-md border-b border-[var(--color-surface-4)] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center relative">

        {/* ── Logo ──────────────────────────────────────────── */}
        <a
          href="#hero"
          onClick={handleClick}
          onMouseEnter={handleHover}
          className="flex items-center gap-3 group"
          aria-label="Ir al inicio"
        >
          {/* Engineering mark */}
          <span className="relative w-7 h-7 border border-[var(--color-orange)] rounded-sm flex items-center justify-center bg-[var(--color-surface-2)] group-hover:bg-[var(--color-orange)] transition-colors duration-200">
            <span className="text-[9px] font-mono font-bold text-[var(--color-orange)] group-hover:text-white transition-colors">SA</span>
          </span>
          <span className="text-[11px] font-mono tracking-widest text-[var(--color-text-primary)] uppercase font-bold hidden sm:block">
            Samuel Aguilera
          </span>
          {/* Available status */}
          <span className="flex items-center gap-1.5 text-[8px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider hidden sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Disponible
          </span>
        </a>

        {/* ── Desktop Nav ───────────────────────────────────── */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center">
          <ul className="flex gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleClick}
                    onMouseEnter={handleHover}
                    className={`relative group flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono tracking-widest uppercase transition-all duration-200 rounded-sm ${
                      isActive
                        ? 'text-[var(--color-orange)] bg-[var(--color-orange-muted)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]'
                    }`}
                  >
                    <span className="text-[var(--color-orange)]/40 text-[8px]">{link.id}</span>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-px bg-[var(--color-orange)] rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Mobile menu toggle button ─────────────────────── */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-colors cursor-pointer"
            onClick={() => { handleClick(); setIsMobileMenuOpen(p => !p); }}
            onMouseEnter={handleHover}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────── */}
      {isMobileMenuOpen && (
        <nav id="mobile-menu" aria-label="Navegación móvil">
          <ul className="md:hidden absolute top-full left-0 right-0 bg-[var(--color-surface-1)]/98 backdrop-blur-md border-b border-[var(--color-surface-4)] py-4 px-6 flex flex-col gap-1 list-none m-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors py-2.5 border-b border-[var(--color-surface-4)] last:border-0"
                  onClick={() => { handleClick(); setIsMobileMenuOpen(false); }}
                  onMouseEnter={handleHover}
                >
                  <span className="text-[var(--color-orange)]/50">{link.id}</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
