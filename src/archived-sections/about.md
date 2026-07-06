# Sobre Mí

Archivado desde `src/components/about.tsx`.

```tsx
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

  const y0      = useTransform(scrollYProgress, [0, 0.28],           ['0px', '-40px']);
  const scale0  = useTransform(scrollYProgress, [0.20, 0.28],        [1, 0.92]);
  const opacity0 = useTransform(scrollYProgress, [0.20, 0.28],       [1, 0]);
  const pointerEvents0 = useTransform(scrollYProgress, [0.20, 0.28], ['auto', 'none']);

  const y1       = useTransform(scrollYProgress, [0.18, 0.40, 0.58], ['95vh', '0px', '-40px']);
  const scale1   = useTransform(scrollYProgress, [0.50, 0.60],       [1, 0.92]);
  const opacity1 = useTransform(scrollYProgress, [0.18, 0.38, 0.52, 0.62], [0, 1, 1, 0]);
  const pointerEvents1 = useTransform(scrollYProgress, [0.18, 0.22, 0.52, 0.62], ['none', 'auto', 'auto', 'none']);

  const y2       = useTransform(scrollYProgress, [0.56, 0.80],  ['95vh', '0px']);
  const opacity2 = useTransform(scrollYProgress, [0.56, 0.80],  [0, 1]);
  const pointerEvents2 = useTransform(scrollYProgress, [0.56, 0.60], ['none', 'auto']);

  return (
    <section ref={containerRef} id="about" className="relative h-[400vh] w-full bg-transparent">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-surface-4)]/40 to-transparent" />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        <div className="relative w-[88vw] md:w-[70vw] h-[65vh] md:h-[68vh] flex items-center justify-center">

          {/* Card 0: Intro */}
          <motion.div
            style={{ y: y0, scale: scale0, opacity: opacity0, pointerEvents: pointerEvents0 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-[clamp(1rem,4vh,3rem)] flex flex-col justify-center items-center text-center corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-[clamp(0.5rem,2vh,1.5rem)] items-center text-center w-full">
              <span className="text-[clamp(8px,1.3vh,10px)] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mx-auto">
                Perfil Principal
              </span>
              <h2 className="text-[clamp(2.2rem,8.5vh,5.8rem)] md:text-[clamp(4.2rem,11vh,7.2rem)] font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[0.9] text-center">
                Sobre<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                  Mí
                </span>
              </h2>
              <div className="flex items-center gap-2 justify-center text-[clamp(10px,1.4vh,12px)] font-mono text-[var(--color-text-muted)] animate-pulse">
                <Compass className="w-[clamp(12px,1.6vh,15px)] h-[clamp(12px,1.6vh,15px)] text-[var(--color-orange)]" />
                <span>SCROLL PARA CONOCERME</span>
              </div>
            </div>
          </motion.div>

          {/* Card 1: Stats */}
          <motion.div
            style={{ y: y1, scale: scale1, opacity: opacity1, pointerEvents: pointerEvents1 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-[clamp(1rem,3vh,2rem)] md:p-[clamp(1.5rem,4vh,3rem)] flex flex-col justify-between corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <span className="absolute top-[clamp(0.5rem,2vh,1.5rem)] right-[clamp(1rem,3vh,2rem)] text-[clamp(3.5rem,9vh,7rem)] font-heading font-bold text-[var(--color-surface-4)]/20 select-none leading-none pointer-events-none">01</span>

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[clamp(8px,1.3vh,10px)] font-mono text-[var(--color-orange)] tracking-widest uppercase mb-[clamp(0.25rem,0.8vh,0.5rem)] block">
                Ingeniero Industrial · UCB
              </span>
              <h3 className="text-[clamp(1.15rem,3.2vh,1.8rem)] md:text-[clamp(1.6rem,4.2vh,2.5rem)] font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tight mb-[clamp(0.25rem,0.8vh,0.5rem)]">
                Optimizando operaciones físicas con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                  Ciencia de Datos
                </span>{' '}
                y{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange-vivid)] to-[var(--color-orange)]">
                  Lean Six Sigma
                </span>.
              </h3>
              <p className="text-[clamp(11px,1.6vh,13px)] md:text-[clamp(13px,1.9vh,15px)] text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-3xl text-center">
                Especializado en reducción de mermas y tiempos de setup. Combino simulación Monte Carlo, analítica predictiva en Python y orquestación para transformar cuellos de botella en retornos financieros medibles.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-[clamp(0.5rem,1.5vh,1rem)] relative z-10 mt-[clamp(0.5rem,1.5vh,1rem)]">
              {statsData.map(({ icon: Icon, label, num, suffix, text, isNumber }) => (
                <div
                  key={label}
                  className="border border-[var(--color-surface-4)]/60 bg-[var(--color-surface-1)]/40 p-[clamp(0.5rem,1.4vh,1rem)] rounded-sm group flex flex-col items-center text-center hover:border-[var(--color-orange)] transition-colors"
                >
                  <div className="flex items-center gap-1.5 mb-[clamp(0.2rem,0.5vh,0.4rem)]">
                    <div className="p-1 rounded-sm bg-[var(--color-surface-2)] border border-[var(--color-surface-4)] text-[var(--color-text-muted)] group-hover:text-[var(--color-orange)] transition-colors">
                      <Icon className="w-[clamp(10px,1.4vh,13px)] h-[clamp(10px,1.4vh,13px)]" />
                    </div>
                    <span className="text-[clamp(8px,1.3vh,10px)] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{label}</span>
                  </div>
                  <span className="text-[clamp(16px,2.8vh,26px)] font-heading font-bold text-[var(--color-text-primary)] tabular-nums leading-none mt-1">
                    {isNumber ? <AnimatedCounter value={num} suffix={suffix} /> : text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Outro */}
          <motion.div
            style={{ y: y2, opacity: opacity2, pointerEvents: pointerEvents2 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-[clamp(1rem,4vh,3rem)] flex flex-col justify-center items-center text-center corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
            />
            <span className="text-[clamp(8px,1.3vh,10px)] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mb-[clamp(1rem,3vh,2rem)]">
              Mi Perfil Completo
            </span>
            <h3 className="text-[clamp(1.8rem,6vh,3.8rem)] md:text-[clamp(2.8rem,8vh,5rem)] font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter mb-[clamp(0.5rem,1.5vh,1rem)]">
              Conoce mis <span className="text-[var(--color-orange)]">Skills</span>
            </h3>
            <p className="text-[clamp(12px,1.7vh,15px)] md:text-[clamp(14px,2vh,18px)] text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-2xl mb-3">
              Continúa scrolleando para explorar el stack de herramientas y metodologías que aplico en cada proyecto.
            </p>
            <div className="flex items-center gap-2 text-[clamp(10px,1.4vh,12px)] font-mono text-[var(--color-text-muted)] animate-pulse mt-4">
              <ArrowDown className="w-[clamp(12px,1.6vh,15px)] h-[clamp(12px,1.6vh,15px)] text-[var(--color-orange)]" />
              <span>SIGUIENTE SECCIÓN</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
```
