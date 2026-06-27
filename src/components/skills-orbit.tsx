import React from 'react';
import { FadeUp } from './fade-up';

const skillCategories = [
  {
    name: "Herramientas",
    skills: ["Excel (Avanzado)", "Power BI", "SQL"]
  },
  {
    name: "Programación",
    skills: ["Python", "TypeScript", "Node.js", "Next.js"]
  },
  {
    name: "Metodologías",
    skills: ["Lean Six Sigma", "Modelado Matemático", "Mejora Continua"]
  }
];

export function SkillsOrbit() {
  return (
    <section id="skills" className="py-24 px-6 overflow-hidden max-w-5xl mx-auto w-full border-t border-[var(--color-concrete)]/30">
      <FadeUp>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] mb-4">
            Ecosistema de Habilidades
          </h2>
          <p className="text-[var(--color-steel)] font-light max-w-xl mx-auto">
            Un conjunto integral de herramientas y metodologías orbitando alrededor de la resolución de problemas operativos.
          </p>
        </div>
      </FadeUp>

      {/* Mobile view - Simple List */}
      <div className="md:hidden space-y-12">
        {skillCategories.map((category, idx) => (
          <FadeUp key={category.name} delay={idx * 100}>
            <div className="text-center">
              <h3 className="text-lg font-heading text-[var(--color-rust)] mb-4">{category.name}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-[var(--color-concrete)]/20 border border-[var(--color-concrete)]/50 rounded-full text-xs font-medium text-[var(--color-charcoal)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Desktop view - Orbit Animation */}
      <div className="hidden md:flex justify-center items-center py-20 relative h-[600px]">
        {/* Center */}
        <div className="absolute z-10 w-32 h-32 bg-[var(--color-oatmeal)] border border-[var(--color-rust)] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(183,65,14,0.1)]">
          <span className="font-heading text-2xl text-[var(--color-charcoal)]">SA.</span>
        </div>

        {/* Orbit Rings */}
        <div className="absolute w-[300px] h-[300px] border border-[var(--color-concrete)]/40 rounded-full border-dashed"></div>
        <div className="absolute w-[450px] h-[450px] border border-[var(--color-concrete)]/30 rounded-full border-dashed"></div>
        <div className="absolute w-[600px] h-[600px] border border-[var(--color-concrete)]/20 rounded-full border-dashed"></div>

        {/* Orbiting Elements */}
        {/* Ring 1 - Metodologías */}
        <div className="absolute top-1/2 left-1/2 animate-[orbit-ring-1_20s_linear_infinite]">
          <div className="bg-[var(--color-oatmeal)] border border-[var(--color-concrete)] px-4 py-2 rounded-full shadow-sm whitespace-nowrap">
            <span className="text-xs font-semibold text-[var(--color-rust)] block text-center mb-1">Metodologías</span>
            <span className="text-[10px] text-[var(--color-charcoal)]">LSS, Modelado Matemático</span>
          </div>
        </div>

        {/* Ring 2 - Herramientas */}
        <div className="absolute top-1/2 left-1/2 animate-[orbit-ring-2_25s_linear_infinite]">
          <div className="bg-[var(--color-oatmeal)] border border-[var(--color-concrete)] px-4 py-2 rounded-full shadow-sm whitespace-nowrap">
            <span className="text-xs font-semibold text-[var(--color-rust)] block text-center mb-1">Herramientas</span>
            <span className="text-[10px] text-[var(--color-charcoal)]">Excel Avanzado, Power BI, SQL</span>
          </div>
        </div>

        {/* Ring 3 - Programación */}
        <div className="absolute top-1/2 left-1/2 animate-[orbit-ring-3_30s_linear_infinite]">
          <div className="bg-[var(--color-oatmeal)] border border-[var(--color-concrete)] px-4 py-2 rounded-full shadow-sm whitespace-nowrap">
            <span className="text-xs font-semibold text-[var(--color-rust)] block text-center mb-1">Programación</span>
            <span className="text-[10px] text-[var(--color-charcoal)]">Python, TypeScript, Next.js</span>
          </div>
        </div>

      </div>
    </section>
  );
}
