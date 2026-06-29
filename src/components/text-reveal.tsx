'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  type?: 'words' | 'chars' | 'fade';
}

function splitChars(text: string): string[] {
  const result: string[] = [];
  for (const ch of text) {
    result.push(ch);
  }
  return result;
}

export function TextReveal({ children, className = '', as: Tag = 'p', delay = 0, type = 'fade' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (type === 'chars' && typeof children === 'string') {
    const chars = splitChars(children);
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <Tag className="inline">
          {chars.map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: '100%', opacity: 0, rotateZ: i % 3 === 0 ? 6 : -6 }}
              animate={isInView ? { y: 0, opacity: 1, rotateZ: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.025,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </Tag>
      </div>
    );
  }

  if (type === 'words' && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <Tag className="inline">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0, 1],
                  delay: delay + i * 0.06,
                }}
              >
                {word}{i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </Tag>
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0, 1],
          delay,
        }}
      >
        <Tag>{children}</Tag>
      </motion.div>
    </div>
  );
}
