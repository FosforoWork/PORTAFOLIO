import React from 'react';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { Magnetic } from './magnetic';

export function HeroMinimal() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 relative"
      aria-label="Presentación principal"
    >
      <div className="max-w-3xl animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-heading text-[var(--color-charcoal)] mb-6 leading-tight">
          Ingeniería de Procesos{' '}
          <br />
          <span className="text-[var(--color-rust)] italic">&</span> Inteligencia de Datos
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-steel)] max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Hola, soy Samuel Aguilera. Combino metodologías de optimización con modelado matemático y
          desarrollo de software para transformar datos en decisiones operativas.
        </p>

        <Magnetic>
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-rust)] transition-colors group uppercase tracking-widest border-b border-transparent hover:border-[var(--color-rust)] pb-1"
          >
            Ver proyectos
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" aria-hidden="true" />
          </Link>
        </Magnetic>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-concrete)] animate-bounce" aria-hidden="true">
        <ArrowDown size={20} />
      </div>
    </section>
  );
}
