'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_PAIRS = ['A', 'T', 'G', 'C'] as const;
const PAIR_COLORS: Record<string, string> = {
  A: '#38BDF8',
  T: '#7DD3FC',
  G: '#34D399',
  C: '#6EE7B7',
};

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [unwinding, setUnwinding] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const unwindRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUnwinding(true);
            setOverlayOpacity(0.9);
          }, 200);
          return 100;
        }
        return p + Math.floor(Math.random() * 6) + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const drawDna = useCallback((canvas: HTMLCanvasElement, prog: number, time: number, separation: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const size = 520;
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    const cx = (size / 2) * dpr;
    const cy = (size / 2) * dpr;
    const radius = 117 * dpr;
    const height = 390 * dpr;
    const pairs = 24;
    const revealHeight = (prog / 100) * height;
    const maxDrift = 286 * dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';

    const baseStep = height / pairs;
    const easedSep = 1 - Math.pow(1 - separation, 2);

    for (let i = 0; i < pairs; i++) {
      const t = i / (pairs - 1);
      const y = cy - height / 2 + i * baseStep;

      if (y - cy + height / 2 > revealHeight) break;

      const angle = t * Math.PI * 4 + time;
      const baseX1 = cx + Math.cos(angle) * radius;
      const baseX2 = cx + Math.cos(angle + Math.PI) * radius;

      const drift1 = (baseX1 > cx ? 1 : -1) * easedSep * maxDrift;
      const drift2 = (baseX2 > cx ? 1 : -1) * easedSep * maxDrift;

      const x1 = baseX1 + drift1;
      const x2 = baseX2 + drift2;

      const alpha = (0.15 + 0.85 * (1 - Math.abs(t - 0.5) * 1.2)) * (1 - easedSep * 0.6);

      if (alpha < 0.01) continue;

      // Strand nodes
      ctx.fillStyle = '#38BDF8';
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 3.25 * dpr;
      ctx.globalAlpha = alpha * 0.7;
      ctx.beginPath();
      ctx.arc(x1, y, Math.max(0.65, 3.25 * (1 - easedSep * 0.4)) * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x2, y, Math.max(0.65, 3.25 * (1 - easedSep * 0.4)) * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Backbone lines
      if (i < pairs - 1) {
        const nt = (i + 1) / (pairs - 1);
        const ny = cy - height / 2 + (i + 1) * baseStep;
        const nAngle = nt * Math.PI * 4 + time;
        const nBaseX1 = cx + Math.cos(nAngle) * radius;
        const nBaseX2 = cx + Math.cos(nAngle + Math.PI) * radius;
        const nDrift1 = (nBaseX1 > cx ? 1 : -1) * easedSep * maxDrift;
        const nDrift2 = (nBaseX2 > cx ? 1 : -1) * easedSep * maxDrift;
        const nx1 = nBaseX1 + nDrift1;
        const nx2 = nBaseX2 + nDrift2;

        ctx.globalAlpha = alpha * 0.25;
        ctx.lineWidth = 2.6 * dpr;
        ctx.strokeStyle = '#38BDF8';
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(nx1, ny);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y);
        ctx.lineTo(nx2, ny);
        ctx.stroke();

        ctx.globalAlpha = alpha * 0.04;
        ctx.lineWidth = 10.4 * dpr;
        ctx.strokeStyle = '#38BDF8';
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(nx1, ny);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y);
        ctx.lineTo(nx2, ny);
        ctx.stroke();
      }

      // Base pair — stretches and breaks
      const breakpoint = 0.5;
      if (easedSep < breakpoint) {
        const pairAlpha = 1 - easedSep / breakpoint;
        const pairIndex = i % BASE_PAIRS.length;
        const base = BASE_PAIRS[pairIndex];
        const color = PAIR_COLORS[base];

        ctx.globalAlpha = alpha * 0.6 * pairAlpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(0.4, 1.95 * pairAlpha) * dpr;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        ctx.globalAlpha = alpha * 0.3 * pairAlpha;
        ctx.beginPath();
        ctx.arc(cx + (drift1 + drift2) / 2, y, 3.9 * dpr * pairAlpha, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
          cx + (drift1 + drift2) / 2, y, 0,
          cx + (drift1 + drift2) / 2, y, 3.9 * dpr * pairAlpha
        );
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.globalAlpha = alpha * 0.35 * pairAlpha;
        ctx.fillStyle = color;
        ctx.font = `bold ${11.7 * dpr * pairAlpha}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const labelX = x1 > cx ? x1 + 13 * dpr : x1 - 13 * dpr;
        ctx.fillText(base, labelX, y);
      } else {
        // Broken base pair — particles flying apart
        const fragAlpha = (easedSep - breakpoint) / (1 - breakpoint);
        ctx.globalAlpha = alpha * 0.15 * (1 - fragAlpha);
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(x1 + (Math.random() - 0.5) * 13 * dpr * fragAlpha, y + (Math.random() - 0.5) * 13 * dpr * fragAlpha, 1.3 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x2 + (Math.random() - 0.5) * 13 * dpr * fragAlpha, y + (Math.random() - 0.5) * 13 * dpr * fragAlpha, 1.3 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let running = true;
    const frame = () => {
      if (!running) return;
      timeRef.current += 0.012;

      if (unwinding) {
        unwindRef.current += 0.025;
        setOverlayOpacity((o) => Math.max(0, o - 0.02));
        if (unwindRef.current >= 1) {
          setIsLoading(false);
          running = false;
          return;
        }
      }

      drawDna(canvas, progress, timeRef.current, unwinding ? unwindRef.current : 0);
      animRef.current = requestAnimationFrame(frame);
    };
    frame();
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [isLoading, progress, unwinding, drawDna]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={false}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface-0)',
            opacity: overlayOpacity,
          }}
        >
          <div className="flex flex-col items-center gap-10">
            <canvas
              ref={canvasRef}
              className="w-[520px] h-[520px] max-w-[90vw] max-h-[90vw]"
              aria-hidden="true"
            />

            <motion.span
              animate={unwinding ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-[var(--color-cyan)] tracking-[0.3em] uppercase"
            >
              {unwinding ? 'Desenrollando secuencia...' : 'Sintetizando ADN Profesional'}
            </motion.span>

            <motion.div
              animate={unwinding ? { opacity: 0, scaleX: 0.8 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-80 h-[3px] bg-[var(--color-surface-4)] overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-cyan-vivid)]"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </motion.div>

            <motion.span
              key={progress}
              initial={{ opacity: 0, y: 4 }}
              animate={unwinding ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
              className="text-[11px] font-mono text-[var(--color-text-muted)] tabular-nums"
            >
              {Math.min(progress, 100)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
