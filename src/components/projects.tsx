'use client';

import React from 'react';
import { FadeUp } from './fade-up';
import { ArrowUpRight, MapPin, CheckCircle, Flame, Award } from 'lucide-react';
import { useGameStore } from '@/store/game-store';

interface Quest {
  title: string;
  description: string;
  methodology: string;
  objectives: string[];
  tags: string[];
  time: string;
  link: string;
  difficulty: 'MEDIUM' | 'HARD' | 'EXPERT';
  status: 'COMPLETED' | 'ACTIVE';
}

const projectsData: Quest[] = [
  {
    title: "Optimización de Tintas (EMPACAR S.A.)",
    description: "Propuesta de optimización en el rendimiento de tintas en el proceso de dosificado (División Corrugado) mediante análisis cuantitativo y estabilización estadística.",
    methodology: "Metodología Lean Six Sigma (LSS) con enfoque DMAIC y Control Estadístico de Procesos (SPC).",
    objectives: [
      "Ahorro directo estimado del 14.2% en el costo de consumo anual de tintas.",
      "Reducción de 1.8 toneladas de residuos químicos anuales mediante precisión de dosificación.",
      "Estabilización del proceso alcanzando un índice de capacidad (Cpk) de 1.45."
    ],
    tags: ["Lean Six Sigma", "Estadística Descriptiva", "SPC", "Mejora Continua"],
    time: "marzo 2026 - agosto 2026",
    link: "#",
    difficulty: "EXPERT",
    status: "COMPLETED"
  },
  {
    title: "Estructuración de Costos Industriales",
    description: "Análisis financiero y estructuración de costos industriales de la línea de derivados de caña del ingenio azucarero Guabirá, consolidando balances y estados de resultados.",
    methodology: "Mapeo y distribución de Costos Indirectos de Fabricación (CIF) mediante drivers operativos y costeo por procesos dinámicos.",
    objectives: [
      "Precisión superior al 95% en la determinación del margen bruto real por categoría comercial.",
      "Trazabilidad e imputación lógica del 100% de los CIF en planillas integradas con macros dinámicas.",
      "Aceleración de 3x en la toma de decisiones estratégicas para cotización mayorista y fijación de precios."
    ],
    tags: ["Planillas de Costos", "EERR & BBGG", "Drivers de Costos", "Análisis Financiero"],
    time: "septiembre 2025 - noviembre 2025",
    link: "#",
    difficulty: "HARD",
    status: "COMPLETED"
  },
  {
    title: "SST Manager - Gestión de Seguridad y Salud",
    description: "Sistema integral de gestión de seguridad y salud en el trabajo (SST) para control de riesgos y normativas de salud laboral.",
    methodology: "Modelado relacional de bases de datos para matrices de riesgos interactiva, digitalización de inspecciones y automatización de alertas críticas.",
    objectives: [
      "Eliminación del 100% del papel físico en reportes y auditorías de seguridad en campo.",
      "Notificación instantánea (<1 seg) de condiciones inseguras de severidad alta directamente a supervisores.",
      "Cumplimiento documental total alineado con la norma internacional ISO 45001 y leyes vigentes."
    ],
    tags: ["TypeScript", "Bases de Datos", "Tailwind CSS", "ISO 45001"],
    time: "junio 2026 - en desarrollo",
    link: "#",
    difficulty: "MEDIUM",
    status: "ACTIVE"
  },
  {
    title: "Gemelo Digital en Planta de Soja",
    description: "Modelado matemático y simulación digital aplicada a optimizar los flujos y cuellos de botella en una planta de producción de proteína de soja.",
    methodology: "Modelado matemático de balances de masa y energía (termodinámica) y simulación estadística de Monte Carlo en Python.",
    objectives: [
      "Incremento del 4.5% en la capacidad diaria de producción del secador industrial de soja.",
      "Identificación y eliminación del cuello de botella principal del proceso sin inversión de capital (CAPEX).",
      "Reducción del 15% en las paradas críticas e imprevistas del sistema de secado."
    ],
    tags: ["Python", "Modelado Matemático", "Simulación", "Mejora Continua"],
    time: "marzo 2026 - mayo 2026",
    link: "#",
    difficulty: "EXPERT",
    status: "COMPLETED"
  }
];

