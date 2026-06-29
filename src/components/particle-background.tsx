'use client';

import { useRef, useEffect } from 'react';

interface Point { x: number; y: number; }
interface Trace { x1: number; y1: number; x2: number; y2: number; }
interface Pulse {
  edge: number;
  t: number;
  speed: number;
  size: number;
  generation: number;
  opacity: number;
  glowSize: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const accent = '#8ECA9A';
    let traces: Trace[] = [];
    let vias: Point[] = [];
    let viaKeys: Set<string> = new Set();
    let graph = new Map<string, number[]>();
    let pulses: Pulse[] = [];
    let animationId: number;
    const MAX_GENERATION = 4;
    const CASCADE_DECAY = 0.6;
    const MAX_PULSES = 80;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    function generateCircuit(w: number, h: number) {
      const pts: Point[] = [];
      const spacing = 60 + Math.random() * 40;
      const cols = Math.floor(w / spacing);
      const rows = Math.floor(h / spacing);
      const offsetX = (w - cols * spacing) / 2;
      const offsetY = (h - rows * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.55) continue;
          pts.push({
            x: offsetX + c * spacing + (Math.random() - 0.5) * spacing * 0.3,
            y: offsetY + r * spacing + (Math.random() - 0.5) * spacing * 0.3,
          });
        }
      }

      const edges: Trace[] = [];
      for (const p of pts) {
        const neighbors = pts.filter(
          (q) => q !== p && Math.abs(q.x - p.x) + Math.abs(q.y - p.y) < spacing * 1.5
        );
        for (const n of neighbors) {
          if (Math.random() > 0.3) continue;
          const key1 = `${p.x},${p.y}-${n.x},${n.y}`;
          const key2 = `${n.x},${n.y}-${p.x},${p.y}`;
          if (edges.some((e) => `${e.x1},${e.y1}-${e.x2},${e.y2}` === key1 || `${e.x1},${e.y1}-${e.x2},${e.y2}` === key2)) continue;
          const horizontal = Math.abs(n.y - p.y) < Math.abs(n.x - p.x);
          if (horizontal) {
            const midX = (p.x + n.x) / 2;
            edges.push({ x1: p.x, y1: p.y, x2: midX, y2: p.y });
            edges.push({ x1: midX, y1: p.y, x2: midX, y2: n.y });
            edges.push({ x1: midX, y1: n.y, x2: n.x, y2: n.y });
          } else {
            const midY = (p.y + n.y) / 2;
            edges.push({ x1: p.x, y1: p.y, x2: p.x, y2: midY });
            edges.push({ x1: p.x, y1: midY, x2: n.x, y2: midY });
            edges.push({ x1: n.x, y1: midY, x2: n.x, y2: n.y });
          }
        }
      }

      const viaPts = pts.filter(() => Math.random() > 0.4);
      return { vias: viaPts, edges };
    }

    function buildGraph() {
      graph.clear();
      viaKeys.clear();
      for (const v of vias) {
        viaKeys.add(`${v.x},${v.y}`);
      }
      traces.forEach((e, i) => {
        const sk = `${e.x1},${e.y1}`;
        const ek = `${e.x2},${e.y2}`;
        if (!graph.has(sk)) graph.set(sk, []);
        if (!graph.has(ek)) graph.set(ek, []);
        graph.get(sk)!.push(i);
        graph.get(ek)!.push(i);
      });
    }

    function spawnSeedPulses(count: number) {
      const c = Math.min(count, MAX_PULSES);
      for (let i = 0; i < c; i++) {
        pulses.push({
          edge: Math.floor(Math.random() * Math.max(1, traces.length)),
          t: Math.random(),
          speed: 0.15 + Math.random() * 0.35,
          size: 3 + Math.random() * 5,
          generation: 0,
          opacity: 1,
          glowSize: 1,
        });
      }
    }

    function cascadePulse(srcIdx: number, endKey: string, parentSpeed: number, parentSize: number) {
      const connected = graph.get(endKey) || [];
      const newEdges: number[] = [];
      for (const idx of connected) {
        if (idx !== srcIdx && !pulses.some(p => p.edge === idx)) {
          newEdges.push(idx);
        }
      }
      if (newEdges.length === 0) return;

      const perChild = Math.min(1, MAX_PULSES / (pulses.length + newEdges.length + 1));
      for (const idx of newEdges) {
        if (Math.random() > perChild) continue;
        if (pulses.length >= MAX_PULSES) return;
        pulses.push({
          edge: idx,
          t: 0,
          speed: parentSpeed * (CASCADE_DECAY + Math.random() * 0.15),
          size: parentSize * CASCADE_DECAY,
          generation: pulses.find(p => p.edge === srcIdx)?.generation ?? 0,
          opacity: 0.6,
          glowSize: 1,
        });
      }
    }

    function init() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const circuit = generateCircuit(w, h);
      traces = circuit.edges;
      vias = circuit.vias;
      buildGraph();
      pulses = [];
      spawnSeedPulses(12);
    }

    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio, 2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Layer 1: Main traces
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1 * dpr;
      ctx.globalAlpha = 0.1;
      for (const t of traces) {
        ctx.beginPath();
        ctx.moveTo(t.x1 * dpr, t.y1 * dpr);
        ctx.lineTo(t.x2 * dpr, t.y2 * dpr);
        ctx.stroke();
      }

      // Layer 2: Secondary faint traces
      ctx.globalAlpha = 0.035;
      ctx.lineWidth = 0.5 * dpr;
      for (const t of traces) {
        ctx.beginPath();
        ctx.moveTo(t.x1 * dpr, t.y1 * dpr);
        ctx.lineTo(t.x2 * dpr, t.y2 * dpr);
        ctx.stroke();
      }

      // Layer 3: Via dots
      ctx.globalAlpha = 0.18;
      for (const v of vias) {
        ctx.beginPath();
        ctx.arc(v.x * dpr, v.y * dpr, 2 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
        ctx.globalAlpha = 0.05;
        ctx.beginPath();
        ctx.arc(v.x * dpr, v.y * dpr, 5 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.18;
      }

      // Layer 4: Pulse cascades
      const toRemove: number[] = [];
      const newCascades: { edge: number; speed: number; size: number; gen: number; endKey: string }[] = [];

      for (let pi = 0; pi < pulses.length; pi++) {
        const p = pulses[pi];
        if (p.edge >= traces.length) {
          toRemove.push(pi);
          continue;
        }
        const e = traces[p.edge];
        const dx = e.x2 - e.x1;
        const dy = e.y2 - e.y1;
        const px = (e.x1 + dx * p.t) * dpr;
        const py = (e.y1 + dy * p.t) * dpr;

        // Glow
        const glowR = p.size * p.glowSize * dpr;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        grad.addColorStop(0, accent);
        grad.addColorStop(0.15, accent);
        grad.addColorStop(0.5, accent);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.12 * p.opacity * (0.6 + 0.4 * Math.sin(p.t * Math.PI));
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = 0.5 * p.opacity * (0.6 + 0.4 * Math.sin(p.t * Math.PI));
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.35 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();

        // Trail
        const trailLen = 0.12;
        const ts = Math.max(0, p.t - trailLen);
        ctx.globalAlpha = 0.06 * p.opacity;
        ctx.lineWidth = 1.5 * dpr;
        ctx.strokeStyle = accent;
        ctx.beginPath();
        ctx.moveTo((e.x1 + dx * ts) * dpr, (e.y1 + dy * ts) * dpr);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Advance pulse
        p.t += p.speed * 0.006;

        if (p.t >= 1) {
          const endKey = `${e.x2},${e.y2}`;
          const isVia = viaKeys.has(endKey);

          if (isVia && p.generation < MAX_GENERATION) {
            // Queue cascade from this via
            newCascades.push({
              edge: p.edge,
              speed: p.speed,
              size: p.size,
              gen: p.generation + 1,
              endKey,
            });
          }

          // Reset or remove
          if (pulses.length < MAX_PULSES * 0.7) {
            p.t = 0;
            p.edge = Math.floor(Math.random() * traces.length);
            p.generation = 0;
            p.opacity = 1;
          } else {
            toRemove.push(pi);
          }
        }
      }

      // Process cascades
      const seenKeys = new Set<string>();
      for (const c of newCascades) {
        const connected = graph.get(c.endKey) || [];
        const available = connected.filter(idx => idx !== c.edge);
        const perChild = Math.min(1, (MAX_PULSES - pulses.length) / (available.length || 1));
        for (const idx of available) {
          if (Math.random() > perChild) continue;
          if (pulses.length >= MAX_PULSES) break;
          const childKey = `${c.endKey}-${idx}`;
          if (seenKeys.has(childKey)) continue;
          seenKeys.add(childKey);
          pulses.push({
            edge: idx,
            t: 0,
            speed: c.speed * (CASCADE_DECAY + Math.random() * 0.1),
            size: c.size * CASCADE_DECAY,
            generation: c.gen,
            opacity: 0.6,
            glowSize: 0.7 + Math.random() * 0.3,
          });
        }
      }

      // Remove stale pulses (backwards to preserve indices)
      for (let ri = toRemove.length - 1; ri >= 0; ri--) {
        pulses.splice(toRemove[ri], 1);
      }

      // Replenish if too few
      if (pulses.length < 8) {
        spawnSeedPulses(4);
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const handleResize = () => {
      resize();
      init();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
