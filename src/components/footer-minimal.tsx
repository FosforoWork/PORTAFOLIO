import React from 'react';

export function FooterMinimal() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--color-surface-4)] bg-[var(--color-surface-1)]">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: branding */}
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border border-[var(--color-orange)] rounded-sm flex items-center justify-center bg-[var(--color-surface-2)]">
            <span className="text-[7px] font-mono font-bold text-[var(--color-orange)]">SA</span>
          </span>
          <p className="text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
            © {year} Samuel Aguilera Araujo — Todos los derechos reservados
          </p>
        </div>

        {/* Right: status */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] animate-pulse" />
          <p className="text-[9px] font-mono text-[var(--color-orange)] uppercase tracking-widest font-bold">
            Disponible para nuevos proyectos
          </p>
        </div>
      </div>
    </footer>
  );
}
