import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useScrollReveal } from './fade-up';
import { MessageSquareCode, Globe, MapPin, Award, Compass, ArrowDown } from 'lucide-react';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, visible } = useScrollReveal();
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!visible || hasRun.current) return;
    hasRun.current = true;
    setCount(0);

    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.round(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [visible, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const statsData = [
  { icon: MessageSquareCode, label: 'Proyectos',       num: 5,  suffix: '+', text: '',                   isNumber: true  },
  { icon: Award,             label: 'Certificaciones', num: 3,  suffix: '',  text: '',                   isNumber: true  },
  { icon: Globe,             label: 'Idiomas',         num: 3,  suffix: '',  text: '',                   isNumber: true  },
  { icon: MapPin,            label: 'Ubicación',       num: 0,  suffix: '',  text: 'Bolivia - Santa Cruz', isNumber: false },
];

export function About() {
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

  // ── 3-card stack: Intro → Stats → Outro ──────────────────────────────
  // h-[400vh] divided into 3 segments of ~33% each.

  // Card 0: Intro  (exits around 28%)
  const y0      = useTransform(scrollYProgress, [0, 0.28],           ['0px', '-40px']);
  const scale0  = useTransform(scrollYProgress, [0.20, 0.28],        [1, 0.92]);
  const opacity0 = useTransform(scrollYProgress, [0.20, 0.28],       [1, 0]);
  const pointerEvents0 = useTransform(scrollYProgress, [0.20, 0.28], ['auto', 'none']);

  // Card 1: Stats  (enters 22%, exits 62%)
  const y1       = useTransform(scrollYProgress, [0.18, 0.40, 0.58], ['95vh', '0px', '-40px']);
  const scale1   = useTransform(scrollYProgress, [0.50, 0.60],       [1, 0.92]);
  const opacity1 = useTransform(scrollYProgress, [0.18, 0.38, 0.52, 0.62], [0, 1, 1, 0]);
  const pointerEvents1 = useTransform(scrollYProgress, [0.18, 0.22, 0.52, 0.62], ['none', 'auto', 'auto', 'none']);

  // Card 2: Outro  (enters 58%, stays)
  const y2       = useTransform(scrollYProgress, [0.56, 0.80],  ['95vh', '0px']);
  const opacity2 = useTransform(scrollYProgress, [0.56, 0.80],  [0, 1]);
  const pointerEvents2 = useTransform(scrollYProgress, [0.56, 0.60], ['none', 'auto']);

  return (
    <section ref={containerRef} id="about" className="relative h-[400vh] w-full bg-transparent">
      {/* Divider gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-surface-4)]/40 to-transparent" />
      
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">

        {/* Stack Wrapper */}
        <div className="relative w-[88vw] md:w-[70vw] h-[65vh] md:h-[68vh] flex items-center justify-center">

          {/* ── Card 0: Intro ── */}
          <motion.div
            style={{ y: y0, scale: scale0, opacity: opacity0, pointerEvents: pointerEvents0 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-8 md:p-14 flex flex-col justify-center items-center text-center corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-6 items-center text-center w-full">
              <span className="text-[10px] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mx-auto">
                Perfil Principal
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[0.9] text-center">
                Sobre<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                  Mí
                </span>
              </h2>
              <div className="flex items-center gap-2 justify-center text-xs font-mono text-[var(--color-text-muted)] animate-pulse">
                <Compass className="w-4 h-4 text-[var(--color-orange)]" />
                <span>SCROLL PARA CONOCERME</span>
              </div>
            </div>
          </motion.div>

          {/* ── Card 1: Stats / Content ── */}
          <motion.div
            style={{ y: y1, scale: scale1, opacity: opacity1, pointerEvents: pointerEvents1 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-6 md:p-10 flex flex-col justify-between corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <span className="absolute top-4 right-6 text-7xl font-heading font-bold text-[var(--color-surface-4)]/20 select-none leading-none pointer-events-none">01</span>

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[9px] font-mono text-[var(--color-orange)] tracking-widest uppercase mb-3 block">
                Ingeniero Industrial · UCB
              </span>
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tight mb-3">
                Optimizando operaciones físicas con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                  Ciencia de Datos
                </span>{' '}
                y{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange-vivid)] to-[var(--color-orange)]">
                  Lean Six Sigma
                </span>.
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-3xl text-center">
                Especializado en reducción de mermas y tiempos de setup. Combino simulación Monte Carlo, analítica predictiva en Python y orquestación para transformar cuellos de botella en retornos financieros medibles.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative z-10 mt-4">
              {statsData.map(({ icon: Icon, label, num, suffix, text, isNumber }) => (
                <div 
                  key={label} 
                  className="border border-[var(--color-surface-4)]/60 bg-[var(--color-surface-1)]/40 p-4 rounded-sm group flex flex-col items-center text-center hover:border-[var(--color-orange)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-sm bg-[var(--color-surface-2)] border border-[var(--color-surface-4)] text-[var(--color-text-muted)] group-hover:text-[var(--color-orange)] transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{label}</span>
                  </div>
                  <span className="text-2xl md:text-3xl font-heading font-bold text-[var(--color-text-primary)] tabular-nums leading-none mt-1">
                    {isNumber ? <AnimatedCounter value={num} suffix={suffix} /> : text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 2: Outro Finalizer ── */}
          <motion.div
            style={{ y: y2, opacity: opacity2, pointerEvents: pointerEvents2 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-8 md:p-14 flex flex-col justify-center items-center text-center corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
            />
            <span className="text-[10px] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mb-10">
              Mi Perfil Completo
            </span>
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter mb-6">
              Conoce mis <span className="text-[var(--color-orange)]">Skills</span>
            </h3>
            <p className="text-base md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-2xl mb-3">
              Continúa scrolleando para explorar el stack de herramientas y metodologías que aplico en cada proyecto.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] animate-pulse mt-4">
              <ArrowDown className="w-4 h-4 text-[var(--color-orange)]" />
              <span>SIGUIENTE SECCIÓN</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
