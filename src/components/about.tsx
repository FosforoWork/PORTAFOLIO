import React from 'react';
import { FadeUp } from './fade-up';

export function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-[var(--color-concrete)]/30 max-w-5xl mx-auto w-full">
      <FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] mb-6">
              Perfil <br /> Profesional
            </h2>
            <div className="flex gap-2 items-center text-sm font-mono text-[var(--color-rust)] tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-rust)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-rust)]"></span>
              </span>
              DISPONIBLE PARA PROYECTOS
            </div>
          </div>
          
          <div className="md:col-span-7 space-y-8 text-[var(--color-steel)] font-light leading-relaxed">
            <p className="text-lg">
              Como Ingeniero Industrial enfocado en Analítica de Datos y Automatización, mi visión es ser el puente entre los procesos físicos de negocio y la eficiencia digital. 
            </p>
            <p className="text-lg">
              Combino el rigor de metodologías clásicas de optimización (como Lean Six Sigma) con el poder del modelado matemático y el desarrollo de software moderno. Mi enfoque radica en reducir costos operativos, maximizar rendimientos y construir sistemas que transformen datos estáticos en ventajas competitivas.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[var(--color-concrete)]/30">
              <div>
                <h3 className="text-xs font-mono tracking-widest text-[var(--color-gray)] uppercase mb-2">Especialidad</h3>
                <p className="font-medium text-[var(--color-charcoal)]">Eficiencia Operativa & Data-Driven</p>
              </div>
              <div>
                <h3 className="text-xs font-mono tracking-widest text-[var(--color-gray)] uppercase mb-2">Certificación</h3>
                <p className="font-medium text-[var(--color-charcoal)]">LSS Black Belt (En desarrollo)</p>
              </div>
              <div>
                <h3 className="text-xs font-mono tracking-widest text-[var(--color-gray)] uppercase mb-2">Idiomas</h3>
                <p className="font-medium text-[var(--color-charcoal)]">Español, Inglés, Portugués (BR)</p>
              </div>
              <div>
                <h3 className="text-xs font-mono tracking-widest text-[var(--color-gray)] uppercase mb-2">Ubicación</h3>
                <p className="font-medium text-[var(--color-charcoal)]">Remoto / LATAM</p>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
