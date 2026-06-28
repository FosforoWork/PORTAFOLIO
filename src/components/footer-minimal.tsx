import React from 'react';

export function FooterMinimal() {
  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-steel)] py-8 text-center text-[9px] font-hud w-full border-t border-[var(--color-concrete)]/10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} SAMUEL AGUILERA. ALL RIGHTS RESERVED.</p>
        <p className="text-[var(--color-rust)] animate-pulse">
          STATUS: ONLINE // VERSION: 0.1.0-BETA
        </p>
      </div>
    </footer>
  );
}
