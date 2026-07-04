'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, GitBranch, Layers, Github, Linkedin, Mail } from 'lucide-react';
import { HeroSvgBackground } from './hero-svg-background';

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // El offset mide el progreso desde que el Hero está en la parte superior ('start start')
    // hasta que el fondo del contenedor largo de 350vh toca el fondo del viewport ('end end')
    offset: ['start start', 'end end'],
  });

  // Background stripes
  const leftY = useTransform(scrollYProgress, [0, 0.2], ['-15%', '0%']);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const rightY = useTransform(scrollYProgress, [0.15, 0.35], ['15%', '0%']);
  const rightOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

  const centerScale = useTransform(scrollYProgress, [0.3, 0.5], [0.92, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Dark overlay (entra para facilitar la lectura del texto)
  const overlayOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

  // Foreground text items
  const tagOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const tagY = useTransform(scrollYProgress, [0.55, 0.65], [20, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.6, 0.7], [20, 0]);

  const roleOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const roleY = useTransform(scrollYProgress, [0.65, 0.75], [20, 0]);

  const bioOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const bioY = useTransform(scrollYProgress, [0.7, 0.8], [20, 0]);

  const linksOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const linksY = useTransform(scrollYProgress, [0.75, 0.85], [20, 0]);

  const certsOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const certsY = useTransform(scrollYProgress, [0.8, 0.9], [20, 0]);

  // Scroll Indicator se desvanece al empezar a scrollear
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[450vh] w-full" aria-label="Presentación Samuel Aguilera">
      {/* ── Contenedor Pegajoso (Sticky) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-surface-1)]">
        
        {/* ── Background: Animado por Scroll ── */}
        <div className="absolute inset-0 z-0">
          {/* Franja Izquierda */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(0 0, 40% 0, 15% 100%, 0 100%)', y: leftY, opacity: leftOpacity }}
          >
            <img
              src="/images/Banner Industrial Samuel.png"
              alt="Hero Background Left"
              className="w-full h-full object-cover filter saturate-90 contrast-105"
              loading="eager"
            />
          </motion.div>

          {/* Franja Derecha */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(85% 0, 100% 0, 100% 100%, 60% 100%)', y: rightY, opacity: rightOpacity }}
          >
            <img
              src="/images/Banner Industrial Samuel.png"
              alt="Hero Background Right"
              className="w-full h-full object-cover filter saturate-90 contrast-105"
              loading="eager"
            />
          </motion.div>

          {/* Franja Central */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(40% 0, 85% 0, 60% 100%, 15% 100%)', scale: centerScale, opacity: centerOpacity }}
          >
            <img
              src="/images/Banner Industrial Samuel.png"
              alt="Hero Background Center"
              className="w-full h-full object-cover filter saturate-90 contrast-105"
              loading="eager"
            />
          </motion.div>

          {/* Dark overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface-1)]/80 via-[var(--color-surface-1)]/50 to-[var(--color-surface-1)]/90"
            style={{ opacity: overlayOpacity }}
          />

          {/* Decorative engineering annotations */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
            <HeroSvgBackground />
            <div className="absolute top-8 right-8 text-center">
              <div className="text-xs font-mono text-[var(--color-orange)] tracking-widest uppercase opacity-70">REV. 3.1.0</div>
              <div className="text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase opacity-50">Portafolio v2026</div>
            </div>
          </div>
        </div>

        {/* ── Contenido de Primer Plano ── */}
        <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center px-[4vw] h-full text-center space-y-[clamp(0.5rem,2vh,1.5rem)] pt-[clamp(1rem,4vh,3rem)]">
          
          <motion.div style={{ opacity: tagOpacity, y: tagY }}>
            <div className="flex items-center gap-[clamp(0.25rem,1vw,0.75rem)] justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] animate-pulse inline-block" />
              <span className="text-[clamp(10px,1.4vh,12px)] font-mono tracking-widest uppercase text-[var(--color-orange)] font-bold drop-shadow-md">
                Perfil Profesional
              </span>
              <span className="text-[clamp(10px,1.4vh,12px)] font-mono tracking-widest uppercase text-[var(--color-text-secondary)] drop-shadow-md">
                / Samuel Aguilera
              </span>
            </div>
          </motion.div>

          <motion.h1 style={{ opacity: titleOpacity, y: titleY }} className="text-[clamp(2.4rem,8.5vh,5.8rem)] md:text-[clamp(4.5rem,11vh,7.5rem)] font-heading font-bold text-[var(--color-text-primary)] leading-none tracking-tight text-center w-full drop-shadow-xl flex flex-col gap-[clamp(0.25rem,1vh,0.5rem)]">
            <span>Samuel</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)]">Aguilera</span>
          </motion.h1>

          <motion.div style={{ opacity: roleOpacity, y: roleY }} className="flex flex-wrap gap-[clamp(0.25rem,1vh,0.5rem)] justify-center">
            {[
              { icon: Cpu, label: 'Ingeniería Industrial' },
              { icon: Layers, label: 'Lean Six Sigma' },
              { icon: GitBranch, label: 'Data & Automatización' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-[clamp(0.5rem,1.2vw,1rem)] py-[clamp(0.25rem,0.6vh,0.5rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 backdrop-blur-md text-[clamp(9px,1.3vh,12px)] font-mono text-[var(--color-text-secondary)] rounded-sm tracking-wider uppercase cursor-default shadow-lg transition-colors hover:border-[var(--color-orange)] hover:bg-[rgba(249,115,22,0.1)] hover:text-[var(--color-text-primary)] hover:scale-105"
              >
                <Icon className="w-[clamp(12px,1.6vh,15px)] h-[clamp(12px,1.6vh,15px)] text-[var(--color-orange)] shrink-0" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div style={{ opacity: bioOpacity, y: bioY }}>
            <p className="text-[clamp(11px,1.6vh,14px)] md:text-[clamp(14px,1.8vh,17px)] text-[var(--color-text-secondary)] font-normal leading-relaxed max-w-2xl mx-auto text-center drop-shadow-md">
              Estudiante de 3er año en la UCB &quot;San Pablo&quot;. Combino rigor de{' '}
              <strong className="text-[var(--color-text-primary)] font-semibold">Mejora Continua</strong> con{' '}
              <strong className="text-[var(--color-text-primary)] font-semibold">Análisis de Datos</strong>{' '}
              (SQL, Python, Power BI) para optimizar procesos y automatizar decisiones operativas.
            </p>
          </motion.div>

          <motion.div style={{ opacity: linksOpacity, y: linksY }} className="flex items-center gap-[clamp(0.5rem,1.5vw,1rem)] justify-center mt-[clamp(0.25rem,1vh,1rem)]">
            <a
              href="https://github.com/FosforoWork"
              target="_blank"
              rel="noopener noreferrer"
              className="p-[clamp(0.5rem,1.2vh,0.75rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 hover:bg-[var(--color-surface-3)] hover:border-[var(--color-text-secondary)]/60 backdrop-blur-md rounded-sm transition-all duration-200 group shadow-lg"
              aria-label="GitHub"
            >
              <Github className="w-[clamp(16px,2.2vh,20px)] h-[clamp(16px,2.2vh,20px)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/samuelaguileraaraujo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-[clamp(0.5rem,1.2vh,0.75rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 hover:bg-[var(--color-surface-3)] hover:border-sky-500/60 backdrop-blur-md rounded-sm transition-all duration-200 group shadow-lg"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-[clamp(16px,2.2vh,20px)] h-[clamp(16px,2.2vh,20px)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-orange)] transition-colors" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=samuelagss1@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-[clamp(0.5rem,1.2vh,0.75rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/60 hover:bg-[var(--color-surface-3)] hover:border-sky-500/60 backdrop-blur-md rounded-sm transition-all duration-200 group shadow-lg"
              aria-label="Gmail"
            >
              <Mail className="w-[clamp(16px,2.2vh,20px)] h-[clamp(16px,2.2vh,20px)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-orange)] transition-colors" />
            </a>
          </motion.div>

          <motion.div style={{ opacity: certsOpacity, y: certsY }} className="border-t border-[var(--color-surface-4)]/60 pt-[clamp(0.5rem,1.2vh,1rem)] mt-[clamp(0.5rem,1.2vh,1rem)] w-full max-w-md flex flex-col items-center space-y-[clamp(0.25rem,0.6vh,0.5rem)]">
            <div className="text-[clamp(9px,1.3vh,11px)] font-mono uppercase tracking-widest text-[var(--color-text-muted)] drop-shadow-md">
              Certificaciones
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['LSS Black Belt (Cand.)'].map((cert) => (
                <span
                  key={cert}
                  className="px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.2rem,0.4vh,0.3rem)] border border-[var(--color-orange)]/40 bg-[var(--color-orange)]/10 backdrop-blur-sm rounded-sm text-[clamp(9px,1.3vh,11px)] font-mono text-[var(--color-orange)] uppercase tracking-wide shadow-lg"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-xs font-mono text-[var(--color-orange)] tracking-widest uppercase drop-shadow-md font-bold">Inicia Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--color-orange)] to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
