import React, { useState } from 'react';
import { Mail, Linkedin, Github, Save } from 'lucide-react';
import { FadeUp } from './fade-up';
import { useGameStore } from '@/store/game-store';

export function Contact() {
  const { playSfx } = useGameStore();
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleHover = () => {
    playSfx('hover');
  };

  const handleSlotClick = (slotName: string, url: string) => {
    playSfx('save');
    setSaveStatus(`ACCEDIENDO A SLOT: ${slotName}... PROGRESS SAVED!`);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setSaveStatus(null);
    }, 800);
  };

  const slots = [
    {
      id: '01',
      name: 'EMAIL ENVOY',
      meta: 'samuelagss1@gmail.com',
      mission: 'Alianza y consulta comercial',
      url: 'mailto:samuelagss1@gmail.com',
      icon: Mail,
      color: 'hover:border-red-500/50 hover:bg-red-950/10'
    },
    {
      id: '02',
      name: 'LINKEDIN LINK',
      meta: '/in/samuelaguileraaraujo',
      mission: 'Alianza y red profesional',
      url: 'https://www.linkedin.com/in/samuelaguileraaraujo',
      icon: Linkedin,
      color: 'hover:border-sky-500/50 hover:bg-sky-950/10'
    },
    {
      id: '03',
      name: 'GITHUB CODE REPO',
      meta: 'FosforoWork',
      mission: 'Inspeccionar código fuente',
      url: 'https://github.com/FosforoWork',
      icon: Github,
      color: 'hover:border-zinc-500/50 hover:bg-zinc-950/10'
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 border-t border-[var(--color-concrete)]/20 w-full relative">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-hud tracking-widest text-[var(--color-rust)] uppercase block mb-3">
              Save Game
            </span>
            <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] mb-4 font-bold uppercase">
              Punto de Guardado
            </h2>
            <p className="text-[var(--color-steel)] font-light max-w-xl mx-auto">
              Selecciona una ranura de memoria para conectarte conmigo y guardar tus registros de progreso en esta sesión.
            </p>
          </div>

          {/* Retro Memory Card Save Layout */}
          <div className="border-4 border-double border-[var(--color-concrete)] bg-[#26201B] p-6 md:p-8 rounded-xl space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[var(--color-concrete)]/30 pb-3">
              <div className="flex items-center gap-2 text-xs font-hud text-[var(--color-accentGold)]">
                <Save size={14} className="animate-pulse" />
                <span>MEMORY CARD SELECT</span>
              </div>
              <span className="text-[9px] font-hud text-[var(--color-steel)]">
                SLOTS AVAILABLE: 3/3
              </span>
            </div>

            {/* Save Slots List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {slots.map((slot) => {
                const Icon = slot.icon;
                return (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotClick(slot.name, slot.url)}
                    onMouseEnter={handleHover}
                    className={`text-left bg-[#1A1613] border-2 border-[var(--color-concrete)]/40 rounded-lg p-4 space-y-3 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[0px_0px_0px_0px] ${slot.color}`}
                  >
                    <div className="flex justify-between items-start border-b border-[var(--color-concrete)]/20 pb-2">
                      <span className="text-[9px] font-hud text-[var(--color-steel)]">
                        SLOT {slot.id}
                      </span>
                      <Icon size={14} className="text-[var(--color-steel)]" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xs font-hud text-[var(--color-charcoal)]">
                        {slot.name}
                      </h3>
                      <p className="text-[9px] font-mono text-[var(--color-steel)] truncate">
                        {slot.meta}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--color-concrete)]/10 text-[9px] font-mono text-[var(--color-steel)]">
                      <span className="text-[8px] font-hud text-[var(--color-rust)] block">MISIÓN:</span>
                      {slot.mission}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Status bar */}
            <div className="border border-[var(--color-concrete)]/30 bg-[#1A1613] rounded p-3 min-h-[44px] flex items-center justify-center text-center">
              <p className="text-[10px] font-hud text-emerald-400 uppercase tracking-wide">
                {saveStatus || "Listo para guardar datos. Elige ranura..."}
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
