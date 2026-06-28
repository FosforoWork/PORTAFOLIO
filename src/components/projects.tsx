'use client';

import React from 'react';
import { FadeUp } from './fade-up';
import { ArrowUpRight, CheckCircle, Flame, Award, Wrench, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

interface Quest {
  title: string;
  description: string;
  methodology: string;
  objectives: string[];
  tags: string[];
  time: string;
  link: string;
  difficulty: 'MEDIA' | 'AVANZADA' | 'EXPERTO';
  status: 'COMPLETED' | 'ACTIVE';
  index: number;
}

const projectsData: Omit<Quest, 'index'>[] = [
  {
    title: 'Optimización de Tintas — EMPACAR S.A.',
    description:
      'Reducción del desperdicio y variabilidad en el dosificado de tintas en la división de corrugado aplicando Lean Six Sigma.',
    methodology:
      'Metodología Lean Six Sigma (LSS) con enfoque DMAIC, reducción de tiempos de setup mediante SMED y análisis predictivo multivariante en Minitab.',
    objectives: [
      'Reducción del 53.3% en el tiempo de preparación de máquinas (SMED).',
      'Retorno económico anual proyectado de 218,850 Bs/año por reducción de merma.',
      'Modelo predictivo con R² = 77.2% en Minitab.',
      'Bases de datos SQL y dashboards Power BI para SPC.',
    ],
    tags: ['Lean Six Sigma', 'SMED', 'Minitab', 'SQL & Power BI'],
    time: 'Mar 2026 — May 2026',
    link: 'https://www.linkedin.com/in/samuelaguileraaraujo',
    difficulty: 'EXPERTO',
    status: 'COMPLETED',
  },
  {
    title: 'Estructuración de Costos Industriales',
    description:
      'Análisis financiero y estructuración de costos industriales de la línea de derivados de caña del Ingenio Guabirá.',
    methodology:
      'Mapeo y distribución de Costos Indirectos de Fabricación (CIF) mediante drivers operativos y costeo por procesos dinámicos.',
    objectives: [
      'Precisión >95% en la determinación del margen bruto real por categoría.',
      'Trazabilidad del 100% de los CIF en planillas con macros dinámicas.',
      'Aceleración de 3× en toma de decisiones estratégicas de cotización.',
    ],
    tags: ['Planillas de Costos', 'EERR & BBGG', 'Drivers de Costos'],
    time: 'Sep 2025 — Nov 2025',
    link: 'https://www.linkedin.com/in/samuelaguileraaraujo',
    difficulty: 'AVANZADA',
    status: 'COMPLETED',
  },
  {
    title: 'SST Manager — Gestión de Seguridad Industrial',
    description:
      'Digitalización estructurada de la gestión de riesgos laborales bajo normativas bolivianas de higiene y bienestar.',
    methodology:
      'Modelado relacional e IPER bajo Ley DL 16998 y NTS-009/23, algoritmos de criticidad William T. Fine y madurez Hudson.',
    objectives: [
      'Implementación del método William T. Fine (GP = C × P × E).',
      'Índice de Justificación (J) para priorización de inversiones preventivas.',
      'Digitalización al 100% de inspecciones con alertas automáticas.',
    ],
    tags: ['NTS-009/23', 'William T. Fine', 'Safety-II', 'TypeScript & SQL'],
    time: 'Jun 2026 — En desarrollo',
    link: 'https://github.com/FosforoWork/PROYECTOS',
    difficulty: 'MEDIA',
    status: 'ACTIVE',
  },
  {
    title: 'Gemelo Digital — Planta de Soja',
    description:
      'Diseño de planta de proteína aislada de soja combinando ingeniería de procesos, balances termodinámicos y simulación Python.',
    methodology:
      'Balances de masa y energía (termodinámica), simulación estadística determinista en Python y modelado del cuello de botella.',
    objectives: [
      'Incremento del 4.5% en capacidad diaria sin CAPEX adicional.',
      'Identificación y eliminación del cuello de botella principal de la planta.',
      'Simulación interactiva del secador industrial (NumPy/Pandas).',
    ],
    tags: ['Python (NumPy/Pandas)', 'Balances Termodinámicos', 'Monte Carlo', 'Sin CAPEX'],
    time: 'Mar 2026 — May 2026',
    link: 'https://github.com/samuelthecreat/PROCESOS_UNITARIOS---PROYECTO_MOUNTAIN',
    difficulty: 'EXPERTO',
    status: 'COMPLETED',
  },
];

const difficultyConfig = {
  EXPERTO:  { color: 'text-red-400 border-red-900/40 bg-red-950/10',  label: 'Experto'  },
  AVANZADA: { color: 'text-amber-400 border-amber-900/40 bg-amber-950/10', label: 'Avanzada' },
  MEDIA:    { color: 'text-sky-400 border-sky-900/40 bg-sky-950/10',  label: 'Media'    },
};

function ProjectCard({ project, index }: { project: Omit<Quest, 'index'>; index: number }) {
  const { playSfx, completedQuests } = useGameStore();
  const isViewed = completedQuests.includes(project.title);
  const diff = difficultyConfig[project.difficulty];
  const completeQuest = useGameStore(s => s.completeQuest);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onClick={() => { playSfx('click'); completeQuest(project.title); }}
      onMouseEnter={() => playSfx('hover')}
      className="group relative border border-[var(--color-surface-4)] hover:border-[var(--color-orange)]/50 bg-[var(--color-surface-2)]/30 hover:bg-[var(--color-surface-2)] rounded-sm p-5 md:p-6 cursor-pointer transition-all duration-300 overflow-hidden"
    >
      {/* Orange left accent bar on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-orange)] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

      {/* Index number watermark */}
      <span className="absolute top-4 right-4 text-6xl font-heading font-bold text-[var(--color-surface-4)] select-none leading-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ── Header row ──────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 items-center mb-4 pb-3 border-b border-[var(--color-surface-4)]">
        {project.status === 'COMPLETED' ? (
          <span className="inline-flex items-center gap-1.5 text-[8px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 px-2 py-0.5 rounded-sm">
            <CheckCircle className="w-2.5 h-2.5" /> Completado
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[8px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/20 border border-amber-800/30 px-2 py-0.5 rounded-sm animate-pulse">
            <Flame className="w-2.5 h-2.5" /> En Desarrollo
          </span>
        )}

        <span className={`inline-flex items-center text-[8px] font-mono border px-2 py-0.5 rounded-sm ${diff.color}`}>
          {diff.label}
        </span>

        {isViewed && (
          <span className="inline-flex items-center text-[8px] font-mono text-[var(--color-orange)] border border-[var(--color-orange)]/30 bg-[var(--color-orange-muted)] px-2 py-0.5 rounded-sm">
            Revisado
          </span>
        )}

        <span className="ml-auto text-[8px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
          {project.time}
        </span>
      </div>

      {/* ── Title ───────────────────────────────────────── */}
      <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-orange)] transition-colors duration-200 uppercase tracking-tight mb-3 relative z-10">
        {project.title}
      </h3>

      {/* ── Description ─────────────────────────────────── */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5 relative z-10">
        {project.description}
      </p>

      {/* ── Detail grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 border-t border-[var(--color-surface-4)] relative z-10">
        {/* Methodology */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex items-center gap-1.5">
            <Wrench className="w-2.5 h-2.5 text-[var(--color-orange)]" />
            <span className="text-[8px] font-mono text-[var(--color-orange)] uppercase tracking-widest font-bold">
              Enfoque & Metodología
            </span>
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed font-mono">
            {project.methodology}
          </p>
        </div>

        {/* Results */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center gap-1.5">
            <Award className="w-2.5 h-2.5 text-[var(--color-orange)]" />
            <span className="text-[8px] font-mono text-[var(--color-orange)] uppercase tracking-widest font-bold">
              Resultados & Impacto
            </span>
          </div>
          <ul className="space-y-1.5">
            {project.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] font-mono text-[var(--color-text-secondary)] leading-relaxed">
                <ChevronRight className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Footer: tags + link ──────────────────────────── */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-5 pt-4 border-t border-[var(--color-surface-4)] relative z-10">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 border border-[var(--color-surface-4)] bg-[var(--color-surface-1)] rounded-sm text-[8px] font-mono text-[var(--color-text-muted)] uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => { e.stopPropagation(); playSfx('click'); }}
          onMouseEnter={() => playSfx('hover')}
          className="inline-flex items-center gap-1 text-[9px] font-mono tracking-widest uppercase font-bold text-[var(--color-orange)] hover:text-[var(--color-text-primary)] transition-colors border-b border-[var(--color-orange)]/30 hover:border-[var(--color-text-primary)] pb-0.5"
        >
          Ver Detalles
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto w-full">
      <FadeUp>
        <div className="flex flex-col gap-1 mb-16">
          <span className="tech-label">Casos de Estudio</span>
          <div className="flex items-end gap-4">
            <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-text-primary)] uppercase tracking-tight">
              Hitos &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                Trayectoria
              </span>
            </h2>
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
