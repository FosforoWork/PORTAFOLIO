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
  Award,
  Activity,
  Workflow,
  Factory,
} from 'lucide-react';

const BLOCK_COLORS = {
  datos: {
    border: 'border-sky-800/30',
    bg: 'bg-sky-950/10',
    text: 'text-sky-400',
    hoverBorder: 'hover:border-sky-500/40',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.06)]',
    iconHover: 'group-hover:text-sky-400',
  },
  metodologias: {
    border: 'border-emerald-800/30',
    bg: 'bg-emerald-950/10',
    text: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.06)]',
    iconHover: 'group-hover:text-emerald-400',
  },
};

interface Skill {
  name: string;
  block: 'datos' | 'metodologias';
  focus: string;
  description: string;
  projects: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const skillsData: Skill[] = [
  {
    name: 'SQL',
    block: 'datos',
    focus: 'Extracción (ETL) y Estructuración de Datos',
    description:
      'Consultas relacionales para extracción, limpieza y manipulación de conjuntos de datos operativos.',
    projects: ['Optimización de Tintas'],
    icon: Database,
  },
  {
    name: 'Python',
    block: 'datos',
    focus: 'Ciencia de Datos y Simulación Numérica',
    description:
      'NumPy, Pandas, modelado matemático y simulación de procesos industriales complejos.',
    projects: ['Gemelo Digital'],
    icon: Terminal,
  },
  {
    name: 'Power BI',
    block: 'datos',
    focus: 'Dashboards Operativos y Conectividad SPC',
    description:
      'Reportes dinámicos, modelado de datos y visualización de indicadores operativos clave (KPIs).',
    projects: ['Optimización de Tintas'],
    icon: BarChart2,
  },
  {
    name: 'n8n',
    block: 'datos',
    focus: 'Orquestación de Procesos y Automatización',
    description:
      'Automatización de flujos de trabajo e integración entre sistemas operativos y analíticos.',
    projects: [],
    icon: Workflow,
  },
  {
    name: 'Excel',
    block: 'metodologias',
    focus: 'Modelado Financiero y Lógica Avanzada',
    description:
      'Macros avanzadas, planillas de costos industriales estructuradas y automatización de reportes operativos.',
    projects: ['Optimización de Tintas'],
    icon: FileSpreadsheet,
  },
  {
    name: 'LSS',
    block: 'metodologias',
    focus: 'Black Belt (Cand.) — Enfoque DMAIC',
    description:
      'DMAIC para reducción de variabilidad, optimización de rendimientos y eliminación de desperdicios.',
    projects: ['Optimización de Tintas'],
    icon: Award,
  },
  {
    name: 'Modelado Matemático',
    block: 'metodologias',
    focus: 'Optimización Estocástica y Monte Carlo',
    description:
      'Simulación de balances de masa, optimización lineal y análisis de cuellos de botella.',
    projects: ['Gemelo Digital'],
    icon: Activity,
  },
  {
    name: 'Sistemas de Producción',
    block: 'metodologias',
    focus: 'Ingeniería de Métodos y Layouts Industriales',
    description:
      'Diseño de layout, balanceo de líneas, estudio de tiempos y estandarización de operaciones.',
    projects: ['Gemelo Digital'],
    icon: Factory,
  },
];

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
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
              Skills  
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
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1 h-4 rounded-sm bg-sky-400 inline-block" />
            <span className="text-xs font-mono tracking-widest uppercase text-sky-400 font-semibold">
              Datos, Sistemas y Automatización
            </span>
          </div>
          {skillsData.filter(s => s.block === 'datos').map((skill) => {
            const Icon = skill.icon;
            const c = BLOCK_COLORS.datos;
            return (
              <SkillCard key={skill.name} skill={skill} Icon={Icon} colors={c} />
            );
          })}
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1 h-4 rounded-sm bg-emerald-400 inline-block" />
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-semibold">
              Metodologías y Modelado de Operaciones
            </span>
          </div>
          {skillsData.filter(s => s.block === 'metodologias').map((skill) => {
            const Icon = skill.icon;
            const c = BLOCK_COLORS.metodologias;
            return (
              <SkillCard key={skill.name} skill={skill} Icon={Icon} colors={c} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  Icon,
  colors,
}: {
  skill: Skill;
  Icon: React.ComponentType<{ className?: string }>;
  colors: typeof BLOCK_COLORS.datos;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative border ${colors.border} ${colors.bg} hover:bg-[var(--color-surface-2)] ${colors.hoverBorder} backdrop-blur-sm rounded-sm p-5 transition-all duration-300 group overflow-hidden ${colors.hoverShadow}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-sm bg-[var(--color-surface-1)] border ${colors.border} text-[var(--color-text-muted)] ${colors.iconHover} transition-all duration-300 shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-heading font-bold text-[var(--color-text-primary)]">
              {skill.name}
            </h3>
            <span className={`shrink-0 text-[9px] font-mono border ${colors.border} ${colors.text} px-2 py-0.5 rounded-sm font-medium`}>
              {skill.block === 'datos' ? 'Datos' : 'Procesos'}
            </span>
          </div>
          <p className={`text-[10px] font-mono ${colors.text} mt-1 leading-relaxed`}>
            {skill.focus}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2 leading-relaxed">
            {skill.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
