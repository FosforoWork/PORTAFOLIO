'use client';

import React, { useRef, useEffect } from 'react';
import { animate } from 'animejs';

export function FooterMinimal() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const brand = el.querySelector('.footer-brand') as HTMLElement | null;
    const status = el.querySelector('.footer-status') as HTMLElement | null;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();

        const targets: HTMLElement[] = [];
        if (brand) targets.push(brand);
        if (status) targets.push(status);

        targets.forEach((t) => {
          t.style.opacity = '0';
          t.style.transform = 'translateY(12px)';
        });

        animate(targets, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 600,
          delay: (_, i) => (i ?? 0) * 150,
          ease: 'outCubic',
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full border-t border-[var(--color-surface-4)] bg-[var(--color-surface-1)]"
    >
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
        {/* Left: branding */}
        <div className="footer-brand flex items-center gap-3">
          <span className="w-5 h-5 border border-[var(--color-orange)] rounded-sm flex items-center justify-center bg-[var(--color-surface-2)]">
            <span className="text-[10px] font-mono font-bold text-[var(--color-orange)]">SA</span>
          </span>
          <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
            &copy; {year} Samuel Aguilera Araujo &mdash; Todos los derechos reservados
          </p>
        </div>

        {/* Right: status */}
        <div className="footer-status flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] animate-pulse" />
          <p className="text-xs font-mono text-[var(--color-orange)] uppercase tracking-widest font-bold">
            Disponible para nuevos proyectos
          </p>
        </div>
      </div>
    </footer>
  );
}
