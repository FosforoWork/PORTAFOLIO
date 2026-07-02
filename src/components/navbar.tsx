'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, ArrowUp } from 'lucide-react';
import { usePreferences } from '@/store/preferences-store';
import { getLenis } from './lenis-provider';

interface NavLink {
  name: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { name: 'Inicio',    href: '#hero',     id: '01' },
  { name: 'Proyectos', href: '#projects', id: '02' },
  { name: 'Sobre mí',  href: '#about',    id: '03' },
  { name: 'Skills',    href: '#skills',   id: '04' },
  { name: 'Contacto',  href: '#contact',  id: '05' },
];

function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

export function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]  = useState('hero');
  const [scrollProgress, setScrollProgress]  = useState(0);
  const [showScrollTop, setShowScrollTop]  = useState(false);

  const { soundEnabled, toggleSound } = usePreferences();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollTop = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollTop);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'projects', 'about', 'skills', 'contact'];
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

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress-bar"
        style={{ '--scroll-progress': `${scrollProgress * 100}%` } as React.CSSProperties}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--color-surface-1)]/90 backdrop-blur-xl border-b border-[var(--color-surface-4)] py-2'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center relative">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Ir al inicio"
          >
            <span className="relative w-7 h-7 border border-[var(--color-orange)] rounded-sm flex items-center justify-center bg-[var(--color-surface-2)] group-hover:bg-[var(--color-orange)] transition-all duration-300">
              <span className="text-xs font-mono font-bold text-[var(--color-orange)] group-hover:text-white transition-colors duration-300">SA</span>
            </span>
            <span className="text-xs font-mono tracking-widest text-[var(--color-text-primary)] uppercase font-bold hidden sm:block">
              Samuel Aguilera
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider hidden sm:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Disponible
            </span>
          </button>

          {/* ── Desktop Nav ── */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center">
            <ul className="flex gap-1 list-none m-0 p-0">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className={`relative group flex items-center gap-1.5 px-3 py-2 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                        isActive
                          ? 'text-[var(--color-orange)] bg-[var(--color-orange-muted)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]'
                      }`}
                    >
                      <span className="text-[var(--color-orange)]/40 text-xs">{link.id}</span>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-2 right-2 h-px bg-[var(--color-orange)] rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-1.5 border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 backdrop-blur-sm rounded-sm text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] hover:border-[var(--color-orange)] transition-all duration-200 cursor-pointer uppercase select-none active:scale-[0.98]"
              title={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
              aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
            >
              {soundEnabled ? <Volume2 size={13} className="text-[var(--color-orange)]" /> : <VolumeX size={13} />}
            </button>

            <button
              className="md:hidden p-1.5 border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 backdrop-blur-sm rounded-sm text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
              onClick={() => setIsMobileMenuOpen(p => !p)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? <X size={13} /> : <Menu size={13} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className={`md:hidden absolute top-full left-0 right-0 bg-[var(--color-surface-1)]/98 backdrop-blur-xl border-b border-[var(--color-surface-4)] py-4 px-6 flex flex-col gap-1 overflow-hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection(link.href);
              }}
              className="w-full text-left flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors py-2.5 border-b border-[var(--color-surface-4)] last:border-0 cursor-pointer"
            >
              <span className="text-[var(--color-orange)]/50">{link.id}</span>
              {link.name}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Scroll to top button ── */}
      <button
        onClick={() => scrollToSection('#hero')}
        className={`fixed bottom-8 right-8 z-40 p-3 border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/80 backdrop-blur-md rounded-sm text-[var(--color-orange)] hover:bg-[var(--color-orange)] hover:text-white transition-all duration-200 cursor-pointer ${
          showScrollTop ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
        }`}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="size-4" />
      </button>
    </>
  );
}
