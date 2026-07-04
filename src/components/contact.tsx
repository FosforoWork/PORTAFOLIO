import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight, Compass, CheckCircle } from 'lucide-react';
import { TiltCard } from './tilt-card';

const channels = [
  {
    name: 'Email',
    handle: 'samuelagss1@gmail.com',
    desc: 'Consultas directas y colaboración',
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=samuelagss1@gmail.com',
    icon: Mail,
    color: 'var(--color-orange)',
  },
  {
    name: 'LinkedIn',
    handle: 'Samuel Aguilera Araujo',
    desc: 'Red profesional y updates',
    url: 'https://www.linkedin.com/in/samuelaguileraaraujo',
    icon: Linkedin,
    color: 'var(--color-orange)',
  },
  {
    name: 'GitHub',
    handle: 'FosforoWork',
    desc: 'Repositorios y simulaciones',
    url: 'https://github.com/FosforoWork',
    icon: Github,
    color: 'var(--color-orange)',
  },
];

export function Contact() {
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

  const [hovered, setHovered] = useState<string | null>(null);

  // ── 3-card stack: Intro → Channels → Outro ────────────────────────────
  // h-[350vh] divided across 3 cards.

  // Card 0: Intro  (exits ~30%)
  const y0      = useTransform(scrollYProgress, [0, 0.30],           ['0px', '-40px']);
  const scale0  = useTransform(scrollYProgress, [0.20, 0.30],        [1, 0.92]);
  const opacity0 = useTransform(scrollYProgress, [0.20, 0.30],       [1, 0]);
  const pointerEvents0 = useTransform(scrollYProgress, [0.20, 0.30], ['auto', 'none']);

  // Card 1: Channels  (enters 24%, exits 68%)
  const y1       = useTransform(scrollYProgress, [0.22, 0.45, 0.62], ['95vh', '0px', '-40px']);
  const scale1   = useTransform(scrollYProgress, [0.54, 0.64],       [1, 0.92]);
  const opacity1 = useTransform(scrollYProgress, [0.22, 0.43, 0.56, 0.65], [0, 1, 1, 0]);
  const pointerEvents1 = useTransform(scrollYProgress, [0.22, 0.25, 0.56, 0.65], ['none', 'auto', 'auto', 'none']);

  // Card 2: Outro  (enters 62%, stays)
  const y2       = useTransform(scrollYProgress, [0.60, 0.85],  ['95vh', '0px']);
  const opacity2 = useTransform(scrollYProgress, [0.60, 0.85],  [0, 1]);
  const pointerEvents2 = useTransform(scrollYProgress, [0.60, 0.64], ['none', 'auto']);

  return (
    <div ref={containerRef} id="contact" className="relative h-[350vh] w-full bg-transparent">
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
              Networking
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[0.9] mb-8 text-center">
              Conexión<br/>
              <span className="text-[var(--color-text-secondary)]">
                Profesional
              </span>
            </h2>
            <div className="flex items-center gap-2 justify-center text-xs font-mono text-[var(--color-text-muted)] animate-pulse">
              <Compass className="w-4 h-4 text-[var(--color-orange)]" />
              <span>SCROLL PARA CONECTAR</span>
            </div>
          </motion.div>

          {/* ── Card 1: Channels ── */}
          <motion.div 
            style={{ y: y1, scale: scale1, opacity: opacity1, pointerEvents: pointerEvents1 }}
            className="absolute inset-0 w-full h-full"
          >
            <TiltCard className="h-full w-full">
              <div className="relative h-full w-full pro-card rounded-sm p-8 md:p-14 flex flex-col items-center text-center justify-between corner-l group overflow-hidden">
                <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
                <span className="absolute top-6 right-8 text-7xl md:text-9xl font-heading font-bold text-[var(--color-surface-4)]/10 select-none leading-none pointer-events-none">01</span>

                {hovered && (
                  <div 
                    className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-5"
                    style={{ background: `radial-gradient(circle at center, ${channels.find(c => c.name === hovered)?.color}, transparent)` }}
                  />
                )}

                <div className="relative z-10 mb-6">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter leading-[1.05] mb-3">
                    Comunícate
                  </h3>
                  <p className="text-base md:text-xl text-[var(--color-text-secondary)] font-sans max-w-2xl">
                    Selecciona un canal para conversar directamente o revisar código.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 mt-auto">
                  {channels.map((ch) => (
                    <a
                      key={ch.name}
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHovered(ch.name)}
                      onMouseLeave={() => setHovered(null)}
                      className="group/btn relative p-6 bg-[var(--color-surface-1)] border border-[var(--color-surface-4)] rounded-sm flex flex-col items-center text-center hover:border-[var(--color-orange)] transition-all duration-300"
                    >
                      <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" style={{ background: ch.color }} />
                      <div className="flex justify-center items-start mb-6">
                        <ch.icon className="w-6 h-6 text-[var(--color-text-muted)] group-hover/btn:text-[var(--color-text-primary)] transition-colors" />
                      </div>
                      <h4 className="text-xl font-heading font-bold text-[var(--color-text-primary)] tracking-tight mb-2">{ch.name}</h4>
                      <p className="text-xs font-mono text-[var(--color-orange)] truncate mb-2">{ch.handle}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">{ch.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Card 2: Outro Finalizer ── */}
          <motion.div 
            style={{ y: y2, opacity: opacity2, pointerEvents: pointerEvents2 }}
            className="absolute inset-0 w-full h-full pro-card rounded-sm p-8 md:p-14 flex flex-col justify-center items-center text-center corner-l"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)' }}
            />
            <div className="w-14 h-14 rounded-sm border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] flex items-center justify-center mb-8">
              <CheckCircle className="w-7 h-7 text-[var(--color-orange)]" />
            </div>
            <span className="text-[10px] font-mono text-[var(--color-orange)] tracking-widest uppercase block border-b border-[var(--color-surface-4)]/40 pb-2 w-fit mb-8">
              Listo para colaborar
            </span>
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-[var(--color-text-primary)] uppercase tracking-tighter mb-6">
              Gracias por <span className="text-[var(--color-orange)]">Visitar</span>
            </h3>
            <p className="text-base md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-2xl">
              Si tienes un proyecto de optimización industrial o análisis de datos, estoy disponible para colaborar.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
