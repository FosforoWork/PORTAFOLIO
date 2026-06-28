'use client';

import React from 'react';
import { ArrowDown, Cpu, GitBranch, Layers } from 'lucide-react';
import { useGameStore } from '@/store/game-store';

export function Hero() {
  const { playSfx } = useGameStore();

  const handleClick = () => playSfx('click');
  const handleHover = () => playSfx('hover');

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--color-surface-1)] py-20 md:py-32"
      aria-label="Presentación Samuel Aguilera"
    >
      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative engineering annotations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top-left corner crosshair */}
        <svg className="absolute top-8 left-8 w-12 h-12 opacity-20" viewBox="0 0 48 48" fill="none">
          <line x1="24" y1="0" x2="24" y2="48" stroke="#E8500A" strokeWidth="1" />
          <line x1="0" y1="24" x2="48" y2="24" stroke="#E8500A" strokeWidth="1" />
          <circle cx="24" cy="24" r="5" stroke="#E8500A" strokeWidth="1" fill="none" />
        </svg>
        {/* Top right annotation */}
        <div className="absolute top-8 right-8 text-right">
          <div className="text-[9px] font-mono text-[var(--color-text-muted)] tracking-widest uppercase opacity-50">REV. 3.1.0</div>
          <div className="text-[9px] font-mono text-[var(--color-text-muted)] tracking-widest uppercase opacity-50">Portafolio v2026</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-6 relative z-10">
        
        {/* ── Left Column: Content Panel ── */}
        <div className="md:col-span-7 flex flex-col justify-center text-left space-y-6">
          {/* Status tag line */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] animate-pulse inline-block" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-orange)] font-bold">
              Perfil Profesional
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-muted)]">
              / Samuel Aguilera
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-[var(--color-text-primary)] leading-none tracking-tight">
            Samuel
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
              Aguilera
            </span>
          </h1>

          {/* Role / discipline tags */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Cpu, label: 'Ingeniería Industrial' },
              { icon: Layers, label: 'Lean Six Sigma' },
              { icon: GitBranch, label: 'Data & Automatización' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 backdrop-blur-sm text-[10px] font-mono text-[var(--color-text-secondary)] rounded-sm tracking-wider uppercase"
              >
                <Icon className="w-3.5 h-3.5 text-[var(--color-orange)] shrink-0" />
                {label}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm md:text-base text-[var(--color-text-secondary)] font-normal leading-relaxed max-w-lg">
            Estudiante de 3er año en la UCB &quot;San Pablo&quot;. Combino rigor de{' '}
            <strong className="text-[var(--color-text-primary)] font-semibold">mejora continua</strong> con{' '}
            <strong className="text-[var(--color-text-primary)] font-semibold">ciencia de datos</strong>{' '}
            (SQL, Python, Power BI) para optimizar procesos y automatizar decisiones operativas.
          </p>

          {/* Certificaciones - compact row */}
          <div className="border-l-2 border-[var(--color-orange)]/30 pl-4 space-y-1">
            <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
              Certificaciones & Hitos
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {['Nestlé IDEAS', 'Nestlé PMI', 'LSS White Belt', 'Fund. Proyectos'].map(cert => (
                <span key={cert} className="text-[11px] font-mono text-[var(--color-text-secondary)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] inline-block shrink-0" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <a
              href="#projects"
              onClick={handleClick}
              onMouseEnter={handleHover}
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-orange)] hover:bg-[var(--color-orange-vivid)] text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 hover:shadow-[0_0_24px_rgba(232,80,10,0.35)] active:scale-[0.98]"
            >
              Ver Hitos & Proyectos
              <ArrowDown
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* ── Right Column: Portrait Image Container ── */}
        <div className="md:col-span-5 flex justify-center items-center w-full">
          <div className="relative w-full aspect-[4/5] max-w-sm rounded-sm border border-[var(--color-surface-4)] overflow-hidden bg-gradient-to-b from-white to-zinc-200 shadow-xl group">
            {/* The actual image */}
            <img
              src="/images/LSSBB CEO PMO Samuel Aguilera.png"
              alt="Samuel Aguilera"
              className="w-full h-full object-cover object-top filter saturate-95 contrast-[1.02] mix-blend-multiply opacity-95 transition-all duration-300 group-hover:scale-[1.02]"
              loading="eager"
            />
            {/* Extremely subtle bottom fade to integrate into layout edge */}
            <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-gradient-to-t from-[var(--color-surface-1)]/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[9px] font-mono text-[var(--color-text-muted)] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--color-orange)] to-transparent" />
      </div>
    </section>
  );
}