function TimelineItem({
  project,
  isLast,
  onQuestView
}: {
  project: Quest;
  isLast: boolean;
  onQuestView: (title: string) => void;
}) {
  const { playSfx, completedQuests } = useGameStore();
  const isViewed = completedQuests.includes(project.title);

  const handleHover = () => {
    playSfx('hover');
  };

  const handleQuestClick = () => {
    playSfx('click');
    onQuestView(project.title);
  };

  const getDifficultyColor = (diff: Quest['difficulty']) => {
    if (diff === 'EXPERT') return 'text-red-400 border-red-950 bg-red-950/20';
    if (diff === 'HARD') return 'text-amber-400 border-amber-950 bg-amber-950/20';
    return 'text-sky-400 border-sky-950 bg-sky-950/20';
  };

  return (
    <div className="flex items-start group">
      {/* Timeline Indicator Column */}
      <div className="relative w-8 flex flex-col items-center">
        {/* Dotted pin / active location icon */}
        <MapPin 
          onClick={handleQuestClick}
          onMouseEnter={handleHover}
          className={`w-5 h-5 cursor-pointer transition-all hover:scale-125 ${
            isViewed 
              ? 'text-emerald-500 hover:brightness-125' 
              : project.status === 'ACTIVE' 
                ? 'text-amber-500 animate-pulse' 
                : 'text-[var(--color-rust)]'
          }`} 
        />
        {/* Connecting Line */}
        {!isLast && (
          <div className="flex-1 w-px border-l-2 border-dotted border-[var(--color-steel)]/30 mt-1" />
        )}
      </div>

      {/* Quest Content Card */}
      <div 
        onClick={handleQuestClick}
        onMouseEnter={handleHover}
        className={`ml-6 flex-1 pb-12 border-b border-[var(--color-concrete)]/20 last:border-b-0 last:pb-0 cursor-pointer`}
      >
        <div className="border border-[var(--color-concrete)]/40 hover:border-[var(--color-rust)]/60 bg-[#26201B] rounded-xl p-5 md:p-6 space-y-4 shadow-md transition-all duration-200 hover:shadow-xl hover:translate-x-1">
          {/* Header metadata */}
          <div className="flex flex-wrap gap-2 justify-between items-center border-b border-[var(--color-concrete)]/20 pb-3">
            <div className="flex items-center gap-2">
              {project.status === 'COMPLETED' ? (
                <span className="flex items-center gap-1 text-[9px] font-hud text-emerald-400 bg-emerald-950/30 border border-emerald-900 px-2 py-0.5 rounded">
                  <CheckCircle size={10} />
                  <span>COMPLETED</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[9px] font-hud text-amber-400 bg-amber-950/30 border border-amber-900 px-2 py-0.5 rounded animate-pulse">
                  <Flame size={10} />
                  <span>ACTIVE QUEST</span>
                </span>
              )}

              <span className={`text-[9px] font-hud border px-2 py-0.5 rounded ${getDifficultyColor(project.difficulty)}`}>
                DIFF: {project.difficulty}
              </span>
            </div>

            <span className="text-[9px] font-hud text-[var(--color-steel)]">
              {project.time.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-hud text-[var(--color-charcoal)] group-hover:text-[var(--color-rust)] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Objective Description */}
          <p className="text-sm text-[var(--color-steel)] font-light leading-relaxed">
            {project.description}
          </p>

          {/* Grid detailing: Mission (Methodology) & Rewards (Objectives) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-[var(--color-concrete)]/20">
            {/* Methodology */}
            <div className="md:col-span-5 space-y-1.5">
              <span className="text-[9px] font-hud text-[var(--color-rust)] block">
                MISSION BRIEF (METODOLOGÍA)
              </span>
              <p className="text-xs text-[var(--color-charcoal)]/90 font-light leading-relaxed">
                {project.methodology}
              </p>
            </div>

            {/* Achievements list */}
            <div className="md:col-span-7 space-y-1.5">
              <span className="text-[9px] font-hud text-[var(--color-rust)] flex items-center gap-1">
                <Award size={10} />
                <span>LOOT & REWARDS (RESULTADOS OBTENIDOS)</span>
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--color-steel)] font-light leading-relaxed">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-hud select-none text-[8px] mt-0.5">✔</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer of Card: Tags & Link */}
          <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-[var(--color-concrete)]/25">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 border border-[var(--color-concrete)] bg-[#1A1613] rounded text-[9px] font-mono text-[var(--color-steel)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                playSfx('click');
              }}
              onMouseEnter={handleHover}
              className="inline-flex items-center gap-1.5 text-[9px] font-hud text-[var(--color-rust)] hover:text-[var(--color-charcoal)] transition-colors border-b border-transparent hover:border-[var(--color-charcoal)] pb-0.5"
            >
              VISITAR QUEST
              <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const completeQuest = useGameStore((state) => state.completeQuest);

  const handleQuestView = (title: string) => {
    completeQuest(title);
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-4xl mx-auto w-full">
      <FadeUp>
        <div className="text-center mb-20">
          <span className="text-xs font-hud tracking-widest text-[var(--color-rust)] uppercase block mb-3">
            Quest Log
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] mb-4">
            Hitos Heroicos
          </h2>
          <p className="text-[var(--color-steel)] font-light max-w-xl mx-auto">
            Cada proyecto es una misión resuelta. Haz clic sobre cada misión para reportarla en tu estado de juego.
          </p>
        </div>
      </FadeUp>

      {/* Vertical Timeline container */}
      <div className="space-y-6 pt-4">
        {projectsData.map((project, idx) => (
          <TimelineItem
            key={project.title}
            project={project}
            isLast={idx === projectsData.length - 1}
            onQuestView={handleQuestView}
          />
        ))}
      </div>
    </section>
  );
}
