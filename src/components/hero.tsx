import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, Database } from 'lucide-react';

export function Hero() {
  return (
    <header className="py-12 md:py-16 text-center md:text-left space-y-4 max-w-4xl">
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900/50 px-3 py-1 flex items-center gap-1.5 text-xs font-mono">
          <Database className="w-3 h-3 text-zinc-100" /> Data Analytics
        </Badge>
        <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900/50 px-3 py-1 flex items-center gap-1.5 text-xs font-mono">
          <Brain className="w-3 h-3 text-zinc-100" /> Data Science
        </Badge>
        <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900/50 px-3 py-1 flex items-center gap-1.5 text-xs font-mono">
          <Bot className="w-3 h-3 text-zinc-100" /> Process Automation (RPA)
        </Badge>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
        Ing. Industrial & Científico de Datos
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
        Optimización de sistemas operativos, modelado matemático y automatización inteligente. Conectando la eficiencia de procesos industriales con el poder de la analítica.
      </p>
    </header>
  );
}
