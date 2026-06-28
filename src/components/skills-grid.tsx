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
  Info 
} from 'lucide-react';

interface Skill {
  name: string;
  category: 'Herramientas' | 'Programación' | 'Metodologías';
  level: 'Avanzado' | 'Intermedio' | 'Básico' | 'Black Belt (En desarrollo)';
  levelPercent: number;
  description: string;
  projects: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const skillsData: Skill[] = [
  {
    name: "Excel",
    category: "Herramientas",
    level: "Avanzado",
    levelPercent: 90,
    description: "Macros avanzadas, planillas de costos industriales estructuradas y automatización de reportes operativos.",
    projects: ["Estructuración de Costos Industriales", "Optimización de Tintas"],
    icon: FileSpreadsheet
  },
  {
    name: "Power BI",
    category: "Herramientas",
    level: "Básico",
    levelPercent: 50,
    description: "Creación de reportes dinámicos, modelado de datos simple y visualización de indicadores operativos clave (KPIs).",
    projects: ["Optimización de Tintas"],
    icon: BarChart2
  },
  {
    name: "SQL",
    category: "Herramientas",
    level: "Básico",
    levelPercent: 50,
    description: "Escritura de consultas relacionales para la extracción, limpieza y manipulación de conjuntos de datos.",
    projects: ["SST Manager"],
    icon: Database
  },
  {
    name: "Python",
    category: "Programación",
    level: "Intermedio",
    levelPercent: 75,
    description: "Bibliotecas de datos (Numpy, Pandas), modelado matemático y simulación de procesos industriales complejos.",
    projects: ["Gemelo Digital"],
    icon: Terminal
  },
  {
    name: "TypeScript",
    category: "Programación",
    level: "Básico",
    levelPercent: 60,
    description: "Desarrollo front-end tipado y estructuración de aplicaciones web robustas y escalables.",
    projects: ["SST Manager", "Portafolio Personal"],
    icon: Code
  },
  {
    name: "Node.js",
    category: "Programación",
    level: "Básico",
    levelPercent: 50,
    description: "Configuración de entornos de ejecución back-end, scripts de automatización e integración de dependencias.",
    projects: ["SST Manager"],
    icon: Cpu
  },
  {
    name: "Next.js / React",
    category: "Programación",
    level: "Básico",
    levelPercent: 60,
    description: "Desarrollo de aplicaciones SPA/SSR modulares con renderizado eficiente y experiencia de usuario moderna.",
    projects: ["Portafolio Personal"],
    icon: Globe
  },
  {
    name: "Lean Six Sigma",
    category: "Metodologías",
    level: "Black Belt (En desarrollo)",
    levelPercent: 85,
    description: "Metodología DMAIC para reducción de variabilidad, optimización de rendimientos y eliminación de desperdicios en líneas de producción.",
    projects: ["Optimización de Tintas"],
    icon: Award
  },
  {
    name: "Modelado Matemático",
    category: "Metodologías",
    level: "Intermedio",
    levelPercent: 75,
    description: "Simulación de balances de masa, flujos de producción, optimización lineal y análisis de cuellos de botella.",
    projects: ["Gemelo Digital"],
    icon: Activity
  },
  {
    name: "Mejora Continua",
    category: "Metodologías",
    level: "Avanzado",
    levelPercent: 90,
    description: "Filosofía Kaizen, herramientas de causa raíz (5 Porqués, Ishikawa) y optimización general de eficiencia operativa (OEE).",
    projects: ["Optimización de Tintas", "Gemelo Digital"],
    icon: RefreshCw
  }
];

export function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Herramientas' | 'Programación' | 'Metodologías'>('Todos');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredSkills = skillsData.filter(skill => 
    activeCategory === 'Todos' ? true : skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-6 overflow-hidden max-w-5xl mx-auto w-full border-t border-[var(--color-concrete)]/30">
      <FadeUp>
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-[var(--color-rust)] uppercase block mb-3">
            Conocimientos
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] mb-4">
            Ecosistema de Habilidades
          </h2>
          <p className="text-[var(--color-steel)] font-light max-w-xl mx-auto">
            Habilidades cuantitativas y herramientas tecnológicas enfocadas en la optimización operativa y la automatización de procesos.
          </p>
        </div>
      </FadeUp>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {(['Todos', 'Herramientas', 'Programación', 'Metodologías'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-[var(--color-rust)] text-[var(--color-oatmeal)] shadow-sm'
                : 'bg-[var(--color-concrete)]/20 hover:bg-[var(--color-concrete)]/40 text-[var(--color-charcoal)]'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="bg-[#F4EFEA] border border-[var(--color-concrete)]/50 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-md hover:border-[var(--color-rust)]/30 min-h-[170px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-lg bg-[var(--color-oatmeal)] border border-[var(--color-concrete)] text-[var(--color-rust)] group-hover:bg-[var(--color-rust)] group-hover:text-[var(--color-oatmeal)] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-[var(--color-gray)] uppercase pt-1">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading text-[var(--color-charcoal)] mb-2 font-medium">
                    {skill.name}
                  </h3>
                </div>

                {/* Level Progress Bar */}
                <div className="space-y-1.5 w-full mt-auto">
                  <div className="flex justify-between text-[10px] font-mono text-[var(--color-steel)]">
                    <span>DOMINIO</span>
                    <span>{skill.levelPercent}%</span>
                  </div>
                  <div className="h-1 bg-[var(--color-concrete)]/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.levelPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-[var(--color-rust)]"
                    />
                  </div>
                </div>

                {/* Tooltip Overlay */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-[var(--color-charcoal)] text-[var(--color-oatmeal)] p-5 flex flex-col justify-between z-10"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-rust)] font-mono uppercase tracking-wider font-semibold">
                          <Info size={12} />
                          <span>Aplicación</span>
                        </div>
                        <p className="text-xs text-[var(--color-concrete)] font-light leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {skill.projects.length > 0 && (
                        <div className="pt-2 border-t border-[var(--color-concrete)]/20 mt-2">
                          <span className="text-[9px] font-mono text-[var(--color-gray)] uppercase block mb-1">
                            PROYECTOS RELACIONADOS
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.projects.map((proj) => (
                              <span 
                                key={proj} 
                                className="text-[9px] font-mono bg-[var(--color-concrete)]/10 text-[var(--color-concrete)] px-2 py-0.5 rounded border border-[var(--color-concrete)]/20"
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
