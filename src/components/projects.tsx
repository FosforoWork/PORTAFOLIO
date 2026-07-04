import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Flame, Github, Compass, Clock } from 'lucide-react';
import { TiltCard } from './tilt-card';

interface ProjectMetric {
  value: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
  metrics: ProjectMetric[];
  tags: string[];
  time: string;
  link: string;
  linkLabel: string;
  status: 'COMPLETED' | 'ACTIVE';
}

const projectsData: Project[] = [
  {
    title: 'Optimización de dosificado de tintas',
    description: 'Reducción del desperdicio en dosificado mediante Lean Six Sigma y modelo predictivo.',
    metrics: [
      { value: '-53.3%', label: 'SMED Setup' },
      { value: '+218.8k', label: 'Retorno (Bs/año)' },
    ],
    tags: ['Lean Six Sigma', 'Python'],
    time: '2025',
    link: '/proyecto-en-desarrollo.html',
    linkLabel: 'Ver Estado',
    status: 'ACTIVE',
  },
  {
    title: 'Modelo digital fenomenológico de ISP',
    description: 'Gemelo digital de evaporación con balances termodinámicos rigurosos y optimización estocástica.',
    metrics: [
      { value: '300k', label: 'Corridas Monte Carlo' },
      { value: '-25%', label: 'Consumo Evaporación' },
    ],
    tags: ['Python', 'Monte Carlo', 'ASME BPE'],
    time: '2026',
    link: 'https://github.com/samuelthecreat/PROCESOS_UNITARIOS---PROYECTO_MOUNTAIN',
    linkLabel: 'Repositorio',
    status: 'COMPLETED',
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalRange = rect.height + viewportHeight;
      const currentScroll = viewportHeight - rect.top;
      let progress = currentScroll / totalRange;
      progress = Math.max(0, Math.min(1, progress));
      scrollYProgress.set(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollYProgress]);

  // ── 4-card stack: Intro → P1 → P2 → Outro ──────────────────────────
  // Total scroll space divided into 4 segments of ~25% each.
  // Each card fades to 0 before the next one peaks at full opacity.

  // Card 0: Intro/Header  (exits around 25%)
  const y0      = useTransform(scrollYProgress, [0, 0.25],           ['0px', '-40px']);
  const scale0  = useTransform(scrollYProgress, [0.15, 0.25],        [1, 0.92]);
  const opacity0 = useTransform(scrollYProgress, [0.15, 0.25],       [1, 0]);
  const pointerEvents0 = useTransform(scrollYProgress, [0.15, 0.25], ['auto', 'none']);

  // Card 1: Project 1  (enters 20%, exits 50%)
  const y1      = useTransform(scrollYProgress, [0.15, 0.35, 0.48], ['95vh', '0px', '-40px']);
  const scale1  = useTransform(scrollYProgress, [0.40, 0.50],       [1, 0.92]);
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.35, 0.42, 0.50], [0, 1, 1, 0]);
  const pointerEvents1 = useTransform(scrollYProgress, [0.15, 0.18, 0.42, 0.50], ['none', 'auto', 'auto', 'none']);

  // Card 2: Project 2  (enters 45%, exits 75%)
  const y2      = useTransform(scrollYProgress, [0.40, 0.60, 0.73], ['95vh', '0px', '-40px']);
  const scale2  = useTransform(scrollYProgress, [0.65, 0.75],       [1, 0.92]);
  const opacity2 = useTransform(scrollYProgress, [0.40, 0.60, 0.67, 0.75], [0, 1, 1, 0]);
  const pointerEvents2 = useTransform(scrollYProgress, [0.40, 0.43, 0.67, 0.75], ['none', 'auto', 'auto', 'none']);

  // Card 3: Outro finalizer  (enters 70%, stays)
  const y3      = useTransform(scrollYProgress, [0.68, 0.88],  ['95vh', '0px']);
  const opacity3 = useTransform(scrollYProgress, [0.68, 0.88], [0, 1]);
  const pointerEvents3 = useTransform(scrollYProgress, [0.68, 0.72], ['none', 'auto']);

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-transparent">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">

        {/* Stack Wrapper */}
        <div className="relative w-[88vw] md:w-[70vw] h-[65vh] md:h-[68vh] flex items-center justify-center">
          
          {/* ── Card 0: Section Intro ── */}
          <motion.div 
            style={{ y: y0, scale: scale0, opacity: opacity0, pointerEvents: pointerEvents0 }} 
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center p-8 md:p-14 pro-card rounded-sm corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <span className="text-[10px] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mb-6 mx-auto">
              Casos de Estudio
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[0.9] mb-8 text-center">
              Hitos &<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                Proyectos
              </span>
            </h2>
            <div className="flex items-center gap-2 justify-center text-xs font-mono text-[var(--color-text-muted)] animate-pulse">
              <Compass className="w-4 h-4 text-[var(--color-orange)]" />
              <span>SCROLL PARA EXPLORAR</span>
            </div>
          </motion.div>

          {/* ── Card 1: Project 1 (Tintas) ── */}
          <motion.div 
            style={{ y: y1, scale: scale1, opacity: opacity1, pointerEvents: pointerEvents1 }}
            className="absolute inset-0 w-full h-full"
          >
            <TiltCard className="h-full w-full">
              <div className="relative h-full w-full pro-card rounded-sm p-8 md:p-14 overflow-hidden flex flex-col items-center text-center justify-between corner-l group">
                <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
                <span className="absolute top-6 right-8 text-7xl md:text-9xl font-heading font-bold text-[var(--color-surface-4)]/10 select-none leading-none pointer-events-none">01</span>

                <div className="flex flex-col items-center justify-center flex-1 relative z-10 mt-6">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[1.05] mb-6 text-center">
                    {projectsData[0].title}
                  </h3>
                  <p className="text-base md:text-2xl text-[var(--color-text-secondary)] font-sans max-w-4xl mb-8 leading-relaxed text-center">
                    {projectsData[0].description}
                  </p>
                  <div className="flex flex-wrap gap-4 items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-orange-vivid)] bg-[var(--color-orange-muted)] border border-[var(--color-orange-dim)]/30 px-3 py-1 rounded-sm animate-pulse">
                      <Flame className="w-3.5 h-3.5" /> En Desarrollo
                    </span>
                    {projectsData[0].tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] rounded-sm text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center items-end gap-6 relative z-10 border-t border-[var(--color-surface-4)]/40 pt-6">
                  <div className="flex gap-6">
                    {projectsData[0].metrics.map((m) => (
                      <div key={m.label} className="flex flex-col items-center text-center">
                        <span className="text-2xl md:text-3xl font-heading font-bold text-[var(--color-orange)] tabular-nums leading-none mb-1 text-glow-subtle">{m.value}</span>
                        <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={projectsData[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm md:text-base font-mono tracking-widest uppercase font-bold text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-colors border-b border-transparent hover:border-[var(--color-orange)] pb-0.5 group/link"
                  >
                    <Clock className="w-4 h-4" />
                    {projectsData[0].linkLabel}
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Card 2: Project 2 (Modelo Digital) ── */}
          <motion.div 
            style={{ y: y2, scale: scale2, opacity: opacity2, pointerEvents: pointerEvents2 }}
            className="absolute inset-0 w-full h-full"
          >
            <TiltCard className="h-full w-full">
              <div className="relative h-full w-full pro-card rounded-sm p-8 md:p-14 overflow-hidden flex flex-col items-center text-center justify-between corner-l group">
                <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
                <span className="absolute top-6 right-8 text-7xl md:text-9xl font-heading font-bold text-[var(--color-surface-4)]/10 select-none leading-none pointer-events-none">02</span>

                <div className="flex flex-col items-center justify-center flex-1 relative z-10 mt-6">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[1.05] mb-6 text-center">
                    {projectsData[1].title}
                  </h3>
                  <p className="text-base md:text-2xl text-[var(--color-text-secondary)] font-sans max-w-4xl mb-8 leading-relaxed text-center">
                    {projectsData[1].description}
                  </p>
                  <div className="flex flex-wrap gap-4 items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-orange)] bg-[var(--color-orange-muted)] border border-[var(--color-orange-dim)]/30 px-3 py-1 rounded-sm">
                      <CheckCircle className="w-3.5 h-3.5" /> Completado
                    </span>
                    {projectsData[1].tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] rounded-sm text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center items-end gap-6 relative z-10 border-t border-[var(--color-surface-4)]/40 pt-6">
                  <div className="flex gap-6">
                    {projectsData[1].metrics.map((m) => (
                      <div key={m.label} className="flex flex-col items-center text-center">
                        <span className="text-2xl md:text-3xl font-heading font-bold text-[var(--color-orange)] tabular-nums leading-none mb-1 text-glow-subtle">{m.value}</span>
                        <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={projectsData[1].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm md:text-base font-mono tracking-widest uppercase font-bold text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-colors border-b border-transparent hover:border-[var(--color-orange)] pb-0.5 group/link"
                  >
                    {projectsData[1].linkLabel} <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Card 3: Outro Finalizer ── */}
          <motion.div 
            style={{ y: y3, opacity: opacity3, pointerEvents: pointerEvents3 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-8 md:p-14 flex flex-col justify-center items-center text-center corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
            />
            <span className="text-[10px] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mb-10">
              Código Abierto
            </span>
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter mb-6">
              Explora el <span className="text-[var(--color-orange)]">Código</span>
            </h3>
            <p className="text-base md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-2xl mb-10">
              Todos mis proyectos industriales, modelos termodinámicos y orquestaciones están documentados y disponibles en código abierto.
            </p>
            <a
              href="https://github.com/FosforoWork"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-surface-1)] hover:bg-[var(--color-orange)] hover:text-[var(--color-text-primary)] border border-[var(--color-surface-4)] hover:border-[var(--color-orange)] text-sm md:text-base font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--orange-glow)]"
            >
              <Github className="w-5 h-5" />
              Ver GitHub
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
