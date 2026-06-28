'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp } from './fade-up';
import { useGameStore } from '@/store/game-store';

interface Channel {
  id: string;
  name: string;
  handle: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverColor: string;
  accentColor: string;
}

const channels: Channel[] = [
  {
    id: '01',
    name: 'Email',
    handle: 'samuelagss1@gmail.com',
    description: 'Consultas directas y propuestas de colaboración',
    url: 'mailto:samuelagss1@gmail.com',
    icon: Mail,
    hoverColor: 'hover:border-[var(--color-orange)]/60',
    accentColor: 'var(--color-orange)',
  },
  {
    id: '02',
    name: 'LinkedIn',
    handle: '/in/samuelaguileraaraujo',
    description: 'Red profesional y actualizaciones de carrera',
    url: 'https://www.linkedin.com/in/samuelaguileraaraujo',
    icon: Linkedin,
    hoverColor: 'hover:border-sky-500/40',
    accentColor: '#0A66C2',
  },
  {
    id: '03',
    name: 'GitHub',
    handle: 'FosforoWork',
    description: 'Repositorios de código y simulaciones industriales',
    url: 'https://github.com/FosforoWork',
    icon: Github,
    hoverColor: 'hover:border-[var(--color-text-secondary)]/40',
    accentColor: '#E8E8E8',
  },
];

export function Contact() {
  const { playSfx } = useGameStore();
  const [status, setStatus] = useState<string | null>(null);

  const handleChannelClick = (name: string, url: string) => {
    playSfx('click');
    setStatus(`Conectando con ${name}...`);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatus(null);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 border-t border-[var(--color-surface-4)] w-full relative"
    >
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          {/* ── Header ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-1 mb-16">
            <span className="tech-label">Contacto</span>
            <div className="flex items-end gap-4">
              <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-text-primary)] uppercase tracking-tight">
                Conexión{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                  Profesional
                </span>
              </h2>
              <div className="flex-1 h-px bg-[var(--color-surface-4)] mb-3 hidden md:block" />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
              Selecciona un canal para comunicarte directamente conmigo o revisar mi trabajo en la red.
            </p>
          </div>

          {/* ── Channel cards ──────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {channels.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  onClick={() => handleChannelClick(ch.name, ch.url)}
                  onMouseEnter={() => playSfx('hover')}
                  className={`text-left group relative border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/50 hover:bg-[var(--color-surface-2)] rounded-sm p-5 cursor-pointer transition-all duration-200 overflow-hidden ${ch.hoverColor}`}
                >
                  {/* Top bar accent on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: ch.accentColor }}
                  />

                  <div className="flex justify-between items-start mb-4 pb-3 border-b border-[var(--color-surface-4)]">
                    <span className="text-[8px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
                      Canal {ch.id}
                    </span>
                    <Icon className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors" />
                  </div>

                  <h3 className="text-base font-heading font-bold text-[var(--color-text-primary)] mb-1 tracking-tight">
                    {ch.name}
                  </h3>
                  <p className="text-[10px] font-mono text-[var(--color-orange)] mb-3 truncate">
                    {ch.handle}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                    {ch.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-[8px] font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-orange)] transition-colors uppercase tracking-wider">
                    <Send className="w-2.5 h-2.5" />
                    Abrir
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── Status bar ────────────────────────────────────── */}
          <div className="border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/30 rounded-sm px-4 py-3 min-h-[44px] flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2.5 animate-pulse shrink-0" />
            <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
              {status || 'Sistema listo — selecciona un canal de comunicación'}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
