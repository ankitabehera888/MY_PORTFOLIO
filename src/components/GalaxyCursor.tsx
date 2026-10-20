import React, { useEffect, useRef } from 'react';
import { DEFAULT_GALAXY_CONFIG } from '../config/galaxyConfig';
import type { GalaxyCursorConfig } from '../config/galaxyConfig';
export type { GalaxyCursorConfig };

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  orbitCenterX: number;
  orbitCenterY: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  radialVelocity: number;
  size: number;
  baseSize: number;
  alpha: number;
  life: number;
  decay: number;
  color: string;
  type: 'dust' | 'star' | 'spark' | 'burst';
  twinklePhase?: number;
  twinkleSpeed?: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  color: string;
}

interface GalaxyCursorProps {
  config?: Partial<GalaxyCursorConfig>;
}

export const GalaxyCursor: React.FC<GalaxyCursorProps> = ({ config: customConfig }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Accessibility: Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 2. Disable on touch / mobile devices for battery and interaction ergonomics
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Merge configurations
    const cfg: GalaxyCursorConfig = {
      ...DEFAULT_GALAXY_CONFIG,
      ...customConfig,
    };

    let isDark = document.documentElement.classList.contains('dark');
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    let width = 0;
    let height = 0;
    let dpr = 1;

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

    // Particle simulation state
    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];

    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let isMouseActive = false;
    let animationFrameId: number | null = null;
    let isLoopRunning = false;
    let globalAngle = 0;

    const getRandomColor = () => {
      const palette = isDark ? cfg.darkPalette : cfg.lightPalette;
      return palette[Math.floor(Math.random() * palette.length)];
    };

    // Helper to spawn a cosmic swirl particle
    const createSwirlParticle = (
      originX: number,
      originY: number,
      speed: number,
      forceType?: Particle['type']
    ) => {
      if (particles.length >= cfg.maxParticles) {
        // Recycle oldest particle
        particles.shift();
      }

      globalAngle += cfg.swirlSpeed;
      const angle = globalAngle + (Math.random() - 0.5) * 1.5;
      const initialRadius = 3 + Math.random() * Math.min(22, 6 + speed * 0.4);
      const isStar = Math.random() < 0.16;
      const type = forceType || (isStar ? 'star' : 'dust');

      const baseSize = isStar
        ? 1.2 + Math.random() * 1.6
        : 1.8 + Math.random() * 3.4;

      const p: Particle = {
        x: originX + Math.cos(angle) * initialRadius,
        y: originY + Math.sin(angle) * initialRadius,
        vx: (Math.random() - 0.5) * (0.8 + speed * 0.05),
        vy: (Math.random() - 0.5) * (0.8 + speed * 0.05),
        orbitCenterX: originX,
        orbitCenterY: originY,
        orbitRadius: initialRadius,
        orbitAngle: angle,
        orbitSpeed: (0.04 + Math.random() * 0.06) * (Math.random() > 0.3 ? 1 : -1),
        radialVelocity: 0.15 + Math.random() * 0.35,
        size: baseSize,
        baseSize,
        alpha: 0.75 + Math.random() * 0.25,
        life: 1.0,
        decay: cfg.decayRate * (0.7 + Math.random() * 0.6),
        color: isStar ? '#ffffff' : getRandomColor(),
        type,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.1 + Math.random() * 0.2,
      };

      particles.push(p);
    };

    // Helper to trigger Supernova Galaxy Burst on click
    const createSupernovaBurst = (cx: number, cy: number) => {
      // 1. Expanding shockwave ring
      shockwaves.push({
        x: cx,
        y: cy,
        radius: 4,
        maxRadius: 55 + Math.random() * 20,
        alpha: 0.85,
        decay: 0.035,
        color: isDark ? '#00d2ff' : '#4361ee',
      });

      // 2. High-energy spiral burst particles
      const burstCount = cfg.clickBurstCount;
      for (let i = 0; i < burstCount; i++) {
        const spiralArmAngle = (i / burstCount) * Math.PI * 4;
        const velocity = 2.2 + Math.random() * 5.5;
        const armOffset = Math.random() * 0.4;
        const theta = spiralArmAngle + armOffset;

        const p: Particle = {
          x: cx + Math.cos(theta) * 2,
          y: cy + Math.sin(theta) * 2,
          vx: Math.cos(theta) * velocity,
          vy: Math.sin(theta) * velocity,
          orbitCenterX: cx,
          orbitCenterY: cy,
          orbitRadius: 2,
          orbitAngle: theta,
          orbitSpeed: 0.08,
          radialVelocity: velocity,
          size: 1.8 + Math.random() * 3.5,
          baseSize: 1.8 + Math.random() * 3.5,
          alpha: 1.0,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.025,
          color: i % 5 === 0 ? '#ffffff' : getRandomColor(),
          type: 'burst',
        };

        particles.push(p);
      }

      startLoop();
    };

    // Start requestAnimationFrame loop if not active
    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        render();
      }
    };

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Additive blending for dark mode gives vivid glowing bloom
      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';

      // 1. Render Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.12;
        sw.alpha -= sw.decay;

        if (sw.alpha <= 0.01) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = Math.max(1, 2.5 * sw.alpha);
        ctx.globalAlpha = sw.alpha * 0.7;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Render and Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update physics
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'burst') {
          // Inertial velocity + air drag
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.93;
          p.vy *= 0.93;
          p.size = p.baseSize * p.life;
        } else {
          // Orbital cosmic swirl kinematics
          p.orbitAngle += p.orbitSpeed;
          p.orbitRadius += p.radialVelocity;
          p.orbitCenterX += p.vx * 0.2;
          p.orbitCenterY += p.vy * 0.2;

          p.x = p.orbitCenterX + Math.cos(p.orbitAngle) * p.orbitRadius;
          p.y = p.orbitCenterY + Math.sin(p.orbitAngle) * p.orbitRadius;

          p.size = p.baseSize * Math.max(0.2, p.life);
        }

        // Compute opacity with optional twinkle
        let currentAlpha = p.alpha * p.life;
        if (p.type === 'star' && p.twinklePhase !== undefined && p.twinkleSpeed !== undefined) {
          p.twinklePhase += p.twinkleSpeed;
          currentAlpha *= 0.65 + 0.35 * Math.sin(p.twinklePhase);
        }

        // Draw particle with soft cosmic halo
        ctx.save();
        const renderRadius = Math.max(0.5, p.size);
        const glowRadius = renderRadius * cfg.glowIntensity * 2.2;

        if (glowRadius > 1.5) {
          // Soft radial nebula glow
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glowRadius
          );
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(0.4, p.color);
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.globalAlpha = Math.min(1, currentAlpha * (isDark ? 0.85 : 0.65));
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Bright Core Starlight
        ctx.fillStyle = p.type === 'star' ? '#ffffff' : p.color;
        ctx.globalAlpha = Math.min(1, currentAlpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, renderRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4-point star shimmer for sparkling stars
        if (p.type === 'star' && p.life > 0.4) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.75;
          ctx.globalAlpha = currentAlpha * 0.6;
          const flareLen = renderRadius * 2.5;

          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Check if particles still exist; if none and cursor inactive, pause RAF to save CPU
      if (particles.length > 0 || shockwaves.length > 0 || isMouseActive) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isLoopRunning = false;
        animationFrameId = null;
      }
    };

    // Mouse Event Handlers
    let lastMoveTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTime);
      lastMoveTime = now;

      const currentX = e.clientX;
      const currentY = e.clientY;

      if (prevMouseX === -1000) {
        prevMouseX = currentX;
        prevMouseY = currentY;
      }

      const dx = currentX - prevMouseX;
      const dy = currentY - prevMouseY;
      const distance = Math.hypot(dx, dy);
      const speed = Math.min(45, (distance / dt) * 16); // Normalized speed

      isMouseActive = true;

      // Determine emission count based on movement speed
      const emissionCount = Math.min(
        10,
        Math.floor(cfg.baseEmissionCount + speed * cfg.speedEmissionFactor)
      );

      // Smooth interpolation: spawn along the motion vector to avoid spacing gaps
      if (distance > 3) {
        const steps = Math.min(6, Math.max(1, Math.floor(distance / 6)));
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          const interpX = prevMouseX + dx * t;
          const interpY = prevMouseY + dy * t;

          for (let k = 0; k < Math.ceil(emissionCount / steps); k++) {
            createSwirlParticle(interpX, interpY, speed);
          }
        }
      } else {
        for (let k = 0; k < emissionCount; k++) {
          createSwirlParticle(currentX, currentY, speed);
        }
      }

      prevMouseX = currentX;
      prevMouseY = currentY;

      startLoop();
    };

    const onMouseDown = (e: MouseEvent) => {
      createSupernovaBurst(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      isMouseActive = false;
      prevMouseX = -1000;
      prevMouseY = -1000;
    };

    const onMouseEnter = (e: MouseEvent) => {
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      isMouseActive = true;
      startLoop();
    };

    // Attach listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [customConfig]);

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
