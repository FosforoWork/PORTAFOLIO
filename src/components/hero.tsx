'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import {
  Cpu, GitBranch, Layers, Github, Linkedin, Mail,
  Flame, CheckCircle, ArrowUpRight
} from 'lucide-react';



const roleChips = [
  { icon: Cpu, label: 'Ingeniería Industrial' },
  { icon: Layers, label: 'Lean Six Sigma' },
  { icon: GitBranch, label: 'Data & Automatización' },
];

const projectsData = [
  {
    title: 'Optimización de dosificado de tintas',
    description: 'Reducción del desperdicio en dosificado mediante Lean Six Sigma y modelo predictivo.',
    metrics: [
      { value: '-53.3%', label: 'SMED Setup' },
      { value: '+218.8k', label: 'Retorno (Bs/año)' },
    ],
    tags: ['Lean Six Sigma', 'Python', 'Power BI', 'Excel'],
    status: 'ACTIVE' as const,
    link: '/proyecto-en-desarrollo.html',
  },
  {
    title: 'Modelo digital fenomenológico de ISP',
    description: 'Gemelo digital de evaporación con balances termodinámicos rigurosos y optimización estocástica.',
    metrics: [
      { value: '300k', label: 'Corridas Monte Carlo' },
      { value: '-25%', label: 'Consumo Evaporación' },
    ],
    tags: ['Python', 'Monte Carlo', 'Simulacion', 'Optimización'],
    status: 'COMPLETED' as const,
    link: 'https://github.com/FosforoWork/PROCESOS_UNITARIOS---PROYECTO_MOUNTAIN',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const gmailVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  }
} as const;

const linkedinVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  }
} as const;

const githubVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  }
} as const;

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [outroVisible, setOutroVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.84) {
      setOutroVisible(true);
    } else {
      setOutroVisible(false);
    }
  });

  // ── Background strips ──
  const leftY = useTransform(scrollYProgress, [0, 0.15], ['-15%', '0%']);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const rightY = useTransform(scrollYProgress, [0.10, 0.20], ['15%', '0%']);
  const rightOpacity = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.20, 0.30], [0.92, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.85], [0, 1]);

  // ── Welcome Section ──
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const welcomeY = useTransform(scrollYProgress, [0, 0.04], [0, -50]);
  const welcomeScale = useTransform(scrollYProgress, [0, 0.04], [1, 1.1]);
  const welcomeDisplay = useTransform(scrollYProgress, (v) => v > 0.045 ? 'none' : 'flex');

  // ── Profile Section ──
  const tagOpacity = useTransform(scrollYProgress, [0.04, 0.08], [0, 1]);
  const tagY = useTransform(scrollYProgress, [0.04, 0.08], [20, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.13], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.13], [20, 0]);
  const roleOpacity = useTransform(scrollYProgress, [0.13, 0.18], [0, 1]);
  const roleY = useTransform(scrollYProgress, [0.13, 0.18], [20, 0]);
  const bioOpacity = useTransform(scrollYProgress, [0.18, 0.23], [0, 1]);
  const bioY = useTransform(scrollYProgress, [0.18, 0.23], [20, 0]);
  const linksOpacity = useTransform(scrollYProgress, [0.20, 0.24], [0, 1]);
  const linksY = useTransform(scrollYProgress, [0.20, 0.24], [20, 0]);
  const certsOpacity = useTransform(scrollYProgress, [0.24, 0.28], [0, 1]);
  const certsY = useTransform(scrollYProgress, [0.24, 0.28], [20, 0]);
  const profileOpacity = useTransform(scrollYProgress, [0.30, 0.34], [1, 0]);
  const profilePE = useTransform(scrollYProgress, [0.28, 0.34], ['auto', 'none']);
  const profileVisibility = useTransform(scrollYProgress, [0.34, 0.35], ['visible', 'hidden']);

  // ── Timeline axis progress ──
  const timelineProgress = useTransform(scrollYProgress, [0.40, 0.76], [0, 1]);

  // ── Projects Section (0.32 – 0.78) ──
  const projectsLabelOpacity = useTransform(scrollYProgress, [0.32, 0.36, 0.74, 0.78], [0, 1, 1, 0]);
  const projectsLabelX = useTransform(scrollYProgress, [0.32, 0.36], [30, 0]);
  const projectsTitleOpacity = useTransform(scrollYProgress, [0.36, 0.40, 0.74, 0.78], [0, 1, 1, 0]);
  const projectsTitleY = useTransform(scrollYProgress, [0.36, 0.40], [20, 0]);
  const projectsLabelPE = useTransform(scrollYProgress, [0.32, 0.34, 0.76, 0.78], ['none', 'auto', 'auto', 'none']);

  // Card 1: Project 1  (visible 0.40–0.54)
  const p1Opacity = useTransform(scrollYProgress, [0.40, 0.44, 0.50, 0.54], [0, 1, 1, 0]);
  const p1X = useTransform(scrollYProgress, [0.40, 0.44], [-40, 0]);
  const p1PE = useTransform(scrollYProgress, [0.40, 0.42, 0.52, 0.54], ['none', 'auto', 'auto', 'none']);

  // Card 3: Project 2  (visible 0.64–0.78)
  const p2Opacity = useTransform(scrollYProgress, [0.64, 0.68, 0.74, 0.78], [0, 1, 1, 0]);
  const p2X = useTransform(scrollYProgress, [0.64, 0.68], [-40, 0]);
  const p2PE = useTransform(scrollYProgress, [0.64, 0.66, 0.76, 0.78], ['none', 'auto', 'auto', 'none']);

  // ── Outro Section (0.78 – 1.0) ──
  const outroOpacity = useTransform(scrollYProgress, [0.78, 1], [0, 1]);
  const outroY = useTransform(scrollYProgress, [0.78, 0.86], [30, 0]);
  const outroPE = useTransform(scrollYProgress, [0.78, 0.86], ['none', 'auto']);
  const githubOpacity = useTransform(scrollYProgress, [0.80, 0.88], [0, 1]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[900vh] w-full" aria-label="Presentación Samuel Aguilera">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-surface-1)]">

        {/* ── Background ── */}
        <div className="absolute inset-0 z-0">
          {/* Base Background */}
          <img
            src="/images/Banner Industrial.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover filter saturate-90 contrast-105"
            loading="eager"
          />

          <motion.div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(0 0, 40% 0, 15% 100%, 0 100%)', y: leftY, opacity: leftOpacity }}
          >
            <img
              src="/images/Banner Industrial Samuel.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter saturate-90 contrast-105"
              loading="eager"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(85% 0, 100% 0, 100% 100%, 60% 100%)', y: rightY, opacity: rightOpacity }}
          >
            <img
              src="/images/Banner Industrial Samuel.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter saturate-90 contrast-105"
              loading="eager"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(40% 0, 85% 0, 60% 100%, 15% 100%)', scale: centerScale, opacity: centerOpacity }}
          >
            <img
              src="/images/Banner Industrial Samuel.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter saturate-90 contrast-105"
              loading="eager"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface-1)]/80 via-[var(--color-surface-1)]/50 to-[var(--color-surface-1)]/90"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
            <div className="absolute top-8 right-8 text-center">
              <div className="text-xs font-mono text-[var(--color-orange)] tracking-widest uppercase opacity-70">REV. 3.1.0</div>
              <div className="text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase opacity-50">Portafolio v2026</div>
            </div>
          </div>
        </div>

        {/* ── Timeline Axis ── */}
        <motion.div
          className="absolute left-[clamp(1rem,5vw,3rem)] top-0 bottom-0 w-px z-10 pointer-events-none"
          style={{ scaleY: timelineProgress, originY: 0, opacity: timelineProgress }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-orange)] via-[var(--color-orange)]/50 to-transparent" />
        </motion.div>

        {/* ── Foreground Content ── */}
        <div className="relative z-10 max-w-[95vw] lg:max-w-7xl mx-auto w-full flex flex-col items-center justify-center px-[4vw] h-full text-center">

          {/* ══════════ WELCOME SECTION ══════════ */}
          <motion.div 
            className="absolute inset-0 items-center justify-center pointer-events-none"
            style={{ opacity: welcomeOpacity, y: welcomeY, scale: welcomeScale, display: welcomeDisplay }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30, letterSpacing: '0px' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '15px' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="text-[clamp(2.5rem,8vh,6rem)] md:text-[clamp(4rem,10vh,8rem)] font-heading font-bold text-[var(--color-orange)] uppercase drop-shadow-2xl text-center pl-[15px]"
            >
              Bienvenido
            </motion.h1>
          </motion.div>

          {/* ══════════ PROFILE SECTION ══════════ */}
          <motion.div className="flex flex-col items-center space-y-[clamp(0.5rem,2vh,1.5rem)] w-full max-w-4xl mx-auto" style={{ opacity: profileOpacity, pointerEvents: profilePE, visibility: profileVisibility }}>
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
              {roleChips.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-[clamp(0.5rem,1.2vw,1rem)] py-[clamp(0.25rem,0.6vh,0.5rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] text-[clamp(9px,1.3vh,12px)] font-mono text-[var(--color-text-secondary)] rounded-sm tracking-wider uppercase cursor-default shadow-lg transition-colors hover:border-[var(--color-orange)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)] hover:scale-105"
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
              <a href="https://github.com/FosforoWork" target="_blank" rel="noopener noreferrer"
                className="p-[clamp(0.5rem,1.2vh,0.75rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] hover:border-[var(--color-text-secondary)] rounded-sm transition-all duration-200 group shadow-lg"
                aria-label="GitHub">
                <Github className="w-[clamp(16px,2.2vh,20px)] h-[clamp(16px,2.2vh,20px)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/samuelaguileraaraujo" target="_blank" rel="noopener noreferrer"
                className="p-[clamp(0.5rem,1.2vh,0.75rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] hover:border-[var(--color-text-secondary)] rounded-sm transition-all duration-200 group shadow-lg"
                aria-label="LinkedIn">
                <Linkedin className="w-[clamp(16px,2.2vh,20px)] h-[clamp(16px,2.2vh,20px)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-orange)] transition-colors" />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=samuelagss1@gmail.com" target="_blank" rel="noopener noreferrer"
                className="p-[clamp(0.5rem,1.2vh,0.75rem)] border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] hover:border-[var(--color-text-secondary)] rounded-sm transition-all duration-200 group shadow-lg"
                aria-label="Gmail">
                <Mail className="w-[clamp(16px,2.2vh,20px)] h-[clamp(16px,2.2vh,20px)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-orange)] transition-colors" />
              </a>
            </motion.div>

            <motion.div style={{ opacity: certsOpacity, y: certsY }} className="border-t border-[var(--color-surface-4)]/60 pt-[clamp(0.5rem,1.2vh,1rem)] mt-[clamp(0.5rem,1.2vh,1rem)] w-full max-w-md flex flex-col items-center space-y-[clamp(0.25rem,0.6vh,0.5rem)]">
              <div className="text-[clamp(9px,1.3vh,11px)] font-mono uppercase tracking-widest text-[var(--color-text-muted)] drop-shadow-md">
                Certificaciones
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.2rem,0.4vh,0.3rem)] border border-[var(--color-orange)]/40 bg-[var(--color-surface-2)] rounded-sm text-[clamp(9px,1.3vh,11px)] font-mono text-[var(--color-orange)] uppercase tracking-wide shadow-lg">
                  LSS Black Belt (Cand.)
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════ PROJECTS SECTION ══════════ */}
          {/* Label */}
          <motion.div
            className="absolute left-[clamp(3rem,8vw,5rem)] top-[clamp(6rem,15vh,10rem)] flex flex-col items-start text-left"
            style={{ opacity: projectsLabelOpacity, x: projectsLabelX, pointerEvents: projectsLabelPE }}
          >
            <span className="text-[clamp(8px,1.2vh,10px)] font-mono text-[var(--color-orange)] tracking-widest uppercase border-b border-[var(--color-orange)]/30 pb-1 mb-2">
              Casos de Estudio
            </span>
          </motion.div>

          <motion.h2
            className="absolute left-[clamp(3rem,8vw,5rem)] top-[clamp(10rem,24vh,16rem)] text-left"
            style={{ opacity: projectsTitleOpacity, y: projectsTitleY }}
          >
            <span className="text-[clamp(1.8rem,6vh,4rem)] md:text-[clamp(3rem,8vh,5rem)] font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[0.9] block">
              Hitos &
            </span>
            <span className="text-[clamp(1.8rem,6vh,4rem)] md:text-[clamp(3rem,8vh,5rem)] font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)] uppercase tracking-tighter leading-[0.9] block">
              Proyectos
            </span>
          </motion.h2>

          {/* Project 1 */}
          <motion.div
            className="absolute left-[clamp(3rem,8vw,5rem)] right-[clamp(1rem,4vw,3rem)] text-left"
            style={{ opacity: p1Opacity, x: p1X, pointerEvents: p1PE, top: 'clamp(20rem,50vh,32rem)' }}
          >
            <div className="border-l-2 border-[var(--color-orange)]/40 pl-[clamp(1rem,3vw,2rem)]">
              <div className="flex items-center gap-2 mb-2">
                {projectsData[0].status === 'ACTIVE' ? (
                  <span className="inline-flex items-center gap-1 text-[clamp(9px,1.2vh,11px)] font-mono font-bold uppercase tracking-widest text-[var(--color-orange-vivid)]">
                    <Flame className="w-[clamp(10px,1.3vh,13px)] h-[clamp(10px,1.3vh,13px)] animate-pulse" /> En Desarrollo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[clamp(9px,1.2vh,11px)] font-mono font-bold uppercase tracking-widest text-[var(--color-orange)]">
                    <CheckCircle className="w-[clamp(10px,1.3vh,13px)] h-[clamp(10px,1.3vh,13px)]" /> Completado
                  </span>
                )}
              </div>
              <h3 className="text-[clamp(1rem,3vh,1.8rem)] md:text-[clamp(1.4rem,3.5vh,2.2rem)] font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[1.05] mb-2">
                {projectsData[0].title}
              </h3>
              <p className="text-[clamp(11px,1.5vh,13px)] md:text-[clamp(12px,1.7vh,15px)] text-[var(--color-text-secondary)] leading-relaxed max-w-xl mb-3">
                {projectsData[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {projectsData[0].tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] rounded-sm text-[clamp(8px,1.2vh,10px)] font-mono text-[var(--color-text-muted)] uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-[clamp(1rem,3vw,2rem)]">
                {projectsData[0].metrics.map((m) => (
                  <div key={m.label} className="text-left">
                    <span className="text-[clamp(16px,2.5vh,24px)] font-heading font-bold text-[var(--color-orange)] tabular-nums leading-none block">{m.value}</span>
                    <span className="text-[clamp(8px,1.2vh,10px)] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{m.label}</span>
                  </div>
                ))}
              </div>
              <a href={projectsData[0].link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[clamp(10px,1.3vh,12px)] font-mono tracking-widest uppercase font-bold text-[var(--color-orange)] hover:text-[var(--color-text-primary)] transition-colors border-b border-transparent hover:border-[var(--color-orange)] pb-0.5">
                Ver Proyecto <ArrowUpRight className="w-[clamp(10px,1.3vh,13px)] h-[clamp(10px,1.3vh,13px)]" />
              </a>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            className="absolute left-[clamp(3rem,8vw,5rem)] right-[clamp(1rem,4vw,3rem)] text-left"
            style={{ opacity: p2Opacity, x: p2X, pointerEvents: p2PE, top: 'clamp(20rem,50vh,32rem)' }}
          >
            <div className="border-l-2 border-[var(--color-orange)]/40 pl-[clamp(1rem,3vw,2rem)]">
              <div className="flex items-center gap-2 mb-2">
                {projectsData[1].status === 'ACTIVE' ? (
                  <span className="inline-flex items-center gap-1 text-[clamp(9px,1.2vh,11px)] font-mono font-bold uppercase tracking-widest text-[var(--color-orange-vivid)]">
                    <Flame className="w-[clamp(10px,1.3vh,13px)] h-[clamp(10px,1.3vh,13px)] animate-pulse" /> En Desarrollo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[clamp(9px,1.2vh,11px)] font-mono font-bold uppercase tracking-widest text-[var(--color-orange)]">
                    <CheckCircle className="w-[clamp(10px,1.3vh,13px)] h-[clamp(10px,1.3vh,13px)]" /> Completado
                  </span>
                )}
              </div>
              <h3 className="text-[clamp(1rem,3vh,1.8rem)] md:text-[clamp(1.4rem,3.5vh,2.2rem)] font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[1.05] mb-2">
                {projectsData[1].title}
              </h3>
              <p className="text-[clamp(11px,1.5vh,13px)] md:text-[clamp(12px,1.7vh,15px)] text-[var(--color-text-secondary)] leading-relaxed max-w-xl mb-3">
                {projectsData[1].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {projectsData[1].tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] rounded-sm text-[clamp(8px,1.2vh,10px)] font-mono text-[var(--color-text-muted)] uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-[clamp(1rem,3vw,2rem)]">
                {projectsData[1].metrics.map((m) => (
                  <div key={m.label} className="text-left">
                    <span className="text-[clamp(16px,2.5vh,24px)] font-heading font-bold text-[var(--color-orange)] tabular-nums leading-none block">{m.value}</span>
                    <span className="text-[clamp(8px,1.2vh,10px)] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{m.label}</span>
                  </div>
                ))}
              </div>
              <a href={projectsData[1].link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[clamp(10px,1.3vh,12px)] font-mono tracking-widest uppercase font-bold text-[var(--color-orange)] hover:text-[var(--color-text-primary)] transition-colors border-b border-transparent hover:border-[var(--color-orange)] pb-0.5">
                Ver Proyecto <ArrowUpRight className="w-[clamp(10px,1.3vh,13px)] h-[clamp(10px,1.3vh,13px)]" />
              </a>
            </div>
          </motion.div>



          {/* ══════════ OUTRO ══════════ */}
          <motion.div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-[4vw] flex flex-col items-center justify-center text-center"
            style={{ opacity: outroOpacity, y: outroY, pointerEvents: outroPE }}
          >
            <div className="w-12 h-12 rounded-sm border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] flex items-center justify-center mb-6 shadow-md">
              <Mail className="w-6 h-6 text-[var(--color-orange)]" />
            </div>

            <span className="text-[10px] md:text-[11px] font-mono text-[var(--color-orange)]/90 tracking-[0.25em] uppercase mb-2 font-bold">
              Contáctame
            </span>
            <h3 className="text-xl md:text-3xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-8 leading-tight max-w-2xl">
              Construyamos el futuro de tus procesos
            </h3>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-2xl px-4"
              variants={containerVariants}
              initial="hidden"
              animate={outroVisible ? "visible" : "hidden"}
            >
              {/* Gmail */}
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=samuelagss1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-surface-1)] hover:bg-[var(--color-orange)] hover:text-[var(--color-text-primary)] border border-[var(--color-surface-4)] hover:border-[var(--color-orange)] text-xs md:text-sm font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_var(--orange-glow)]"
                variants={gmailVariants}
              >
                <Mail className="w-4 h-4 shrink-0" />
                Gmail
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/samuelaguileraaraujo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-surface-1)] hover:bg-[var(--color-orange)] hover:text-[var(--color-text-primary)] border border-[var(--color-surface-4)] hover:border-[var(--color-orange)] text-xs md:text-sm font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_var(--orange-glow)]"
                variants={linkedinVariants}
              >
                <Linkedin className="w-4 h-4 shrink-0" />
                LinkedIn
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/FosforoWork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-surface-1)] hover:bg-[var(--color-orange)] hover:text-[var(--color-text-primary)] border border-[var(--color-surface-4)] hover:border-[var(--color-orange)] text-xs md:text-sm font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_var(--orange-glow)]"
                variants={githubVariants}
              >
                <Github className="w-4 h-4 shrink-0" />
                GitHub
              </motion.a>
            </motion.div>

            {/* Integrated Minimal Footer */}
            <footer className="absolute bottom-6 left-0 right-0 w-full flex flex-col sm:flex-row justify-between items-center px-4 text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border border-[var(--color-orange)] rounded-sm flex items-center justify-center bg-[var(--color-surface-2)]">
                  <span className="text-[8px] font-bold text-[var(--color-orange)] font-sans leading-none">SA</span>
                </span>
                <span>&copy; {new Date().getFullYear()} Samuel Aguilera Araujo</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
                <span className="w-1 h-1 rounded-full bg-[var(--color-orange)] animate-pulse" />
                <span className="text-[var(--color-orange)]/80 font-bold">Disponible para proyectos</span>
              </div>
            </footer>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
