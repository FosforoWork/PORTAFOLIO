import React from 'react';
import { ArrowDown, Sword, Shield, Brain } from 'lucide-react';
import { useGameStore } from '@/store/game-store';

export function Hero() {
  const { playSfx, reducedMotion } = useGameStore();

  const handleHover = () => {
    playSfx('hover');
  };

  const handleClick = () => {
    playSfx('click');
  };

  const attributes = [
    { name: 'STR (Procesos e Industria)', val: 85, desc: 'Optimización, Kaizen, LSS', icon: Shield, color: 'bg-red-500' },
    { name: 'INT (Modelado e Inteligencia)', val: 95, desc: 'Modelos matemáticos, ML, Python', icon: Brain, color: 'bg-sky-500' },
    { name: 'DEX (Código y Automatización)', val: 90, desc: 'TypeScript, React, SQL, Scripts', icon: Sword, color: 'bg-amber-500' },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 pt-32 pb-16 relative max-w-6xl mx-auto w-full gap-12 overflow-hidden"
      aria-label="Ficha de personaje principal"
    >
      {/* Background Micro-grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(141, 128, 113, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(141, 128, 113, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Left: Character Stats Card */}
      <div className="flex-1 text-left z-10 space-y-6 max-w-xl">
        <div className="space-y-2">
          {/* RPG HUD Subheader */}
          <div className="flex items-center gap-2 text-[10px] font-hud text-[var(--color-rust)] uppercase tracking-wider animate-pulse">
            <span className="w-2 h-2 bg-[var(--color-rust)] inline-block" />
            <span>Ficha de Personaje Seleccionado</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading text-[var(--color-charcoal)] leading-none font-bold uppercase">
            Samuel Aguilera
          </h1>

          <div className="flex flex-wrap gap-2 text-xs font-hud text-[var(--color-steel)] pt-1">
            <span>CLASE: PROCESS & DATA ENG</span>
            <span className="text-[var(--color-concrete)]">|</span>
            <span className="text-[var(--color-accentGold)]">RANGO: BLACK BELT (LSSBB)</span>
          </div>
        </div>

        <p className="text-base md:text-lg text-[var(--color-steel)] font-light leading-relaxed">
          Combino metodologías de optimización con modelado matemático y desarrollo de software para transformar datos en decisiones operativas.
        </p>

        {/* Character Attributes (STR/INT/DEX) */}
        <div className="space-y-4 pt-2 border-t border-[var(--color-concrete)]/30">
          <div className="text-[10px] font-hud text-[var(--color-charcoal)] uppercase tracking-wider">
            ATRIBUTOS BASE
          </div>
          
          <div className="space-y-3">
            {attributes.map((attr) => {
              const AttrIcon = attr.icon;
              return (
                <div key={attr.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-hud text-[10px] text-[var(--color-charcoal)]">
                      <AttrIcon size={12} className="text-[var(--color-steel)]" />
                      <span>{attr.name}</span>
                    </div>
                    <span className="font-hud text-[10px] text-[var(--color-steel)]">{attr.val}%</span>
                  </div>

                  {/* Level gauge */}
                  <div className="h-2.5 bg-[#26201B] border border-[var(--color-concrete)] p-0.5 rounded overflow-hidden">
                    <div
                      className={`h-full ${attr.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: `${attr.val}%`,
                        transitionDelay: reducedMotion ? '0s' : '0.2s'
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-steel)] block pl-5 italic">
                    {attr.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <a
            href="#projects"
            onClick={handleClick}
            onMouseEnter={handleHover}
            className="inline-flex items-center gap-2 text-xs font-hud text-[var(--color-oatmeal)] bg-[var(--color-rust)] hover:bg-[var(--color-primaryHover)] px-5 py-3 border-2 border-[var(--color-concrete)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all uppercase tracking-wider"
          >
            <span>Ver Hitos (Quests)</span>
            <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Right: Character Portrait Image Container */}
      <div className="flex-1 w-full flex items-center justify-center relative z-10">
        {/* Retro monitor border double border */}
        <div className="relative aspect-[4/3] w-full max-w-md rounded-xl overflow-hidden border-4 border-double border-[var(--color-concrete)] bg-[#26201B] p-2 transition-transform duration-300 hover:scale-[1.01] shadow-2xl">
          {/* Inner scanline filter for picture */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_6px] opacity-60" />
          <img
            src="/images/LSSBB CEO PMO Samuel Aguilera.png"
            alt="LSSBB CEO PMO Samuel Aguilera"
            className="w-full h-full object-cover rounded border border-[var(--color-concrete)]/40 filter saturate-90 contrast-110"
            loading="eager"
          />
        </div>
      </div>

      {/* Scroll Indicator at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-steel)] animate-bounce text-xs font-hud tracking-widest hidden lg:block" aria-hidden="true">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}
