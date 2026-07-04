import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  FileSpreadsheet,
  BarChart2,
  Database,
  Terminal,
  Award,
  Activity,
  Workflow,
  Factory,
  Compass,
  ArrowDown,
} from 'lucide-react';
import { TiltCard } from './tilt-card';

const datosSkills = [
  { name: 'SQL',      focus: 'Extracción (ETL)',      icon: Database },
  { name: 'Python',   focus: 'Simulación Numérica',   icon: Terminal },
  { name: 'Power BI', focus: 'Dashboards Operativos', icon: BarChart2 },
  { name: 'n8n',      focus: 'Automatización',        icon: Workflow },
];

const metodologiasSkills = [
  { name: 'Excel',         focus: 'Modelado Financiero',    icon: FileSpreadsheet },
  { name: 'LSS',           focus: 'Enfoque DMAIC',          icon: Award },
  { name: 'Modelado Math', focus: 'Monte Carlo',            icon: Activity },
  { name: 'Sistemas',      focus: 'Layouts Industriales',   icon: Factory },
];

export function SkillsGrid() {
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

  // ── 4-card stack: Intro → Datos → Metodologías → Outro ──────────────
  // h-[450vh] divided across 4 cards.

  // Card 0: Intro  (exits ~25%)
  const y0      = useTransform(scrollYProgress, [0, 0.25],           ['0px', '-40px']);
  const scale0  = useTransform(scrollYProgress, [0.15, 0.25],        [1, 0.92]);
  const opacity0 = useTransform(scrollYProgress, [0.15, 0.25],       [1, 0]);
  const pointerEvents0 = useTransform(scrollYProgress, [0.15, 0.25], ['auto', 'none']);

  // Card 1: Datos  (enters 20%, exits 50%)
  const y1       = useTransform(scrollYProgress, [0.15, 0.38, 0.50], ['95vh', '0px', '-40px']);
  const scale1   = useTransform(scrollYProgress, [0.42, 0.52],       [1, 0.92]);
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.35, 0.44, 0.52], [0, 1, 1, 0]);
  const pointerEvents1 = useTransform(scrollYProgress, [0.15, 0.18, 0.44, 0.52], ['none', 'auto', 'auto', 'none']);

  // Card 2: Metodologías  (enters 48%, exits 75%)
  const y2       = useTransform(scrollYProgress, [0.46, 0.65, 0.76], ['95vh', '0px', '-40px']);
  const scale2   = useTransform(scrollYProgress, [0.68, 0.78],       [1, 0.92]);
  const opacity2 = useTransform(scrollYProgress, [0.46, 0.64, 0.70, 0.78], [0, 1, 1, 0]);
  const pointerEvents2 = useTransform(scrollYProgress, [0.46, 0.49, 0.70, 0.78], ['none', 'auto', 'auto', 'none']);

  // Card 3: Outro  (enters 74%, stays)
  const y3       = useTransform(scrollYProgress, [0.72, 0.92],  ['95vh', '0px']);
  const opacity3 = useTransform(scrollYProgress, [0.72, 0.92],  [0, 1]);
  const pointerEvents3 = useTransform(scrollYProgress, [0.72, 0.76], ['none', 'auto']);

  return (
    <div ref={containerRef} className="relative h-[450vh] w-full bg-transparent">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">

        {/* Stack Wrapper */}
        <div className="relative w-[88vw] md:w-[70vw] h-[65vh] md:h-[68vh] flex items-center justify-center">

          {/* ── Card 0: Intro ── */}
          <motion.div 
            style={{ y: y0, scale: scale0, opacity: opacity0, pointerEvents: pointerEvents0 }} 
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center p-8 md:p-14 pro-card rounded-sm corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <span className="text-[10px] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mb-6 mx-auto">
              Core Stack
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[0.9] mb-8 text-center">
              Herramientas &<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                Skills
              </span>
            </h2>
            <div className="flex items-center gap-2 justify-center text-xs font-mono text-[var(--color-text-muted)] animate-pulse">
              <Compass className="w-4 h-4 text-[var(--color-orange)]" />
              <span>SCROLL PARA EXPLORAR</span>
            </div>
          </motion.div>

          {/* ── Card 1: Datos & Sistemas ── */}
          <motion.div 
            style={{ y: y1, scale: scale1, opacity: opacity1, pointerEvents: pointerEvents1 }}
            className="absolute inset-0 w-full h-full"
          >
            <TiltCard className="h-full w-full">
              <div className="relative h-full w-full pro-card rounded-sm p-8 md:p-14 flex flex-col items-center text-center corner-l group">
                <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
                <span className="absolute top-6 right-8 text-7xl md:text-9xl font-heading font-bold text-[var(--color-surface-4)]/10 select-none leading-none pointer-events-none">01</span>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[1.05] mb-4">
                  Datos & Sistemas
                </h3>
                <p className="text-base md:text-xl text-[var(--color-text-secondary)] font-sans max-w-3xl mb-12">
                  Estructuración, extracción y automatización de flujos operativos para análisis de alto rendimiento.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-auto relative z-10">
                  {datosSkills.map((skill) => (
                    <div key={skill.name} className="flex flex-col items-center text-center p-7 bg-[var(--color-surface-1)] border border-[var(--color-surface-4)]/50 rounded-sm hover:border-[var(--color-orange)] transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <skill.icon className="w-7 h-7 text-[var(--color-orange)]" />
                        <span className="font-heading font-bold text-xl md:text-2xl text-[var(--color-text-primary)] tracking-tight">{skill.name}</span>
                      </div>
                      <span className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{skill.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Card 2: Metodologías ── */}
          <motion.div 
            style={{ y: y2, scale: scale2, opacity: opacity2, pointerEvents: pointerEvents2 }}
            className="absolute inset-0 w-full h-full"
          >
            <TiltCard className="h-full w-full">
              <div className="relative h-full w-full pro-card rounded-sm p-8 md:p-14 flex flex-col items-center text-center corner-l group">
                <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
                <span className="absolute top-6 right-8 text-7xl md:text-9xl font-heading font-bold text-[var(--color-surface-4)]/10 select-none leading-none pointer-events-none">02</span>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[1.05] mb-4">
                  Metodologías
                </h3>
                <p className="text-base md:text-xl text-[var(--color-text-secondary)] font-sans max-w-3xl mb-12">
                  Análisis de procesos, optimización estadística y modelado industrial bajo frameworks comprobados.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-auto relative z-10">
                  {metodologiasSkills.map((skill) => (
                    <div key={skill.name} className="flex flex-col items-center text-center p-7 bg-[var(--color-surface-1)] border border-[var(--color-surface-4)]/50 rounded-sm hover:border-[var(--color-orange-vivid)] transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <skill.icon className="w-7 h-7 text-[var(--color-orange-vivid)]" />
                        <span className="font-heading font-bold text-xl md:text-2xl text-[var(--color-text-primary)] tracking-tight">{skill.name}</span>
                      </div>
                      <span className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{skill.focus}</span>
                    </div>
                  ))}
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
              Siguente Paso
            </span>
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter mb-6">
              ¿Hablamos <span className="text-[var(--color-orange)]">de tu Proyecto?</span>
            </h3>
            <p className="text-base md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-2xl mb-4">
              Si necesitas optimizar operaciones, modelar procesos o construir un gemelo digital, podemos construirlo juntos.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] animate-pulse mt-4">
              <ArrowDown className="w-4 h-4 text-[var(--color-orange)]" />
              <span>CONTACTO A CONTINUACIÓN</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
