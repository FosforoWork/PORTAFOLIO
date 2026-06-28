'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from './fade-up';
import {
  FileSpreadsheet,
  BarChart2,
  Database,
  Terminal,
  Code,
  Cpu,
  Globe,
  Award,
  Activity,
  RefreshCw,
  Info,
} from 'lucide-react';

interface Skill {
  name: string;
  category: 'Herramientas' | 'Programación' | 'Metodologías';
  level: 'Avanzado' | 'Intermedio' | 'Básico' | 'Black Belt (Dev.)';
  levelPercent: number;
  description: string;
  projects: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const skillsData: Skill[] = [
  {
    name: 'Excel',
    category: 'Herramientas',
    level: 'Avanzado',
    levelPercent: 90,
    description:
      'Macros avanzadas, planillas de costos industriales estructuradas y automatización de reportes operativos.',
    projects: ['Estructuración de Costos', 'Optimización de Tintas'],
    icon: FileSpreadsheet,
  },
  {
    name: 'Power BI',
    category: 'Herramientas',
    level: 'Básico',
    levelPercent: 50,
    description:
      'Reportes dinámicos, modelado de datos y visualización de indicadores operativos clave (KPIs).',
    projects: ['Optimización de Tintas'],
    icon: BarChart2,
  },
  {
    name: 'SQL',
    category: 'Herramientas',
    level: 'Básico',
    levelPercent: 50,
    description:
      'Consultas relacionales para extracción, limpieza y manipulación de conjuntos de datos.',
    projects: ['SST Manager'],
    icon: Database,
  },
  {
    name: 'Python',
    category: 'Programación',
    level: 'Intermedio',
    levelPercent: 75,
    description:
      'NumPy, Pandas, modelado matemático y simulación de procesos industriales complejos.',
    projects: ['Gemelo Digital'],
    icon: Terminal,
  },
  {
    name: 'TypeScript',
    category: 'Programación',
    level: 'Básico',
    levelPercent: 60,
    description:
      'Desarrollo front-end tipado y estructuración de aplicaciones web robustas.',
    projects: ['SST Manager', 'Portafolio'],
    icon: Code,
  },
  {
    name: 'Node.js',
    category: 'Programación',
    level: 'Básico',
    levelPercent: 50,
    description:
      'Entornos de ejecución back-end, scripts de automatización e integración de dependencias.',
    projects: ['SST Manager'],
    icon: Cpu,
  },
  {
    name: 'Next.js / React',
    category: 'Programación',
    level: 'Básico',
    levelPercent: 60,
    description:
      'Aplicaciones SPA/SSR modulares con renderizado eficiente y UX moderna.',
    projects: ['Portafolio'],
    icon: Globe,
  },
  {
    name: 'Lean Six Sigma',
    category: 'Metodologías',
    level: 'Black Belt (Dev.)',
    levelPercent: 85,
    description:
      'DMAIC para reducción de variabilidad, optimización de rendimientos y eliminación de desperdicios.',
    projects: ['Optimización de Tintas'],
    icon: Award,
  },
  {
    name: 'Modelado Matemático',
    category: 'Metodologías',
    level: 'Intermedio',
    levelPercent: 75,
    description:
      'Simulación de balances de masa, optimización lineal y análisis de cuellos de botella.',
    projects: ['Gemelo Digital'],
    icon: Activity,
  },
  {
    name: 'Mejora Continua',
    category: 'Metodologías',
    level: 'Avanzado',
    levelPercent: 90,
    description:
      'Kaizen, 5 Porqués, Ishikawa y optimización de eficiencia operativa global (OEE).',
    projects: ['Optimización de Tintas', 'Gemelo Digital'],
    icon: RefreshCw,
  },
];

const levelColor: Record<string, string> = {
  'Avanzado':        'text-[var(--color-orange)] border-[var(--color-orange)]/20 bg-[var(--color-orange-muted)]',
  'Black Belt (Dev.)': 'text-[var(--color-orange)] border-[var(--color-orange)]/20 bg-[var(--color-orange-muted)]',
  'Intermedio':      'text-amber-400 border-amber-800/30 bg-amber-950/10',
  'Básico':          'text-sky-400 border-sky-800/30 bg-sky-950/10',
};

const categories = ['Todos', 'Herramientas', 'Programación', 'Metodologías'] as const;
type CategoryFilter = typeof categories[number];

export function SkillsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="skills"
      className="py-24 px-6 overflow-hidden max-w-5xl mx-auto w-full border-t border-[var(--color-surface-4)]"
    >
      <FadeUp>
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-1 mb-16">
          <span className="tech-label">Conocimientos</span>
          <div className="flex items-end gap-4">
            <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-text-primary)] uppercase tracking-tight">
              Ecosistema de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                Habilidades
              </span>
            </h2>
            <div className="flex-1 h-px bg-[var(--color-surface-4)] mb-3 hidden md:block" />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
            Herramientas cuantitativas y tecnológicas enfocadas en optimización operativa y automatización de procesos.
          </p>
        </div>
      </FadeUp>

      {/* ── Skills grid (3 columns list) ────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative border border-[var(--color-surface-4)] hover:border-[var(--color-orange)]/40 bg-[var(--color-surface-2)]/30 hover:bg-[var(--color-surface-2)] rounded-sm p-4 flex items-center justify-between gap-3 min-h-[72px] transition-all duration-200 group cursor-default"
              >
                {/* Left side: Icon & Title */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-sm bg-[var(--color-surface-1)] border border-[var(--color-surface-4)] text-[var(--color-text-muted)] group-hover:border-[var(--color-orange)]/30 group-hover:text-[var(--color-orange)] transition-all duration-200 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-heading font-bold text-[var(--color-text-primary)]">
                      {skill.name}
                    </h3>
                    <span className="text-[8px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider block">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Right side: Level Badge */}
                <span className={`text-[8px] font-mono border px-2 py-0.5 rounded-sm shrink-0 font-medium ${levelColor[skill.level] ?? 'text-[var(--color-text-muted)] border-[var(--color-surface-4)]'}`}>
                  {skill.level}
                </span>

                {/* ── Hover overlay ─────────────────────────────── */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key="hover-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 bg-[var(--color-surface-2)] border border-[var(--color-orange)]/30 p-4 flex flex-col justify-between z-10 rounded-sm"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Info className="w-3 h-3 text-[var(--color-orange)]" />
                          <span className="text-[8px] font-mono text-[var(--color-orange)] uppercase tracking-widest font-bold">
                            {skill.name}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono text-[var(--color-text-secondary)] leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {skill.projects.length > 0 && (
                        <div className="pt-2 border-t border-[var(--color-surface-4)]">
                          <span className="text-[7px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">
                            Proyectos:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {skill.projects.map(proj => (
                              <span
                                key={proj}
                                className="text-[7px] font-mono bg-[var(--color-surface-1)] text-[var(--color-text-secondary)] px-1.5 py-0.5 rounded-sm border border-[var(--color-surface-4)]"
                              >
                                {proj}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
