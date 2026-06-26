import React from 'react';
import { Hero } from '@/components/hero';
import { BentoGrid } from '@/components/bento-grid';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#09090b] overflow-x-hidden">
      {/* Fondo de rejilla técnica sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />
      
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 pb-20 flex flex-col gap-2">
        <Hero />
        <BentoGrid />
      </main>
      
      <footer className="relative z-10 border-t border-zinc-900 bg-zinc-950/20 py-8 text-center text-[10px] text-zinc-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} — Portafolio Profesional de Datos & RPA</p>
          <p>Next.js (App Router) + Tailwind CSS + shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}
