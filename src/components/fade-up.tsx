'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Shared IntersectionObserver singleton ───────────────── */

const observerCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cb = observerCallbacks.get(entry.target);
          cb?.();
          sharedObserver?.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
  }
  return sharedObserver;
}

/* ── Hook ────────────────────────────────────────────────── */

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    observerCallbacks.set(el, () => setVisible(true));
    getObserver().observe(el);

    return () => {
      observerCallbacks.delete(el);
    };
  }, []);

  return { ref, visible };
}

/* ── Variants ────────────────────────────────────────────── */

export type ScrollAnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'none';

const animClass: Record<ScrollAnimationType, string> = {
  'fade-up':    'scroll-reveal',
  'fade-left':  'scroll-slide-left',
  'fade-right': 'scroll-slide-right',
  'scale':      'scroll-scale',
  'none':       '',
};

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: ScrollAnimationType;
}

export function FadeUp({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
}: FadeUpProps) {
  const { ref, visible } = useReveal();
  const cls = animClass[animation];

  return (
    <div
      ref={ref}
      className={[cls, visible ? 'is-visible' : '', className].filter(Boolean).join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function useScrollReveal() {
  return useReveal();
}
