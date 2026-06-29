'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from './fade-up';
import { TextReveal } from './text-reveal';
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

export function SkillsGrid() {
  return (
    <section
      id="skills"
      className="py-24 px-6 overflow-hidden max-w-5xl mx-auto w-full border-t border-[var(--color-surface-4)]"
    >
      <FadeUp>
        <div className="flex flex-col gap-1 mb-16">
          <span className="tech-label">Conocimientos</span>
          <div className="flex items-end gap-4">
            <TextReveal
              as="h2"
              type="chars"
              className="text-4xl md:text-5xl font-heading text-[var(--color-text-primary)] uppercase tracking-tight"
            >
              Ecosistema de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                Habilidades
              </span>
            </TextReveal>
            <div className="flex-1 h-px bg-[var(--color-surface-4)] mb-3 hidden md:block" />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
            Herramientas cuantitativas y tecnológicas enfocadas en optimización operativa y automatización de procesos.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillsData.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/30 hover:bg-[var(--color-surface-2)] hover:border-[var(--color-orange)]/30 rounded-sm p-5 transition-colors duration-300 group overflow-hidden hover:shadow-[0_0_30px_rgba(142,202,154,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-sm bg-[var(--color-surface-1)] border border-[var(--color-surface-4)] text-[var(--color-text-muted)] group-hover:border-[var(--color-orange)]/30 group-hover:text-[var(--color-orange)] transition-all duration-300 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-[var(--color-text-primary)]">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5 block">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <span className={`text-[9px] font-mono border px-2.5 py-1 rounded-sm shrink-0 font-medium ${levelColor[skill.level] ?? 'text-[var(--color-text-muted)] border-[var(--color-surface-4)]'}`}>
                  {skill.level}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
