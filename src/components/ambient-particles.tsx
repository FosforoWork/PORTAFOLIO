'use client';

import { useRef, useEffect } from 'react';
import { animate } from 'animejs';
import { useMounted } from '@/hooks/use-mounted';
import { usePreferences } from '@/store/preferences-store';

interface Glyph {
  x: number
  y: number
  size: number
  alpha: number
  rotation: number
  phase: number
  speed: number
  driftX: number
  type: 'dot' | 'ring' | 'cross' | 'diamond'
}

function createGlyph(w: number, h: number, i: number): Glyph {
  const side = Math.max(w, h);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: 1 + Math.random() * 1.8,
    alpha: 0.05 + Math.random() * 0.15,
    rotation: Math.random() * Math.PI * 2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.25,
    driftX: (Math.random() - 0.5) * side * 0.04,
    type: (['dot', 'ring', 'cross', 'diamond'] as const)[i % 4],
  };
}

function drawGlyph(
  ctx: CanvasRenderingContext2D,
  g: Glyph,
  time: number,
  dpr: number,
) {
  const t = time * g.speed + g.phase;
  const floatY = Math.sin(t) * 18 * dpr;
  const floatX = Math.cos(t * 0.7 + g.phase) * 12 * dpr;
  const sx = g.x + floatX;
  const sy = g.y + floatY;
  const s = g.size * dpr;
  const alpha = g.alpha * (0.6 + 0.4 * Math.sin(t * 0.5 + g.phase));

  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(g.rotation + t * 0.1);
  ctx.globalAlpha = alpha;

  const color = '#F97316';

  switch (g.type) {
    case 'dot': {
      ctx.beginPath();
      ctx.arc(0, 0, s * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      break;
    }
    case 'ring': {
      ctx.beginPath();
      ctx.arc(0, 0, s * 3, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.5, s * 0.6);
      ctx.stroke();
      break;
    }
    case 'cross': {
      const arm = s * 3;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.5, s * 0.5);
      ctx.beginPath();
      ctx.moveTo(-arm, 0);
      ctx.lineTo(arm, 0);
      ctx.moveTo(0, -arm);
      ctx.lineTo(0, arm);
      ctx.stroke();
      break;
    }
    case 'diamond': {
      const r = s * 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(r, 0);
      ctx.lineTo(0, r);
      ctx.lineTo(-r, 0);
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.5, s * 0.5);
      ctx.stroke();
      break;
    }
  }

  ctx.restore();
}

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glyphsRef = useRef<Glyph[]>([]);
  const dimsRef = useRef({ w: 0, h: 0 });
  const mounted = useMounted();
  const reducedMotion = usePreferences((s) => s.reducedMotion);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      dimsRef.current = { w, h };
    }

    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    glyphsRef.current = Array.from({ length: count }, (_, i) =>
      createGlyph(dimsRef.current.w, dimsRef.current.h, i),
    );
    const glyphs = glyphsRef.current;

    // Use anime.js to drive a continuous time value
    const timeObj = { t: 0 };
    const anim = animate(timeObj, {
      t: 1000,
      duration: 1000000,
      loop: true,
      ease: 'linear',
      onUpdate: () => {
        if (!running) return;
        const dpr = Math.min(window.devicePixelRatio, 2);
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

        for (const g of glyphs) {
          drawGlyph(ctx!, g, timeObj.t, dpr);
        }
      },
    });

    return () => {
      running = false;
      anim.revert();
      window.removeEventListener('resize', resize);
    };
  }, [mounted, reducedMotion]);

  if (!mounted || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  );
}
