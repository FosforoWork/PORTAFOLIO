'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Cpu, GitBranch, Layers, FileText } from 'lucide-react';

function WordReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const words = children.split(' ');
  return (
    <span className="inline">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 8, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function StaggerItem({
  children,
  delay,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  as?: 'div' | 'p' | 'span';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
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
        <svg className="absolute top-8 left-8 w-12 h-12 opacity-20" viewBox="0 0 48 48" fill="none">
          <line x1="24" y1="0" x2="24" y2="48" stroke="var(--color-orange)" strokeWidth="1" />
          <line x1="0" y1="24" x2="48" y2="24" stroke="var(--color-orange)" strokeWidth="1" />
          <circle cx="24" cy="24" r="5" stroke="var(--color-orange)" strokeWidth="1" fill="none" />
        </svg>
        <div className="absolute top-8 right-8 text-right">
          <div className="text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase opacity-50">REV. 3.1.0</div>
          <div className="text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase opacity-50">Portafolio v2026</div>
        </div>
      </div>

      {/* Ambient glow behind hero content */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(142,202,154,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-6 relative z-10">
        {/* ── Left Column ── */}
        <motion.div className="md:col-span-7 flex flex-col justify-center text-left space-y-6" style={{ opacity }}>
          {/* Status tag line */}
          <StaggerItem delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] animate-pulse inline-block" />
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-orange)] font-bold">
                Perfil Profesional
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-text-muted)]">
                / Samuel Aguilera
              </span>
            </div>
          </StaggerItem>

          {/* Main heading - word by word */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-[var(--color-text-primary)] leading-none tracking-tight overflow-hidden">
            <div className="mb-2">
              <WordReveal delay={0.3}>Samuel</WordReveal>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
              <WordReveal delay={0.5}>Aguilera</WordReveal>
            </span>
          </h1>

          {/* Role tags */}
          <StaggerItem delay={0.7}>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Cpu, label: 'Ingeniería Industrial' },
                { icon: Layers, label: 'Lean Six Sigma' },
                { icon: GitBranch, label: 'Data & Automatización' },
              ].map(({ icon: Icon, label }) => (
                <motion.span
                  key={label}
                  whileHover={{ scale: 1.02, borderColor: 'var(--color-orange)' }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 backdrop-blur-sm text-xs font-mono text-[var(--color-text-secondary)] rounded-sm tracking-wider uppercase cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-[var(--color-orange)] shrink-0" />
                  {label}
                </motion.span>
              ))}
            </div>
          </StaggerItem>

          {/* Bio */}
          <StaggerItem delay={0.85}>
            <p className="text-sm md:text-base text-[var(--color-text-secondary)] font-normal leading-relaxed max-w-lg">
              Estudiante de 3er año en la UCB &quot;San Pablo&quot;. Combino rigor de{' '}
              <strong className="text-[var(--color-text-primary)] font-semibold">mejora continua</strong> con{' '}
              <strong className="text-[var(--color-text-primary)] font-semibold">ciencia de datos</strong>{' '}
              (SQL, Python, Power BI) para optimizar procesos y automatizar decisiones operativas.
            </p>
          </StaggerItem>

          {/* Certifications */}
          <StaggerItem delay={1.0}>
            <div className="border-l-2 border-[var(--color-orange)]/30 pl-4 space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                Certificaciones & Hitos
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {['Nestlé IDEAS', 'Nestlé PMI', 'LSS White Belt', 'Fund. Proyectos'].map((cert, i) => (
                  <motion.span
                    key={cert}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs font-mono text-[var(--color-text-secondary)] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] inline-block shrink-0" />
                    {cert}
                  </motion.span>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* CTAs */}
          <StaggerItem delay={1.2}>
            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-orange)] hover:bg-[var(--color-orange-vivid)] text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(142,202,154,0.3)] active:scale-[0.98]"
                >
                  Ver Hitos & Proyectos
                  <ArrowDown
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="/CV_Samuel_Aguilera.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/80 hover:bg-[var(--color-surface-2)] text-[var(--color-text-primary)] text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 hover:border-[var(--color-orange)]/60 hover:shadow-[0_0_20px_rgba(142,202,154,0.08)] active:scale-[0.98]"
                >
                  <FileText className="w-3.5 h-3.5 text-[var(--color-orange)]" aria-hidden="true" />
                  Descargar CV
                </a>
              </motion.div>
            </div>
          </StaggerItem>
        </motion.div>

        {/* ── Right Column: Portrait ── */}
        <motion.div
          className="md:col-span-5 flex justify-center items-center w-full"
          style={{ y: imageY, scale: imageScale }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="relative aspect-[9/12] w-full max-w-md rounded-lg overflow-hidden border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] p-1 shadow-xl group">
            <motion.img
              src="/images/LSSBB CEO PMO Samuel Aguilera.png"
              alt="LSSBB CEO PMO Samuel Aguilera"
              className="w-full h-full object-cover rounded-md filter saturate-90 contrast-105 transition-all duration-500 group-hover:scale-[1.03] group-hover:saturate-100"
              loading="eager"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />
            {/* Image border glow on hover */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 40px rgba(142,202,154,0.08)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[var(--color-orange)] to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
