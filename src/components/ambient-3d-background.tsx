'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useMounted } from '@/hooks/use-mounted';
import { usePreferences } from '@/store/preferences-store';

// Helper to create a high-quality glowing circular particle texture programmatically
function createCircleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Outer soft glow
    const grad = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    grad.addColorStop(0, 'rgba(249, 115, 22, 1)');
    grad.addColorStop(0.2, 'rgba(249, 115, 22, 0.8)');
    grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.2)');
    grad.addColorStop(1, 'rgba(249, 115, 22, 0)');
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function Ambient3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const reducedMotion = usePreferences((s) => s.reducedMotion);

  useEffect(() => {
    if (!mounted || reducedMotion || !containerRef.current) return;

    const container = containerRef.current;

    // ── 1. Setup Scene, Camera, and Renderer ──────────────────────────
    const scene = new THREE.Scene();
    
    // Add atmospheric fog for depth
    scene.fog = new THREE.FogExp2(0x080c10, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 250;
    camera.position.y = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // ── 2. Create 3D Grid Blueprint (Technical Aesthetic) ─────────────
    const gridHelper = new THREE.GridHelper(800, 60, 0x334155, 0x1e293b);
    gridHelper.position.y = -60;
    // Set opacity and enable transparency
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.25;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.25;
    }
    scene.add(gridHelper);

    // ── 3. Create Dynamic Particle Constellation (Digital Twin) ─────
    const particleCount = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];

    // Spread particles randomly in a 3D box
    for (let i = 0; i < particleCount; i++) {
      // x
      positions[i * 3] = (Math.random() - 0.5) * 700;
      // y (skewed slightly higher than the grid and spread taller)
      positions[i * 3 + 1] = (Math.random() - 0.3) * 500;
      // z
      positions[i * 3 + 2] = (Math.random() - 0.5) * 700;

      // Velocities
      velocities.push(
        (Math.random() - 0.5) * 0.15, // vx
        (Math.random() - 0.5) * 0.08, // vy
        (Math.random() - 0.5) * 0.15  // vz
      );
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleTexture = createCircleTexture();
    const pointsMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xf97316,
    });

    const particleSystem = new THREE.Points(geometry, pointsMaterial);
    scene.add(particleSystem);

    // ── 4. Create Dynamic Lines Network ──────────────────────────────
    // Lines connect particles that are within a certain distance
    const lineMaxConnections = 250;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineMaxConnections * 2 * 3); // 2 points per line, 3 coordinates each
    const lineColors = new Float32Array(lineMaxConnections * 2 * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // ── 5. Mouse Interaction & Parallax Tracking ──────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate: -0.5 to 0.5
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Track scroll to rotate scene
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── 6. Animation Loop ─────────────────────────────────────────────
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation towards target (Parallax)
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Adjust camera positioning based on mouse & scroll (highly optimized to remain visible across tall pages)
      camera.position.x = targetX * 180;
      camera.position.y = 80 + (-targetY * 90) + (scrollY * 0.005);
      camera.position.z = 250 + (scrollY * 0.008);
      camera.lookAt(0, 30 + (scrollY * 0.003), 0);

      // Rotate grid helper slowly
      gridHelper.rotation.y = time * 0.02;

      // Update particle positions & wrap around boundaries
      const positionsAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Apply velocity
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Boundary check (wrap around a box of width 600, height 300, depth 600)
        if (Math.abs(posArray[i3]) > 300) {
          posArray[i3] = -Math.sign(posArray[i3]) * 300;
        }
        if (posArray[i3 + 1] > 250) {
          posArray[i3 + 1] = -50;
        } else if (posArray[i3 + 1] < -50) {
          posArray[i3 + 1] = 250;
        }
        if (Math.abs(posArray[i3 + 2]) > 300) {
          posArray[i3 + 2] = -Math.sign(posArray[i3 + 2]) * 300;
        }
      }
      positionsAttr.needsUpdate = true;

      // Update connection lines based on distances
      const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const lineArray = linePosAttr.array as Float32Array;
      const lineColorAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;
      const colorArray = lineColorAttr.array as Float32Array;

      let lineIndex = 0;
      const maxDistance = 90; // distance threshold to connect nodes
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < particleCount && lineIndex < lineMaxConnections; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount && lineIndex < lineMaxConnections; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dx = x2 - x1;
          const dy = y2 - y1;
          const dz = z2 - z1;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistanceSq) {
            const lIdx6 = lineIndex * 6;
            
            // Point 1
            lineArray[lIdx6] = x1;
            lineArray[lIdx6 + 1] = y1;
            lineArray[lIdx6 + 2] = z1;

            // Point 2
            lineArray[lIdx6 + 3] = x2;
            lineArray[lIdx6 + 4] = y2;
            lineArray[lIdx6 + 5] = z2;

            // Opacity based on distance (closer = brighter)
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - (dist / maxDistance);
            
            // Base color: #f97316 (0.98, 0.45, 0.09)
            const r = 0.98 * alpha;
            const g = 0.45 * alpha;
            const b = 0.09 * alpha;

            colorArray[lIdx6] = r;
            colorArray[lIdx6 + 1] = g;
            colorArray[lIdx6 + 2] = b;
            colorArray[lIdx6 + 3] = r;
            colorArray[lIdx6 + 4] = g;
            colorArray[lIdx6 + 5] = b;

            lineIndex++;
          }
        }
      }

      // Hide remaining lines in buffer by setting coordinates to 0
      for (let k = lineIndex; k < lineMaxConnections; k++) {
        const kIdx6 = k * 6;
        for (let idx = 0; idx < 6; idx++) {
          lineArray[kIdx6 + idx] = 0;
        }
      }

      linePosAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;

      // Subtle slow rotation of the whole particle system
      particleSystem.rotation.y = time * 0.015;
      lineSystem.rotation.y = time * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // ── 7. Handle Resize ──────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── 8. Clean up resources ────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Clean up WebGL bindings
      container.removeChild(renderer.domElement);
      renderer.dispose();
      pointsMaterial.dispose();
      particleTexture.dispose();
      lineMaterial.dispose();
      geometry.dispose();
      lineGeometry.dispose();
    };
  }, [mounted, reducedMotion]);

  if (!mounted || reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, var(--color-surface-2) 0%, var(--color-surface-1) 100%)',
      }}
      aria-hidden="true"
    />
  );
}
