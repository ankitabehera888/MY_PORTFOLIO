import React, { useEffect, useRef } from 'react';

/**
 * ANIMATION 06 — PEARL DRIFT CURSOR
 * 
 * Elegant, minimal cursor particle effect inspired by floating pearls,
 * soft ivory dust, and delicate champagne highlights.
 * 
 * - Floating pearl particles emerge along cursor motion path.
 * - Interpolated emission ensures unbroken trails during fast movement.
 * - Soft upward and sideways buoyancy with organic micro-drift.
 * - Radial pearl luster with specular highlights and soft warm shadows.
 * - Responsive to light theme (#FAF9F5) and dark theme.
 * - Zero layout shifts, native system cursor preserved, pointer-events none.
 * - Full performance optimization: requestAnimationFrame, bounded pool,
 *   pause on hidden tab, reduced-motion & touch device detection.
 */

interface PearlParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  age: number;
  lifespan: number; // in milliseconds
  alpha: number;
  maxAlpha: number;
  colorType: 'pearl-white' | 'warm-ivory' | 'champagne';
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  hasSheen: boolean;
}

export const PearlDriftCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Accessibility: Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 2. Disable on touch / mobile devices (no persistent cursor)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Theme detection for adaptive subtle shadows/glows
    let isDark = document.documentElement.classList.contains('dark');
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Particle state
    const MAX_PARTICLES = 100;
    const particles: PearlParticle[] = [];

    // Mouse tracking state
    let lastMouseX = -100;
    let lastMouseY = -100;
    let hasMoved = false;

    // Create a new individual pearl particle
    const createPearl = (
      x: number,
      y: number,
      options?: {
        vx?: number;
        vy?: number;
        type?: 'pearl-white' | 'warm-ivory' | 'champagne';
        radius?: number;
        lifespan?: number;
      }
    ): PearlParticle => {
      // Color palette distribution:
      // ~65% Pearl White, ~25% Warm Ivory, ~10% Champagne Highlight
      let colorType: 'pearl-white' | 'warm-ivory' | 'champagne' = 'pearl-white';
      if (options?.type) {
        colorType = options.type;
      } else {
        const rand = Math.random();
        if (rand < 0.65) colorType = 'pearl-white';
        else if (rand < 0.90) colorType = 'warm-ivory';
        else colorType = 'champagne';
      }

      // Radius between 1.0px and 2.5px (2px to 5px diameter), occasionally up to 3.0px (6px diameter)
      const rRand = Math.random();
      let radius: number;
      if (options?.radius) {
        radius = options.radius;
      } else if (rRand < 0.85) {
        radius = 1.1 + Math.random() * 1.3; // 2.2px - 4.8px diameter
      } else if (rRand < 0.96) {
        radius = 2.4 + Math.random() * 0.4; // ~5.0px - 5.6px diameter
      } else {
        radius = 2.8 + Math.random() * 0.2; // ~6px diameter (rare)
      }

      // Gentle upward buoyancy & slight lateral drift
      const vx = options?.vx !== undefined ? options.vx : (Math.random() - 0.5) * 0.45;
      const vy = options?.vy !== undefined ? options.vy : -0.22 - Math.random() * 0.45;

      // Lifespan between 550ms and 1150ms
      const lifespan = options?.lifespan || (600 + Math.random() * 550);

      // Max opacity: gentle variation between 0.45 and 0.90
      const maxAlpha = 0.55 + Math.random() * 0.35;

      return {
        x,
        y,
        vx,
        vy,
        radius,
        baseRadius: radius,
        age: 0,
        lifespan,
        alpha: 0,
        maxAlpha,
        colorType,
        swaySpeed: 0.002 + Math.random() * 0.003,
        swayAmp: 0.25 + Math.random() * 0.35,
        swayOffset: Math.random() * Math.PI * 2,
        hasSheen: radius >= 1.4 && Math.random() > 0.3,
      };
    };

    // Mouse movement handler with smooth interpolation
    const onMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!hasMoved) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        hasMoved = true;
        return;
      }

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const dist = Math.hypot(dx, dy);

      // Only emit if the cursor actually moved
      if (dist >= 3) {
        // Calculate emission spacing (between 10px and 20px)
        const stepDist = Math.max(10, Math.min(22, 10 + (dist * 0.1)));
        const steps = Math.min(5, Math.max(1, Math.floor(dist / stepDist)));

        for (let i = 1; i <= steps; i++) {
          if (particles.length >= MAX_PARTICLES) {
            particles.shift(); // Evict oldest
          }

          const t = i / steps;
          // Interpolated point along cursor path
          const interpX = lastMouseX + dx * t;
          const interpY = lastMouseY + dy * t;

          // Gentle perpendicular scatter (offset slightly behind or beside)
          const angle = Math.atan2(dy, dx) + Math.PI / 2;
          const scatter = (Math.random() - 0.5) * 6;
          const px = interpX + Math.cos(angle) * scatter;
          const py = interpY + Math.sin(angle) * scatter;

          particles.push(createPearl(px, py));
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    };

    // Subtle Click Interaction: Release 6-9 pearl particles gently
    const onMouseDown = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const count = 7 + Math.floor(Math.random() * 3); // 7 to 9 particles

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift();
        }

        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = 0.4 + Math.random() * 0.7; // Very gentle radial drift
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 0.2; // Slight upward bias

        // One or two champagne highlights in the cluster
        const type = i === 0 || (i === 4 && count > 7) ? 'champagne' : (i % 2 === 0 ? 'pearl-white' : 'warm-ivory');

        particles.push(
          createPearl(mouseX, mouseY, {
            vx,
            vy,
            type,
            radius: 1.2 + Math.random() * 1.2,
            lifespan: 750 + Math.random() * 350,
          })
        );
      }
    };

    // Rendering Helper for Pearl Shading
    const drawPearl = (p: PearlParticle) => {
      const r = p.radius;
      if (r <= 0.1 || p.alpha <= 0.01) return;

      ctx.save();
      ctx.globalAlpha = p.alpha;

      // 1. Subtle warm shadow for light theme depth
      if (!isDark) {
        ctx.shadowColor = 'rgba(100, 82, 57, 0.14)';
        ctx.shadowBlur = r * 1.4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = r * 0.35;
      } else {
        // Dark theme: soft warm champagne glow
        ctx.shadowColor = 'rgba(231, 211, 173, 0.22)';
        ctx.shadowBlur = r * 2.0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // 2. Base Pearl Sphere with Radial Luster
      // Light source comes from top-left (x - r*0.35, y - r*0.35)
      const grad = ctx.createRadialGradient(
        p.x - r * 0.35,
        p.y - r * 0.38,
        r * 0.05,
        p.x,
        p.y,
        r
      );

      if (p.colorType === 'pearl-white') {
        // Luminous Pearl White: #FFFDF8 -> #F7F2E8 -> soft rim
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.25, '#FFFDF8');
        grad.addColorStop(0.7, '#F7F2E8');
        grad.addColorStop(1, isDark ? '#E7D3AD' : '#E8DFD0');
      } else if (p.colorType === 'warm-ivory') {
        // Warm Ivory: #FFFDF8 -> #F0E7D8 -> #E6D8C4
        grad.addColorStop(0, '#FFFDF8');
        grad.addColorStop(0.3, '#F7F2E8');
        grad.addColorStop(0.75, '#F0E7D8');
        grad.addColorStop(1, isDark ? '#DEC69E' : '#DFD4C0');
      } else {
        // Champagne Highlight: #FFFDF8 -> #E7D3AD -> #D8BE8E
        grad.addColorStop(0, '#FFFDF8');
        grad.addColorStop(0.35, '#EFE2C8');
        grad.addColorStop(0.8, '#E7D3AD');
        grad.addColorStop(1, isDark ? '#CFA765' : '#D2B989');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Reset shadow for subsequent fine details
      ctx.shadowColor = 'transparent';

      // 3. Delicate Specular Highlight (Tiny reflected glint of light)
      if (p.hasSheen && r >= 1.3) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(p.x - r * 0.35, p.y - r * 0.38, Math.max(0.4, r * 0.28), 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Ultra-delicate warm edge ring for tactile definition on pale ivory background
      if (!isDark) {
        ctx.strokeStyle = p.colorType === 'champagne' 
          ? 'rgba(185, 155, 110, 0.25)' 
          : 'rgba(145, 125, 95, 0.16)';
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Animation Loop
    let lastTime = performance.now();
    let animationFrameId: number | null = null;
    let isPaused = false;

    const render = (currentTime: number) => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(currentTime - lastTime, 48); // Bound dt to avoid leaps
      lastTime = currentTime;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Update & render existing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;

        if (p.age >= p.lifespan) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.age / p.lifespan;

        // Opacity curve:
        // Smooth fade-in over initial 12% of life, then gentle, elegant fade-out
        if (progress < 0.12) {
          p.alpha = (progress / 0.12) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.12) / 0.88) * p.maxAlpha;
        }

        // Near end of life (last 28%), particles shrink subtly
        if (progress > 0.72) {
          const shrinkProg = (progress - 0.72) / 0.28;
          p.radius = p.baseRadius * (1 - shrinkProg * 0.42);
        } else {
          p.radius = p.baseRadius;
        }

        // Gentle physics: air friction and organic horizontal sway
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Subtle upward drift
        p.vy -= 0.003;

        // Subtle organic sway
        const sway = Math.sin(currentTime * p.swaySpeed + p.swayOffset) * p.swayAmp;

        p.x += (p.vx + sway * 0.25) * (dt / 16.6);
        p.y += p.vy * (dt / 16.6);

        drawPearl(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Visibility management: pause loop when tab is hidden
    const onVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Event listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });

    // Cleanup on unmount
    return () => {
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] select-none"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
};
