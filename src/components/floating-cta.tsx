'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[var(--color-orange)] text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-sm shadow-lg hover:shadow-[0_0_30px_rgba(142,202,154,0.3)] hover:bg-[var(--color-orange-vivid)] transition-all duration-200 cursor-pointer"
          aria-label="Contactar"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Contactar</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
