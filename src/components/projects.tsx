'use client';

import React from 'react';
import { FadeUp } from './fade-up';
import { TextReveal } from './text-reveal';
import { TiltCard } from './tilt-card';
import { ArrowUpRight, CheckCircle, Flame, Award, Wrench, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Quest {
  title: string;
  description: string;
  methodology: string;
  objectives: string[];
  tags: string[];
  time: string;
  link: string;
  environment: 'Proyecto Industrial' | 'I+D' | 'Caso de Estudio';
  status: 'COMPLETED' | 'ACTIVE';
  index: number;
}

const projectsData: Omit<Quest, 'index'>[] = [
  {
    title: 'Optimización del rendimiento en el dosificado de tintas en Empacar S.A.',
    description:
      'Reducción del desperdicio y variabilidad en el dosificado de tintas en la división de corrugado aplicando Lean Six Sigma.',
    methodology:
      'DMAIC con SMED y análisis predictivo multivariante en python para reducir variabilidad y desperdicio en el dosificado de tintas.',
    objectives: [
      'Reducción del 53.3% en el tiempo de preparación de máquinas mediante SMED.',
      'Retorno económico anual de 218,850 Bs/año por reducción de merma en dosificado.',
      'Anticipación de desviaciones en dosificado mediante modelo predictivo multivariante con R² = 77.2% en python.',
      'Automatización del control estadístico de proceso (SPC) con dashboards Power BI sobre bases de datos relacionales.',
    ],
    tags: ['Lean Six Sigma', 'SMED', 'python', 'Excel', 'Power BI'],
    time: '',
    link: '/proyecto-en-desarrollo.html',
    environment: 'Proyecto Industrial',
    status: 'ACTIVE',
  },
  {
    title: 'Desarrollo de arquitectura modular para modelos digitales fenomenológicos en python',
    description:
      'Diseño integral y simulación fenomenológica de una planta ISP con modelo ciberfísico acoplado a un gemelo digital en Python, balances termodinámicos rigurosos por etapa y optimización estocástica Monte Carlo.',
    methodology:
      'Modelado fenomenológico en Python (NumPy/Pandas) con validación de simulaciones de Monte Carlo de 300,000 corridas para optimizar balances de masa y energía de una planta ISP.',
    objectives: [
      'Mitigación de riesgos operativos mediante réplica computacional validada con primeros principios termodinámicos.',
      'Validación del 99% de éxito operativo en 300,000 escenarios estocásticos mediante simulación Monte Carlo.',
      'Ahorro energético del 25% en evaporación integrando pre-concentración por Ósmosis Inversa (9 kW vs 1,000 kW térmicos evitados).',
      'Trazabilidad del 100% de la masa procesada incluyendo dosificación química (NaOH/HCl) y generación de subproductos.',
      'Estandarización sanitaria bajo ASME BPE y EHEDG con ingeniería hidráulica integral y CIP automatizado.',
    ],
    tags: ['Python', 'Monte Carlo', 'Six Sigma'],
    time: 'Mar 2026 — Jun 2026',
    link: 'https://github.com/samuelthecreat/PROCESOS_UNITARIOS---PROYECTO_MOUNTAIN',
    environment: 'Proyecto Industrial',
    status: 'COMPLETED',
  },
];

const environmentConfig: Record<string, { color: string; label: string }> = {
  'Proyecto Industrial': { color: 'text-emerald-400 border-emerald-900/40 bg-emerald-950/10', label: 'Proyecto Industrial' },
  'I+D':                 { color: 'text-cyan-400 border-cyan-900/40 bg-cyan-950/10',           label: 'I+D'              },
  'Caso de Estudio':     { color: 'text-purple-400 border-purple-900/40 bg-purple-950/10',     label: 'Caso de Estudio' },
};

function ProjectCard({ project, index }: { project: Omit<Quest, 'index'>; index: number }) {
  const env = environmentConfig[project.environment];

  return (
    <TiltCard className="group perspective-[1000px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-6% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
        className="relative border border-[var(--color-surface-4)] hover:border-[var(--color-orange)]/50 bg-[var(--color-surface-2)]/30 hover:bg-[var(--color-surface-2)] backdrop-blur-sm rounded-sm p-5 md:p-6 cursor-pointer transition-all duration-500 overflow-hidden corner-l"
      >
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56,189,248,0.04), transparent 60%)',
          }}
        />

        {/* Orange left accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-orange)] origin-top"
          initial={{ scaleY: 0 }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Index watermark */}
        <span className="absolute top-4 right-4 text-6xl font-heading font-bold text-[var(--color-surface-4)]/30 select-none leading-none pointer-events-none transition-all duration-300 group-hover:text-[var(--color-orange)]/10 group-hover:scale-110">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Header row */}
        <div className="flex flex-wrap gap-2 items-center mb-4 pb-3 border-b border-[var(--color-surface-4)] relative z-10">
          {project.status === 'COMPLETED' ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 px-2 py-0.5 rounded-sm">
              <CheckCircle className="w-2.5 h-2.5" /> Completado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/20 border border-amber-800/30 px-2 py-0.5 rounded-sm animate-pulse">
              <Flame className="w-2.5 h-2.5" /> En Desarrollo
            </span>
          )}

          <span className={`inline-flex items-center text-[10px] font-mono border px-2 py-0.5 rounded-sm ${env.color}`}>
            {env.label}
          </span>

          <span className="ml-auto text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
            {project.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-orange)] transition-colors duration-300 uppercase tracking-tight mb-3 relative z-10">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5 relative z-10">
          {project.description}
        </p>

        {/* Detail grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 border-t border-[var(--color-surface-4)] relative z-10">
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-1.5">
              <Wrench className="w-2.5 h-2.5 text-[var(--color-orange)]" />
              <span className="text-[10px] font-mono text-[var(--color-orange)] uppercase tracking-widest font-bold">
                Enfoque & Metodología
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-mono">
              {project.methodology}
            </p>
          </div>

          <div className="md:col-span-7 space-y-2">
            <div className="flex items-center gap-1.5">
              <Award className="w-2.5 h-2.5 text-[var(--color-orange)]" />
              <span className="text-[10px] font-mono text-[var(--color-orange)] uppercase tracking-widest font-bold">
                Resultados & Impacto
              </span>
            </div>
            <ul className="space-y-1.5">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-mono text-[var(--color-text-secondary)] leading-relaxed">
                  <ChevronRight className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer: tags + link */}
        <div className="flex flex-wrap justify-between items-center gap-3 mt-5 pt-4 border-t border-[var(--color-surface-4)] relative z-10">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] rounded-sm text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wide hover:border-[var(--color-orange)]/30 hover:text-[var(--color-text-secondary)] transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono tracking-widest uppercase font-bold text-[var(--color-orange)] hover:text-[var(--color-text-primary)] transition-colors border-b border-[var(--color-orange)]/30 hover:border-[var(--color-text-primary)] pb-0.5 group/link"
          >
            Ver Detalles
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </TiltCard>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto w-full">
      <FadeUp>
        <div className="flex flex-col gap-1 mb-16">
          <span className="tech-label">Casos de Estudio</span>
          <div className="flex items-end gap-4">
            <TextReveal
              as="h2"
              type="chars"
              className="text-4xl md:text-5xl font-heading text-[var(--color-text-primary)] uppercase tracking-tight"
            >
              Hitos &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                Trayectoria
              </span>
            </TextReveal>
            <div className="flex-1 h-px bg-[var(--color-surface-4)] mb-3 hidden md:block" />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
            Proyectos destacados que documentan soluciones de ingeniería aplicadas tanto en planta industrial como en desarrollo digital.
          </p>
        </div>
      </FadeUp>

      <div className="space-y-5">
        {projectsData.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
