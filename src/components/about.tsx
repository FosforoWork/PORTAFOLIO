import React, { useState, useEffect, useRef } from 'react';
import { FadeUp } from './fade-up';
import { useGameStore } from '@/store/game-store';
import { MessageSquareCode, Globe, MapPin, Award } from 'lucide-react';

export function About() {
  const { playSfx, soundEnabled, reducedMotion } = useGameStore();
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const dialogues = [
    "Saludos, viajero. Soy Samuel Aguilera. Mi misión principal es conectar los procesos industriales físicos con el poder de la inteligencia de datos y el software moderno.",
    "Para lograrlo, convoco metodologías de optimización como Lean Six Sigma (LSS) combinadas con modelado matemático avanzado y desarrollo web ágil."
  ];

  // Typewriter effect
  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(dialogues[dialogueIndex]);
      return;
    }

    setDisplayedText('');
    let charIndex = 0;
    const currentText = dialogues[dialogueIndex];

    const typeChar = () => {
      if (charIndex < currentText.length) {
        setDisplayedText((prev) => prev + currentText.charAt(charIndex));
        
        // Play very quiet subtle beep/click sound for typewriter effect (every 3 characters to avoid audio overload)
        if (soundEnabled && charIndex % 3 === 0) {
          playSfx('hover');
        }
        
        charIndex++;
        typingTimerRef.current = setTimeout(typeChar, 25);
      }
    };

    typeChar();

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [dialogueIndex, soundEnabled, reducedMotion]);

  const handleNextDialogue = () => {
    playSfx('click');
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
  };

  const handleHover = () => {
    playSfx('hover');
  };

  return (
    <section id="about" className="py-24 px-6 border-t border-[var(--color-concrete)]/20 max-w-5xl mx-auto w-full">
      <FadeUp>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center md:text-left mb-8">
            <span className="text-xs font-hud tracking-widest text-[var(--color-rust)] uppercase block mb-2">
              NPC Dialogues
            </span>
            <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-charcoal)] font-bold uppercase">
              Biografía del NPC
            </h2>
          </div>

          {/* Dialogue Box Row */}
          <div className="relative border-4 border-double border-[var(--color-concrete)] bg-[#26201B] p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start shadow-xl">
            
            {/* NPC Avatar Portrait (SVG Retro style) */}
            <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 bg-[#352D26] border-2 border-[var(--color-concrete)] rounded-lg flex items-center justify-center p-2 relative overflow-hidden select-none">
              <svg 
                viewBox="0 0 64 64" 
                className="w-full h-full text-[var(--color-rust)] fill-current"
                style={{ imageRendering: 'pixelated' }}
                aria-hidden="true"
              >
                {/* Background Grid */}
                <rect x="0" y="0" width="64" height="64" fill="#3D342C" />
                {/* Character Helmet (LSS Safety Helmet Orange/Rust) */}
                <rect x="16" y="8" width="32" height="12" fill="#B7410E" />
                <rect x="12" y="14" width="40" height="6" fill="#B7410E" />
                {/* Safety Helmet Rim */}
                <rect x="8" y="18" width="48" height="3" fill="#D35400" />
                {/* Face/Skin */}
                <rect x="18" y="21" width="28" height="22" fill="#E6D3B8" />
                {/* Safety Glasses (Blue/Steel) */}
                <rect x="16" y="25" width="12" height="6" fill="#3465A4" />
                <rect x="36" y="25" width="12" height="6" fill="#3465A4" />
                <rect x="28" y="27" width="8" height="2" fill="#3D342C" />
                {/* Hair/Beard */}
                <rect x="18" y="37" width="28" height="6" fill="#3D342C" />
                {/* Collar/Shirt */}
                <rect x="16" y="43" width="32" height="13" fill="#8D8071" />
                {/* Safety Vest (Green/Yellow) */}
                <rect x="20" y="47" width="24" height="9" fill="#4E9A06" />
                <rect x="28" y="47" width="8" height="9" fill="#DCA134" />
              </svg>
              {/* Badge label inside dialogue */}
              <span className="absolute bottom-0 inset-x-0 bg-[var(--color-concrete)] text-[8px] font-hud text-[var(--color-oatmeal)] text-center py-0.5 font-bold">
                SAMUEL
              </span>
            </div>

            {/* Dialogue Text Content Area */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center border-b border-[var(--color-concrete)]/40 pb-2">
                <span className="text-[10px] font-hud text-[var(--color-accentGold)] tracking-wider">
                  SAMUEL AGUILERA (PROCESOS & DATOS)
                </span>
                <span className="text-[9px] font-mono text-[var(--color-steel)] uppercase">
                  Active Dialogue {dialogueIndex + 1}/{dialogues.length}
                </span>
              </div>

              <div className="min-h-[70px] md:min-h-[60px]">
                <p className="text-sm font-hud text-[var(--color-charcoal)] leading-relaxed tracking-wide">
                  {displayedText}
                  <span className="animate-pulse font-bold ml-0.5 text-[var(--color-rust)]">_</span>
                </p>
              </div>

              {/* Action: Next Dialogue */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextDialogue}
                  onMouseEnter={handleHover}
                  className="px-3 py-1.5 border border-[var(--color-concrete)] bg-[#1A1613] hover:bg-[#352D26] text-[9px] font-hud text-[var(--color-charcoal)] cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-[0px_0px_0px_0px]"
                >
                  [ SIGUIENTE DIÁLOGO ]
                </button>
              </div>
            </div>

          </div>

          {/* Stats Info Grid (Dialogue rewards/attributes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            
            <div className="border border-[var(--color-concrete)]/40 bg-[#26201B] p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded bg-[#1a1613] text-[var(--color-rust)] border border-[var(--color-concrete)]/40">
                <MessageSquareCode size={18} />
              </div>
              <div>
                <span className="text-[9px] font-hud text-[var(--color-steel)] block">ESPECIALIDAD</span>
                <span className="text-xs font-hud text-[var(--color-charcoal)]">Procesos & Analítica</span>
              </div>
            </div>

            <div className="border border-[var(--color-concrete)]/40 bg-[#26201B] p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded bg-[#1a1613] text-[var(--color-accentGold)] border border-[var(--color-concrete)]/40">
                <Award size={18} />
              </div>
              <div>
                <span className="text-[9px] font-hud text-[var(--color-steel)] block">CERTIFICACIÓN</span>
                <span className="text-xs font-hud text-[var(--color-charcoal)]">LSS Black Belt (En Dev)</span>
              </div>
            </div>

            <div className="border border-[var(--color-concrete)]/40 bg-[#26201B] p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded bg-[#1a1613] text-[var(--color-accentGreen)] border border-[var(--color-concrete)]/40">
                <Globe size={18} />
              </div>
              <div>
                <span className="text-[9px] font-hud text-[var(--color-steel)] block">IDIOMAS</span>
                <span className="text-xs font-hud text-[var(--color-charcoal)]">ES / EN / PT (BR)</span>
              </div>
            </div>

            <div className="border border-[var(--color-concrete)]/40 bg-[#26201B] p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded bg-[#1a1613] text-sky-400 border border-[var(--color-concrete)]/40">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[9px] font-hud text-[var(--color-steel)] block">UBICACIÓN</span>
                <span className="text-xs font-hud text-[var(--color-charcoal)]">Remoto / LATAM</span>
              </div>
            </div>

          </div>

        </div>
      </FadeUp>
    </section>
  );
}
