'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { FadeUp } from './fade-up';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tags: string[];
  time: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
}

const projectsData: Project[] = [
  {
    title: "Optimización de Tintas (EMPACAR S.A.)",
    description: "Propuesta de optimización en el rendimiento de tintas en el proceso de dosificado (División Corrugado) mediante metodologías ágiles de ingeniería y análisis cuantitativo.",
    tags: ["Lean Six Sigma", "Estadística Descriptiva", "Hojas de Cálculo", "Mejora Continua"],
    time: "marzo 2026 - agosto 2026",
    link: "#",
    imageSrc: "/images/Logo Empacar.jpeg",
    imageAlt: "Logo de EMPACAR S.A., empresa de empaques corrugados",
  },
  {
    title: "Estructuración de Costos Industriales",
    description: "Análisis financiero y estructuración de costos industriales del ingenio azucarero Guabirá, elaborando balances generales (BBGG) y estados de resultados (EERR).",
    tags: ["Planillas de Costos", "Estadística Descriptiva", "EERR & BBGG", "Elaboración de Informes"],
    time: "septiembre 2025 - noviembre 2025",
    link: "#",
    imageSrc: "/images/Guabira.jpeg",
    imageAlt: "Ingenio azucarero Guabirá, Bolivia",
  },
  {
    title: "SST Manager - Gestión de Seguridad y Salud",
    description: "Sistema integral de gestión de seguridad y salud en el trabajo (SST) para control de riesgos y normativas de salud laboral.",
    tags: ["TypeScript", "Bases de Datos", "Tailwind CSS", "HTML"],
    time: "junio 2026 - en desarrollo",
    link: "#",
    imageSrc: "/images/SST Manager.png",
    imageAlt: "Interfaz del sistema SST Manager para gestión de seguridad laboral",
  },
  {
    title: "Gemelo Digital en Planta de Proteína de Soja",
    description: "Modelado matemático y simulación digital aplicada a optimizar los flujos y cuellos de botella en una planta de producción de proteína de soja.",
    tags: ["Python", "Modelado Matemático", "Mejora Continua"],
    time: "marzo 2026 - mayo 2026",
    link: "#",
    imageSrc: "/images/Gemelo Digital.png",
    imageAlt: "Simulación de gemelo digital de planta de proteína de soja",
  },
  {
    title: "Desarrollo de Portafolio Web Personal",
    description: "Creación de este portafolio web modular enfocado en la visibilidad y credibilidad de ingeniería de procesos y ciencias de datos bajo un diseño minimalista.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS"],
    time: "junio 2026 - en desarrollo",
    link: "#",
    imageSrc: "/images/Maletin.jpg",
    imageAlt: "Maletín ejecutivo representando el portafolio web profesional",
  },
];

// Helper Component for Parallax & Scroll-Linked effects
function ProjectCardVisual({ src, alt }: { src: string; alt: string }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  });

  // Calculate smooth y translation offset and subtle scale shifts based on scroll position
  const y = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div
      ref={visualRef}
      className="relative w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden border border-[var(--color-concrete)]/50 shadow-sm group bg-[#F4EFEA]"
    >
      <motion.div style={{ y, scale }} className="absolute -inset-y-10 -inset-x-2 w-[calc(100%+16px)] h-[calc(100%+80px)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-300"
          quality={85}
        />
      </motion.div>
      {/* Oatmeal overlay — fades out on hover */}
      <div
        className="absolute inset-0 bg-[var(--color-oatmeal)]/25 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto w-full">
      <FadeUp>
        <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] mb-16 text-center">
          Proyectos Destacados
        </h2>
      </FadeUp>

      <div className="space-y-24">
        {projectsData.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <FadeUp key={project.title} delay={100}>
              <article className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center group/card ${isEven ? '' : 'md:flex-row-reverse'}`}>

                {/* ─── Scroll-linked Project Image Panel ─── */}
                <ProjectCardVisual src={project.imageSrc} alt={project.imageAlt} />

                {/* ─── Interactive Project Text Panel ─── */}
                <div className="w-full md:w-1/2 space-y-6 transition-all duration-500 group-hover/card:translate-x-1">
                  <span className="text-xs font-mono tracking-widest text-[var(--color-gray)] uppercase block">
                    {project.time}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-heading text-[var(--color-charcoal)] transition-colors duration-300 group-hover/card:text-[var(--color-rust)]">
                    {project.title}
                  </h3>

                  <p className="text-[var(--color-steel)] font-light leading-relaxed transition-all duration-500 group-hover/card:text-[var(--color-charcoal)]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-[var(--color-concrete)] rounded-full text-xs font-medium text-[var(--color-charcoal)] transition-all duration-300 group-hover/card:border-[var(--color-steel)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-rust)] hover:text-[var(--color-charcoal)] transition-colors group/link"
                    >
                      Ver detalles
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/link:scale-110"
                      />
                    </a>
                  </div>
                </div>

              </article>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
