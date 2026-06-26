import React from 'react';
import { ProjectCard } from './project-card';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUpRight,
  TrendingUp,
  Globe,
  Settings,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export function BentoGrid() {
  const projects = [
    {
      title: "Optimización de Tintas (EMPACAR S.A.)",
      description: "Propuesta de optimización en el rendimiento de tintas en el proceso de dosificado (División Corrugado) mediante metodologías ágiles de ingeniería y análisis cuantitativo.",
      tags: ["Lean Six Sigma", "Estadística Descriptiva", "Hojas de Cálculo", "Mejora Continua"],
      time: "marzo 2026 - agosto 2026",
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "Estructuración de Costos Industriales (Ingenio Guabirá)",
      description: "Análisis financiero y estructuración de costos industriales del ingenio azucarero Guabirá, elaborando balances generales (BBGG) y estados de resultados (EERR).",
      tags: ["Planillas de Costos", "Estadística Descriptiva", "EERR & BBGG", "Elaboración de Informes"],
      time: "septiembre 2025 - noviembre 2025",
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "Gemelo Digital en Planta de Proteína de Soja",
      description: "Modelado matemático y simulación digital aplicada a optimizar los flujos y cuellos de botella en una planta de producción de proteína de soja.",
      tags: ["Python", "Modelado Matemático", "Mejora Continua", "Simulación"],
      time: "marzo 2026 - mayo 2026",
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "SST Manager - Gestión de Seguridad y Salud",
      description: "Sistema integral de gestión de seguridad y salud en el trabajo (SST) para control de riesgos y normativas de salud laboral.",
      tags: ["TypeScript", "Bases de Datos", "Tailwind CSS", "HTML"],
      time: "junio 2026 - en desarrollo",
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "Desarrollo de Portafolio Web Personal",
      description: "Creación de este portafolio web bento grid modular enfocado en la visibilidad y credibilidad de ingeniería de procesos y ciencias de datos.",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui"],
      time: "junio 2026 - en desarrollo",
      githubUrl: "#",
      demoUrl: "#"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full auto-rows-min">
      
      {/* 1. BIO/HERO CARD - Spans 2 cols, 2 rows on lg */}
      <Card className="col-span-1 md:col-span-2 row-span-2 bg-zinc-900/10 border-zinc-800/80 p-6 flex flex-col justify-between min-h-[320px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" title="Disponible para nuevos proyectos" />
            <Badge variant="outline" className="text-zinc-500 border-zinc-800 text-[10px] font-mono">
              PERFIL PROFESIONAL
            </Badge>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl md:text-3xl font-bold tracking-tight text-white">
              Ingeniería de Procesos + Inteligencia de Datos
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Como Ingeniero Industrial enfocado en Analítica de Datos y Automatización, combino metodologías clásicas de optimización (como Lean Six Sigma) con modelado matemático y desarrollo de software moderno. Mi enfoque radica en optimizar recursos, analizar costos operativos y modelar procesos complejos para la toma de decisiones basada en datos reales.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/60 mt-6">
          <div>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Especialidad</p>
            <p className="text-xs font-semibold text-zinc-300 mt-1">Eficiencia Operativa</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Enfoque</p>
            <p className="text-xs font-semibold text-zinc-300 mt-1">Data-Driven & LSS</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Ubicación</p>
            <p className="text-xs font-semibold text-zinc-300 mt-1">Remoto / LATAM</p>
          </div>
        </div>
      </Card>

      {/* 2. STATS CARD - LSS Certification */}
      <Card className="col-span-1 bg-zinc-900/20 border-zinc-800/80 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/60 text-zinc-300">
            <TrendingUp className="w-4 h-4" />
          </div>
          <Badge variant="outline" className="text-zinc-500 border-zinc-800/60 text-[9px] font-mono">
            CERTIFICACIÓN
          </Badge>
        </div>
        <div className="mt-4">
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            Black Belt
          </p>
          <p className="text-xs font-medium text-zinc-200 mt-1">Lean Six Sigma (LSS)</p>
          <p className="text-[11px] text-zinc-400 font-light mt-1">
            En desarrollo activo. Capacitado para dirigir proyectos de optimización de alto impacto operativo.
          </p>
        </div>
      </Card>

      {/* 3. STATS CARD - Languages / Idiomas */}
      <Card className="col-span-1 bg-zinc-900/20 border-zinc-800/80 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/60 text-zinc-300">
            <Globe className="w-4 h-4" />
          </div>
          <Badge variant="outline" className="text-zinc-500 border-zinc-800/60 text-[9px] font-mono">
            IDIOMAS
          </Badge>
        </div>
        <div className="mt-4">
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            Trilingüe
          </p>
          <p className="text-xs font-medium text-zinc-200 mt-1">Español, Inglés & Portugués</p>
          <p className="text-[11px] text-zinc-400 font-light mt-1">
            Español (Nativo), Inglés (Avanzado), Portugués BR (Nativo). Preparado para equipos globales.
          </p>
        </div>
      </Card>

      {/* 4. TECH STACK & SKILLS CARD - Spans 1 col, 2 rows on desktop */}
      <Card className="col-span-1 row-span-1 lg:row-span-2 bg-zinc-900/20 border-zinc-800/80 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-zinc-500 border-zinc-800 text-[10px] font-mono">
              TECNOLOGÍAS & STACK
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3 text-zinc-400" /> Avanzado
              </span>
              <div className="flex flex-wrap gap-1">
                {["Excel (Planillas avanzadas)"].map(t => (
                  <Badge key={t} variant="outline" className="bg-zinc-950/50 border-zinc-800/60 text-zinc-200 text-[10px] font-mono">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider flex items-center gap-1">
                <Database className="w-3 h-3 text-zinc-400" /> Intermedio
              </span>
              <div className="flex flex-wrap gap-1">
                {["Python (Numpy, Pandas)"].map(t => (
                  <Badge key={t} variant="outline" className="bg-zinc-950/50 border-zinc-800/60 text-zinc-200 text-[10px] font-mono">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider flex items-center gap-1">
                <Settings className="w-3 h-3 text-zinc-400" /> Básico / Desarrollo
              </span>
              <div className="flex flex-wrap gap-1">
                {["SQL", "Power BI", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "HTML5"].map(t => (
                  <Badge key={t} variant="outline" className="bg-zinc-950/50 border-zinc-800/60 text-zinc-300 text-[10px] font-mono">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-zinc-400" /> Metodologías
              </span>
              <div className="flex flex-wrap gap-1">
                {["Lean Six Sigma", "Estadística Descriptiva", "Modelado Matemático", "Mejora Continua"].map(t => (
                  <Badge key={t} variant="outline" className="bg-zinc-950/50 border-emerald-900/40 text-emerald-300 text-[10px] font-mono">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 pt-4 mt-6 text-[10px] text-zinc-500 font-light font-mono leading-relaxed">
          Enfoque en desarrollo Fullstack para visualización interactiva de KPIs industriales.
        </div>
      </Card>

      {/* 5. PROJECTS SECTION - Project cards mapped */}
      {projects.map((project, idx) => (
        <div key={idx} className="col-span-1">
          <ProjectCard {...project} />
        </div>
      ))}

      {/* 8. CONTACT CARD */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2 bg-zinc-900/10 border-zinc-800/80 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-base font-bold text-white">¿Listo para optimizar tus procesos?</h3>
          <p className="text-xs text-zinc-400 font-light mt-1 max-w-sm">
            Conversemos sobre cómo modelar tus procesos industriales, estructurar tus costos o implementar soluciones analíticas basadas en datos.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-3 py-2 rounded-md text-xs font-medium transition-all"
          >
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-3 py-2 rounded-md text-xs font-medium transition-all"
          >
            <Github className="w-3.5 h-3.5" /> GitHub <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
          <a
            href="mailto:tu.email@ejemplo.com"
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 px-3 py-2 rounded-md text-xs font-semibold transition-all"
          >
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
        </div>
      </Card>
      
    </div>
  );
}
