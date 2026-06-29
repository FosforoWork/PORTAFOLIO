'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { FadeUp } from './fade-up';
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
      'Soy Samuel Aguilera, estudiante de 3er año de Ingeniería Industrial en la UCB "San Pablo". Me apasiona diseñar e implementar sistemas eficientes donde convergen la ingeniería de procesos y el análisis de datos cuantitativos.',
  },
  {
    id: 'specialty',
    label: '02',
    question: '¿Cuál es tu especialidad?',
    answer:
      'Mi especialidad es la intersección entre Ingeniería de Procesos (Lean Six Sigma, SPC, SMED) y herramientas analíticas modernas (SQL, Python, Power BI). Traduzco datos operativos en retornos económicos tangibles y medibles.',
  },
  {
    id: 'experience',
    label: '03',
    question: '¿Cuál es tu experiencia actual?',
    answer:
      'Actualmente realizo mi pasantía de producción en EMPACAR S.A., donde aplico metodologías ágiles para analizar rendimientos de dosificado de tintas, erradicar mermas y automatizar el control de KPIs mediante dashboards en Power BI.',
  },
  {
    id: 'mission',
    label: '04',
    question: '¿Cuál es tu misión?',
    answer:
      'Mi misión es eliminar la fricción y el desperdicio en cadenas de valor. Creo que la industria del mañana demanda procesos optimizados y decisiones respaldadas por análisis matemáticos rigurosos y datos continuos.',
  },
];

const statsData = [
  { icon: MessageSquareCode, label: 'Especialidad',   value: 'Procesos & Analítica' },
  { icon: Award,             label: 'Certificación',  value: 'LSS Black Belt (Dev)' },
  { icon: Globe,             label: 'Idiomas',        value: 'ES / EN / PT (BR)' },
  { icon: MapPin,            label: 'Ubicación',      value: 'Remoto / LATAM' },
];

export function About() {
  const [activeTopicId, setActiveTopicId] = useState<string>('intro');
  const [displayedText, setDisplayedText] = useState('');
  const typewriterRef = useRef<gsap.core.Tween | null>(null);

  const currentTopic = dialogueTopics.find(t => t.id === activeTopicId) || dialogueTopics[0];

  // Typewriter effect with GSAP
  const runTypewriter = useCallback((text: string) => {
    if (typewriterRef.current) {
      typewriterRef.current.kill();
    }
    setDisplayedText('');

    const chars = text.split('');
    typewriterRef.current = gsap.to({}, {
      duration: Math.min(chars.length * 0.025, 3),
      ease: 'none',
      onUpdate: function () {
        const progress = this.progress();
        const idx = Math.floor(progress * chars.length);
        setDisplayedText(chars.slice(0, idx).join(''));
      },
      onComplete: () => setDisplayedText(text),
    });
  }, []);

  useEffect(() => {
    runTypewriter(currentTopic.answer);
    return () => {
      if (typewriterRef.current) typewriterRef.current.kill();
    };
  }, [activeTopicId, currentTopic.answer, runTypewriter]);

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
                Diálogo del{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                  Ingeniero
                </span>
              </TextReveal>
              {/* Section rule */}
              <div className="flex-1 h-px bg-[var(--color-surface-4)] mb-3 hidden md:block" />
            </div>
          </div>

          {/* ── Engineering terminal panel ─────────────────────── */}
          <div className="relative border border-[var(--color-surface-4)] bg-[var(--color-surface-2)] rounded-sm overflow-hidden">

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
                            ? 'bg-[var(--color-orange)] text-white'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]'
                        }`}
                      >
                        <span className={`text-xs shrink-0 ${isActive ? 'text-white/60' : 'text-[var(--color-orange)]/50'}`}>
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
                  <span className="text-xs font-mono text-[var(--color-orange)]">$ </span>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    query --topic=&quot;{currentTopic.question}&quot;
                  </span>
                </div>
                {/* Output */}
                <div className="min-h-[90px]">
                  <p className="text-sm font-mono text-[var(--color-text-primary)] leading-relaxed tracking-wide">
                    <span className="text-[var(--color-text-muted)] mr-2">&gt;</span>
                    {displayedText}
                    <span className="inline-block w-[2px] h-[1em] bg-[var(--color-orange)] ml-0.5 animate-pulse align-text-bottom" aria-hidden="true" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats info grid ────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statsData.map(({ icon: Icon, label, value }, i) => (
              <FadeUp key={label} delay={i * 80} animation="scale">
                <div className="border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/50 hover:bg-[var(--color-surface-2)] hover:border-[var(--color-orange)]/30 p-4 rounded-sm transition-all duration-200 group">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-sm bg-[var(--color-surface-1)] border border-[var(--color-surface-4)] group-hover:border-[var(--color-orange)]/30 group-hover:text-[var(--color-orange)] text-[var(--color-text-muted)] transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
                      {label}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-primary)] font-medium">
                    {value}
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
