'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  // Initialize to false on both server and client to prevent hydration mismatch.
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsIO = typeof window !== 'undefined' && 'IntersectionObserver' in window;
    
    // If IntersectionObserver is not supported, set intersecting to true asynchronously to prevent cascading renders
    if (!supportsIO) {
      const timer = setTimeout(() => {
        setIsIntersecting(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) observer.unobserve(currentRef);
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef && !triggerOnce) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isIntersecting };
}

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

// 1. CSS-based FadeUp component (Fixed version to prevent hydration mismatch)
export function FadeUp({ children, className = '', delay = 0, as: Tag = 'div' }: FadeUpProps) {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <Tag
      ref={ref}
      className={`fade-up-element ${isIntersecting ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// Props interface for safe typing of pre-resolved motion components
interface MotionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initial?: Record<string, number>;
  whileInView?: Record<string, number>;
  viewport?: { once?: boolean; margin?: string };
  transition?: { duration?: number; ease?: number[] | string; delay?: number };
}

// 2. Framer Motion version of FadeUp component (High performance, SSR-safe)
export function FadeUpMotion({ children, className = '', delay = 0, as: Tag = 'div' }: FadeUpProps) {
  // Use pre-existing motion proxies instead of dynamically calling motion(Tag) to avoid creating components on render.
  const tagStr = typeof Tag === 'string' ? Tag : 'div';
  const motionObj = motion as unknown as Record<string, React.ComponentType<MotionProps>>;
  const MotionTag = motionObj[tagStr] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth custom ease out
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}


