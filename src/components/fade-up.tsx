'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

/* ── Intersection Observer Hook ──────────────────────────── */

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const { threshold = 0.08, rootMargin = '0px 0px -40px 0px', triggerOnce = true } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const timer = setTimeout(() => setIsIntersecting(true), 0);
      return () => clearTimeout(timer);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isIntersecting };
}

/* ── Animation variant types ─────────────────────────────── */

export type ScrollAnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'none';

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  animation?: ScrollAnimationType;
}

/* ── CSS-based FadeUp (used by most sections) ─────────────── */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
}: FadeUpProps) {
  const { ref, isIntersecting } = useIntersectionObserver();
  const reducedMotion = useGameStore((state) => state.reducedMotion);

  const animClass = reducedMotion || animation === 'none'
    ? ''
    : animation === 'fade-left'  ? 'scroll-slide-left'
    : animation === 'fade-right' ? 'scroll-slide-right'
    : animation === 'scale'      ? 'scroll-scale'
    : 'scroll-reveal';

  const visibleClass = isIntersecting ? 'is-visible' : '';

  return (
    <div
      ref={ref}
      className={[animClass, visibleClass, className].filter(Boolean).join(' ')}
      style={reducedMotion || animation === 'none' ? {} : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Stagger container: reveals children with cascade delay ─ */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  animation?: ScrollAnimationType;
}

export function StaggerReveal({
  children,
  className = '',
  staggerMs = 80,
  animation = 'fade-up',
}: StaggerProps) {
  const { ref, isIntersecting } = useIntersectionObserver();
  const reducedMotion = useGameStore((state) => state.reducedMotion);

  const animClass = reducedMotion || animation === 'none'
    ? ''
    : animation === 'fade-left'  ? 'scroll-slide-left'
    : animation === 'fade-right' ? 'scroll-slide-right'
    : animation === 'scale'      ? 'scroll-scale'
    : 'scroll-reveal';

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className={[animClass, isIntersecting ? 'is-visible' : ''].filter(Boolean).join(' ')}
              style={reducedMotion ? {} : { transitionDelay: `${i * staggerMs}ms` }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

/* ── Framer Motion version (for precise spring animations) ── */

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initial?: Record<string, number | string>;
  whileInView?: Record<string, number | string>;
  viewport?: { once?: boolean; margin?: string };
  transition?: { duration?: number; ease?: number[] | string; delay?: number };
}

export function FadeUpMotion({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  animation = 'fade-up',
}: FadeUpProps) {
  const tagStr = typeof Tag === 'string' ? Tag : 'div';
  const motionObj = motion as unknown as Record<string, React.ComponentType<MotionProps>>;
  const MotionTag = motionObj[tagStr] || motion.div;

  type MotionValues = Record<string, number | string>;

  const initial: MotionValues =
    animation === 'fade-left'  ? { opacity: 0, x: -28 }
    : animation === 'fade-right' ? { opacity: 0, x: 28 }
    : animation === 'scale'      ? { opacity: 0, scale: 0.96 }
    : animation === 'none'       ? { opacity: 1 }
    : { opacity: 0, y: 28 };

  const whileInView: MotionValues =
    animation === 'fade-left'  ? { opacity: 1, x: 0 }
    : animation === 'fade-right' ? { opacity: 1, x: 0 }
    : animation === 'scale'      ? { opacity: 1, scale: 1 }
    : animation === 'none'       ? { opacity: 1 }
    : { opacity: 1, y: 0 };

  return (
    <MotionTag
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ── useScrollReveal hook for manual usage ─────────────────── */
export function useScrollReveal(options: UseIntersectionObserverOptions = {}) {
  return useIntersectionObserver(options);
}
