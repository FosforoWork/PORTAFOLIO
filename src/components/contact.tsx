'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, ArrowUpRight, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp } from './fade-up';
import { TextReveal } from './text-reveal';

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
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=samuelagss1@gmail.com',
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

const statusMessages = [
  'Sistema listo — selecciona un canal de comunicación',
  'Iniciando handshake...',
  'Conexión establecida',
  'Redirigiendo al canal seguro...',
];

export function Contact() {
  const [status, setStatus] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleChannelClick = (name: string, url: string) => {
    setConnecting(name);
    setStatus(`Conectando con ${name}...`);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatus(`Redirigido a ${name}`);
      setConnecting(null);
    }, 500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 border-t border-[var(--color-surface-4)] w-full relative"
    >
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          {/* ── Header ── */}
          <div className="flex flex-col gap-1 mb-16">
            <span className="tech-label">Contacto</span>
            <div className="flex items-end gap-4">
              <TextReveal
                as="h2"
                type="chars"
                className="text-4xl md:text-5xl font-heading text-[var(--color-text-primary)] uppercase tracking-tight"
              >
                Conexión{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]">
                  Profesional
                </span>
              </TextReveal>
              <div className="flex-1 h-px bg-[var(--color-surface-4)] mb-3 hidden md:block" />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
              Selecciona un canal para comunicarte directamente conmigo o revisar mi trabajo en la red.
            </p>
          </div>

          {/* ── Channel cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {channels.map((ch, i) => {
              const Icon = ch.icon;
              const isConnecting = connecting === ch.name;
              return (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChannelClick(ch.name, ch.url)}
                  disabled={!!connecting}
                  className={`text-left group relative border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/50 hover:bg-[var(--color-surface-2)] rounded-sm p-5 cursor-pointer transition-all duration-300 overflow-hidden ${ch.hoverColor} ${isConnecting ? 'pointer-events-none' : ''}`}
                >
                  {/* Top bar accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: ch.accentColor }}
                  />

                  {/* Corner glow on hover */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${ch.accentColor}15, transparent 70%)`,
                    }}
                  />

                  <div className="flex justify-between items-start mb-4 pb-3 border-b border-[var(--color-surface-4)] relative z-10">
                    <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
                      Canal {ch.id}
                    </span>
                    <motion.div
                      animate={isConnecting ? { rotate: 360 } : {}}
                      transition={isConnecting ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${isConnecting ? 'text-[var(--color-orange)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]'}`} aria-hidden="true" />
                    </motion.div>
                  </div>

                  <h3 className="text-base font-heading font-bold text-[var(--color-text-primary)] mb-1 tracking-tight relative z-10">
                    {ch.name}
                  </h3>
                  <p className="text-xs font-mono text-[var(--color-orange)] mb-3 truncate relative z-10">
                    {ch.handle}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed relative z-10">
                    {ch.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-orange)] transition-colors uppercase tracking-wider relative z-10">
                    {isConnecting ? (
                      <>
                        <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                        Conectando...
                      </>
                    ) : (
                      <>
                        <Send className="w-2.5 h-2.5" />
                        Abrir
                        <ArrowUpRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── Status bar ── */}
          <motion.div
            className="border border-[var(--color-surface-4)] bg-[var(--color-surface-2)]/30 rounded-sm px-4 py-3 min-h-[44px] flex items-center"
            animate={{ borderColor: status ? 'var(--color-orange)' : 'var(--color-surface-4)' }}
            transition={{ duration: 0.3 }}
          >
            <span className={`w-2 h-2 rounded-full mr-2.5 shrink-0 ${status && !status.includes('listo') ? 'bg-[var(--color-orange)] animate-pulse' : 'bg-emerald-500'}`} />
            <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
              {status || 'Sistema listo — selecciona un canal de comunicación'}
            </p>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
