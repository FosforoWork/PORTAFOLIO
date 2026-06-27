'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contacto', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Framer Motion Scroll Progress for Reading Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-oatmeal)]/80 backdrop-blur-md border-b border-[var(--color-concrete)]/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center relative">
        <Link href="#hero" className="text-xl font-heading font-bold text-[var(--color-charcoal)]" aria-label="Ir al inicio">
          SA.
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Navegación principal">
          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-charcoal)]/80 hover:text-[var(--color-rust)] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-rust)] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-[var(--color-charcoal)] p-1"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <nav id="mobile-menu" aria-label="Navegación móvil">
          <ul className="md:hidden absolute top-full left-0 right-0 bg-[var(--color-oatmeal)] border-b border-[var(--color-concrete)] py-4 px-6 flex flex-col gap-4 shadow-lg list-none m-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-lg font-medium text-[var(--color-charcoal)] hover:text-[var(--color-rust)] transition-colors block py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Reading Progress Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-rust)] origin-[0%]"
        style={{ scaleX }}
      />
    </header>
  );
}
