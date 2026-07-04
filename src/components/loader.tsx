import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const drawGears = useCallback((canvas: HTMLCanvasElement, prog: number, time: number, separation: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const size = 520;
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    const cx = (size / 2) * dpr;
    const cy = (size / 2) * dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';

    // Safety Orange palette (#F97316)
    const colorAccent = '#F97316';
    const colorAccentVivid = '#FB923C';

    const easedSep = 1 - Math.pow(1 - separation, 2); // easeOutQuad

    // Main gear parameters
    const outerRadius1 = 105 * dpr;
    const innerRadius1 = 88 * dpr;
    const teeth1 = 20;
    const angle1 = time * 1.5;

    // Secondary gear (half size, meshes with main)
    const outerRadius2 = 52.5 * dpr;
    const innerRadius2 = 35.5 * dpr;
    const teeth2 = 10;
    // Opposite rotation, shifted to mesh perfectly
    const angle2 = -angle1 * (teeth1 / teeth2) + Math.PI / teeth2 + 0.15;

    const pitchRadius1 = (outerRadius1 + innerRadius1) / 2;
    const pitchRadius2 = (outerRadius2 + innerRadius2) / 2;
    const normalDist = pitchRadius1 + pitchRadius2;
    const dist = normalDist + easedSep * 180 * dpr;

    const anglePos = -Math.PI / 5; // top right
    const cx2 = cx + Math.cos(anglePos) * dist;
    const cy2 = cy + Math.sin(anglePos) * dist;

    ctx.globalAlpha = 1 - easedSep;

    const drawGearComponent = (
      gcx: number,
      gcy: number,
      outerR: number,
      innerR: number,
      teeth: number,
      rotAngle: number,
      isPrimary: boolean
    ) => {
      // 1. Blueprint grid crosshair lines (faded)
      ctx.beginPath();
      ctx.strokeStyle = `${colorAccent}22`;
      ctx.lineWidth = 1 * dpr;
      ctx.moveTo(gcx - outerR * 1.4, gcy);
      ctx.lineTo(gcx + outerR * 1.4, gcy);
      ctx.moveTo(gcx, gcy - outerR * 1.4);
      ctx.lineTo(gcx, gcy + outerR * 1.4);
      ctx.stroke();

      // 2. Pitch Circle (dashed)
      ctx.beginPath();
      ctx.strokeStyle = `${colorAccent}55`;
      ctx.lineWidth = 1.2 * dpr;
      ctx.setLineDash([4 * dpr, 4 * dpr]);
      ctx.arc(gcx, gcy, (outerR + innerR) / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Gear teeth & outer ring
      const ringSeparation = easedSep * 35 * dpr;
      const currentOuterR = outerR + ringSeparation;
      const currentInnerR = innerR + ringSeparation;

      ctx.beginPath();
      ctx.strokeStyle = isPrimary ? colorAccent : colorAccentVivid;
      ctx.lineWidth = 2 * dpr;

      const angleStep = (Math.PI * 2) / teeth;
      for (let i = 0; i < teeth; i++) {
        const theta = i * angleStep + rotAngle;
        const a = theta - angleStep * 0.18;
        const b = theta - angleStep * 0.08;
        const c = theta + angleStep * 0.08;
        const d = theta + angleStep * 0.18;

        const ax = gcx + Math.cos(a) * currentInnerR;
        const ay = gcy + Math.sin(a) * currentInnerR;
        const bx = gcx + Math.cos(b) * currentOuterR;
        const by = gcy + Math.sin(b) * currentOuterR;
        const cx_pt = gcx + Math.cos(c) * currentOuterR;
        const cy_pt = gcy + Math.sin(c) * currentOuterR;
        const dx = gcx + Math.cos(d) * currentInnerR;
        const dy = gcy + Math.sin(d) * currentInnerR;

        if (i === 0) {
          ctx.moveTo(ax, ay);
        } else {
          ctx.lineTo(ax, ay);
        }
        ctx.lineTo(bx, by);
        ctx.lineTo(cx_pt, cy_pt);
        ctx.lineTo(dx, dy);

        const nextA = (i + 1) * angleStep + rotAngle - angleStep * 0.18;
        const nextAx = gcx + Math.cos(nextA) * currentInnerR;
        const nextAy = gcy + Math.sin(nextA) * currentInnerR;
        ctx.lineTo(nextAx, nextAy);
      }
      ctx.closePath();
      ctx.stroke();

      // 4. Center hub (keyway and axle hole)
      const hubRadius = outerR * 0.25;
      const holeRadius = outerR * 0.12;

      ctx.beginPath();
      ctx.strokeStyle = colorAccent;
      ctx.lineWidth = 1.5 * dpr;
      ctx.arc(gcx, gcy, hubRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(gcx, gcy, holeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw keyway notch
      ctx.beginPath();
      ctx.fillStyle = colorAccent;
      ctx.rect(gcx - holeRadius * 0.3, gcy - holeRadius * 1.3, holeRadius * 0.6, holeRadius * 0.5);
      ctx.fill();

      // 5. Spokes
      const spokeCount = isPrimary ? 5 : 4;
      ctx.beginPath();
      ctx.strokeStyle = colorAccent;
      ctx.lineWidth = 2 * dpr;
      for (let i = 0; i < spokeCount; i++) {
        const spokeAngle = (i * Math.PI * 2) / spokeCount + rotAngle;
        const startX = gcx + Math.cos(spokeAngle) * hubRadius;
        const startY = gcy + Math.sin(spokeAngle) * hubRadius;
        const endX = gcx + Math.cos(spokeAngle) * (innerR + ringSeparation * 0.3);
        const endY = gcy + Math.sin(spokeAngle) * (innerR + ringSeparation * 0.3);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
      }
      ctx.stroke();

      // 6. Engineering annotations
      if (isPrimary && !unwinding) {
        ctx.fillStyle = `${colorAccent}99`;
        ctx.font = `${8 * dpr}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'left';

        ctx.fillText(`Ø = ${(outerR * 2 / dpr).toFixed(0)}mm`, gcx + outerR * 0.6, gcy - outerR * 0.6);
        ctx.fillText(`Z = ${teeth}`, gcx + outerR * 0.6, gcy - outerR * 0.6 + 12 * dpr);
        ctx.fillText(`RPM = 60`, gcx + outerR * 0.6, gcy - outerR * 0.6 + 24 * dpr);

        ctx.beginPath();
        ctx.strokeStyle = `${colorAccent}66`;
        ctx.lineWidth = 1 * dpr;
        ctx.moveTo(gcx, gcy);
        ctx.lineTo(gcx + outerR * 0.5, gcy - outerR * 0.5);
        ctx.stroke();
      }
    };

    // Main Gear scales up as it loads
    const scaleFactor = 0.6 + 0.4 * (prog / 100);
    drawGearComponent(cx, cy, outerRadius1 * scaleFactor, innerRadius1 * scaleFactor, teeth1, angle1, true);

    // Secondary Gear appears after 30% progress
    if (prog > 30) {
      const secScaleFactor = Math.min(1, (prog - 30) / 70);
      drawGearComponent(cx2, cy2, outerRadius2 * secScaleFactor, innerRadius2 * secScaleFactor, teeth2, angle2, false);
    }

    ctx.globalAlpha = 1;
  }, [unwinding]);

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

      drawGears(canvas, progress, timeRef.current, unwinding ? unwindRef.current : 0);
      animRef.current = requestAnimationFrame(frame);
    };
    frame();
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [isLoading, progress, unwinding, drawGears]);

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
              className="text-xs font-mono text-[var(--color-orange)] tracking-[0.3em] uppercase"
            >
              {unwinding ? 'Ajustando tolerancias CAD...' : 'Configurando Mecanismos Operativos'}
            </motion.span>

            <motion.div
              animate={unwinding ? { opacity: 0, scaleX: 0.8 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-80 h-[3px] bg-[var(--color-surface-4)] overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-orange)] to-[var(--color-orange-vivid)]"
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
