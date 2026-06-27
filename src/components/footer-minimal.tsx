import React from 'react';

export function FooterMinimal() {
  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-concrete)]/60 py-8 text-center text-xs font-mono w-full">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Samuel Aguilera. Todos los derechos reservados.</p>
        <p>
          Diseñado con <span className="text-[var(--color-rust)]">❤</span> en Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
