'use client';

import { useRef, useEffect } from 'react';
import { animate } from 'animejs';
import { useMounted } from '@/hooks/use-mounted';
import { usePreferences } from '@/store/preferences-store';

export function HeroSvgBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mounted = useMounted();
  const reducedMotion = usePreferences((s) => s.reducedMotion);

  useEffect(() => {
    if (!mounted || reducedMotion || !svgRef.current) return;

    const paths = svgRef.current.querySelectorAll<SVGGeometryElement>('.draw-path');
    if (!paths.length) return;

    const anims: ReturnType<typeof animate>[] = [];

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const state = { offset: length };
      const anim = animate(state, {
        offset: 0,
        duration: 2500,
        delay: 400,
        ease: 'outCubic',
        loop: true,
        alternate: true,
        onUpdate: () => {
          path.style.strokeDashoffset = `${state.offset}`;
        },
      });
      anims.push(anim);
    });

    return () => {
      anims.forEach((a) => a.revert());
    };
  }, [mounted, reducedMotion]);

  if (!mounted) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-60"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Engineering border frame */}
      <rect
        className="draw-path"
        x="40" y="30"
        width="920" height="640"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="0.5"
      />

      {/* Corner L-brackets */}
      <path
        className="draw-path"
        d="M 40 70 L 40 30 L 80 30"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="1"
      />
      <path
        className="draw-path"
        d="M 920 70 L 920 30 L 880 30"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="1"
      />
      <path
        className="draw-path"
        d="M 40 630 L 40 670 L 80 670"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="1"
      />
      <path
        className="draw-path"
        d="M 920 630 L 920 670 L 880 670"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="1"
      />

      {/* Center crosshair */}
      <circle
        className="draw-path"
        cx="500" cy="350"
        r="80"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="0.5"
      />
      <line
        className="draw-path"
        x1="500" y1="240" x2="500" y2="460"
        stroke="var(--color-orange)"
        strokeWidth="0.3"
      />
      <line
        className="draw-path"
        x1="390" y1="350" x2="610" y2="350"
        stroke="var(--color-orange)"
        strokeWidth="0.3"
      />

      {/* Diagonal engineering lines */}
      <line
        className="draw-path"
        x1="40" y1="30" x2="200" y2="200"
        stroke="var(--color-orange)"
        strokeWidth="0.3"
        opacity="0.5"
      />
      <line
        className="draw-path"
        x1="960" y1="30" x2="800" y2="200"
        stroke="var(--color-orange)"
        strokeWidth="0.3"
        opacity="0.5"
      />

      {/* Measurement arrows */}
      <path
        className="draw-path"
        d="M 100 100 L 100 70 L 130 100"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <path
        className="draw-path"
        d="M 900 100 L 900 70 L 870 100"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  );
}
