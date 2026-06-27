import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { FadeUp } from './fade-up';
import { Magnetic } from './magnetic';

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-[var(--color-charcoal)] text-[var(--color-oatmeal)] border-t border-[var(--color-black)]/20 mt-12 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <span className="text-sm font-mono tracking-widest text-[var(--color-rust)] uppercase block mb-6">
            Contacto
          </span>
          <h2 className="text-5xl md:text-7xl font-heading mb-12">
            Hablemos de tu próximo proyecto
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
            <Magnetic>
              <a 
                href="mailto:samuelagss1@gmail.com"
                className="flex items-center gap-3 px-8 py-4 bg-[var(--color-rust)] hover:bg-[var(--color-rust)]/90 text-[var(--color-oatmeal)] rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
              >
                <Mail size={18} />
                Enviar Email
              </a>
            </Magnetic>
            
            <Magnetic>
              <a 
                href="https://www.linkedin.com/in/samuelaguileraaraujo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-[var(--color-oatmeal)]/10 hover:bg-[var(--color-oatmeal)]/20 text-[var(--color-oatmeal)] border border-[var(--color-oatmeal)]/25 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </Magnetic>

            <Magnetic>
              <a 
                href="https://github.com/FosforoWork"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-[var(--color-oatmeal)]/10 hover:bg-[var(--color-oatmeal)]/20 text-[var(--color-oatmeal)] border border-[var(--color-oatmeal)]/25 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
              >
                <Github size={18} />
                GitHub
              </a>
            </Magnetic>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
