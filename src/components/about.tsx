'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FadeUp, useScrollReveal } from './fade-up';
import { TextReveal } from './text-reveal';
import { MessageSquareCode, Globe, MapPin, Award, ChevronRight } from 'lucide-react';

interface DialogueTopic {
  id: string;
  label: string;
  question: string;
  answer: string;
}

const dialogueTopics: DialogueTopic[] = [
  {
    id: 'intro',
    label: '01',
    question: '¿Quién eres?',
    answer:
      'Samuel Aguilera. Estudiante de 3er año de Ingeniería Industrial en la UCB "San Pablo". Enfocado en la convergencia entre el modelado de operaciones físicas y la automatización de flujos de información digital.',
  },
  {
    id: 'specialty',
    label: '02',
    question: '¿Cuál es tu especialidad?',
    answer:
      'Optimización de operaciones mediante la intersección de Lean Six Sigma (DMAIC), Ciencia de Datos aplicada (Python, SQL) y orquestación de workflows (n8n). Traduzco variables críticas de proceso en retornos financieros medibles.',
  },
  {
    id: 'experience',
    label: '03',
    question: '¿Cuál es tu experiencia actual?',
    answer:
      'Pasantía de producción en EMPACAR S.A. Ejecución de proyectos LSS enfocados en la reducción del 53.3% en tiempos de setup (SMED), modelado predictivo multivariante de mermas y centralización de KPIs en Power BI.',
  },
  {
    id: 'mission',
    label: '04',
    question: '¿Cuál es tu enfoque?',
    answer:
      'Erradicar la "muda" digital y operativa en cadenas de valor. Reemplazar la toma de decisiones por intuición en piso mediante simulación matemática rigurosa (Monte Carlo), analítica continua y sistemas integrados a bajo costo.',
  },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, visible } = useScrollReveal();
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!visible || hasRun.current) return;
    hasRun.current = true;
    setCount(0);

    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.round(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [visible, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const statsData = [
  { icon: MessageSquareCode, label: 'Proyectos',      num: 5,  suffix: '+', text: '', isNumber: true },
  { icon: Award,             label: 'Certificación',  num: 3,  suffix: '',  text: '', isNumber: true },
  { icon: Globe,             label: 'Idiomas',        num: 3,  suffix: '',  text: '', isNumber: true },
  { icon: MapPin,            label: 'Ubicación',      num: 0,  suffix: '',  text: 'Bolivia - Santa Cruz', isNumber: false },
];

export function About() {
  const [activeTopicId, setActiveTopicId] = useState<string>('intro');

  const currentTopic = dialogueTopics.find(t => t.id === activeTopicId) || dialogueTopics[0];

  const handleSelectTopic = (id: string) => {
    if (id === activeTopicId) return;
    setActiveTopicId(id);
  };

  return (
    <section id="about" className="py-24 px-6 border-t border-[var(--color-surface-4)] max-w-5xl mx-auto w-full">
      <FadeUp>
        <div className="space-y-12">

          {/* ── Section header ─────────────────────────────────── */}
          <div className="flex flex-col gap-1">
            <span className="tech-label">Trayectoria</span>
            <div className="flex items-end gap-4">
              <TextReveal
                as="h2"
                type="chars"
                className="text-4xl md:text-5xl font-heading text-[var(--color-text-primary)] uppercase tracking-tight"
              >
                Informacion{' '}
                <span className="text-[var(--color-text-primary)]">
                  Sobre quien soy
                </span>
              </TextReveal>
              {/* Section rule */}
              <div className="flex-1 h-px bg-[var(--color-surface-4)] mb-3 hidden md:block" />
            </div>
          </div>

          {/* ── Engineering terminal panel ─────────────────────── */}
          <div className="relative border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] backdrop-blur-sm rounded-sm overflow-hidden">

            {/* Terminal top bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-surface-1)] border-b border-[var(--color-surface-4)]">
              <div className="flex items-center gap-2">
                {/* Traffic light dots */}
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-xs font-mono text-[var(--color-text-muted)] tracking-wider uppercase">
                  samuel.aguilera@ucb ~ terminal
                </span>
              </div>
              {/* Status indicator */}
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Disponible
              </span>
            </div>

            {/* Main content: sidebar + output */}
            <div className="flex flex-col md:flex-row">

              {/* ── Left sidebar: query selection ─────────────── */}
              <div className="md:w-56 border-b md:border-b-0 md:border-r border-[var(--color-surface-4)] bg-[var(--color-surface-1)]/50">
                <div className="p-3 border-b border-[var(--color-surface-4)]">
                  <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
                    $ Consultas disponibles
                  </span>
                </div>
                <div className="p-2 space-y-1">
                  {dialogueTopics.map(topic => {
                    const isActive = activeTopicId === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleSelectTopic(topic.id)}
                        className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-sm text-xs font-mono cursor-pointer transition-all duration-150 ${
                          isActive
                            ? 'bg-[var(--color-cyan)] text-white'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]'
                        }`}
                      >
                          <span className={`text-xs shrink-0 ${isActive ? 'text-white/60' : 'text-[var(--color-cyan)]/50'}`}>
                          {topic.label}
                        </span>
                        <span className="truncate">{topic.question}</span>
                        {isActive && <ChevronRight className="ml-auto w-3 h-3 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Right: output panel ────────────────────────── */}
              <div className="flex-1 p-5 md:p-6 min-h-[200px]">
                {/* Command prompt */}
                <div className="mb-3">
                  <span className="text-xs font-mono text-[var(--color-cyan)]">$ </span>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    query --topic=&quot;{currentTopic.question}&quot;
                  </span>
                </div>
                {/* Output */}
                <div className="min-h-[90px]">
                  <p className="text-sm font-mono text-[var(--color-text-primary)] leading-relaxed tracking-wide">
                    <span className="text-[var(--color-text-muted)] mr-2">&gt;</span>
                    {currentTopic.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats info grid ────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statsData.map(({ icon: Icon, label, num, suffix, text, isNumber }, i) => (
              <FadeUp key={label} delay={i * 80} animation="scale">
                <div className="border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/50 hover:bg-[var(--color-surface-2)] hover:border-[var(--color-cyan)]/30 backdrop-blur-sm p-4 rounded-sm transition-all duration-200 group">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-sm bg-[var(--color-surface-1)] border border-[var(--color-surface-4)] group-hover:border-[var(--color-cyan)]/30 group-hover:text-[var(--color-cyan)] text-[var(--color-text-muted)] transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
                      {label}
                    </span>
                  </div>
                  <span className="text-lg font-heading font-bold text-[var(--color-text-primary)] tabular-nums">
                    {isNumber ? <AnimatedCounter value={num} suffix={suffix} /> : text}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </FadeUp>
    </section>
  );
}
