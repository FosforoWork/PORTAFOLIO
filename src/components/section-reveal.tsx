'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={isInView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
