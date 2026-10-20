import React, { useEffect, useRef } from 'react';

/**
 * SILK BACKGROUND COMPONENT
 * Renders a luxurious, animated flowing silk fabric using WebGL fragment shading.
 * - Deep black obsidian base with rich, organic draping folds.
 * - Subtle, shifting warm gold & champagne specular highlights.
 * - Understated contrast ensuring foreground text, buttons & cards remain crisp.
 * - Lightweight GPU execution with pause-on-blur and prefers-reduced-motion support.
 */

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_isDark;

// Multi-layered harmonic wave simulation for natural silk drape
float wave(vec2 p, float t) {
  // 35-degree diagonal rotation for fluid fabric drape
  float c = 0.819;
  float s = 0.574;
  vec2 rot = vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  
  // Layered sinusoidal undulation (folds)
  float w1 = sin(rot.x * 2.6 + t * 0.24 + cos(rot.y * 1.8 + t * 0.16));
  float w2 = sin(rot.y * 3.2 - t * 0.19 + w1 * 0.82);
  float w3 = cos((rot.x + rot.y) * 2.1 + t * 0.14 + w2 * 0.65);
  float w4 = sin(rot.x * 4.8 - rot.y * 2.2 + t * 0.28) * 0.22;
  
  return (w1 * 0.44 + w2 * 0.34 + w3 * 0.22 + w4);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Correct aspect ratio so folds maintain uniform proportions across screens
  vec2 p = uv;
  p.x *= u_resolution.x / u_resolution.y;
  
  // Slow, serene, luxurious temporal drift
  float t = u_time * 0.42;
  
  // Estimate surface normal via finite difference gradients
  float eps = 0.0035;
  float h = wave(p, t);
  float h_dx = wave(p + vec2(eps, 0.0), t) - h;
  float h_dy = wave(p + vec2(0.0, eps), t) - h;
  
  // Surface normal vector
  vec3 normal = normalize(vec3(-h_dx * 20.0, -h_dy * 20.0, 1.0));
  
  // Drifting soft light source traversing the silk surface
  vec3 lightDir = normalize(vec3(
    cos(t * 0.32) * 0.45 + 0.15,
    sin(t * 0.25) * 0.42 + 0.55,
    0.85
  ));
  
  // View direction towards screen
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfDir = normalize(lightDir + viewDir);
  
  // Diffuse illumination on fold ridges
  float diff = max(dot(normal, lightDir), 0.0);
  
  // Anisotropic silk/satin specular sheen
  float spec = pow(max(dot(normal, halfDir), 0.0), 16.0);
  float softSpec = pow(max(dot(normal, halfDir), 0.0), 4.5) * 0.42;
  
  // Shadow depth in the fold valleys
  float shadow = smoothstep(-1.25, 1.25, h);
  
  // -------------------------------------------------------------
  // DARK THEME PALETTE: Deep Obsidian Black with Warm Gold Accents
  // -------------------------------------------------------------
  vec3 darkBase = vec3(0.032, 0.032, 0.038);      // Deep obsidian charcoal
  vec3 darkValley = vec3(0.012, 0.012, 0.016);    // Deep velvet shadow valley
  vec3 darkMid = mix(darkValley, darkBase, shadow);
  
  // Warm golden silk tones
  vec3 goldColor = vec3(0.82, 0.66, 0.38);       // Warm Champagne Gold
  vec3 goldGleam = vec3(0.98, 0.88, 0.62);       // Specular luster highlight
  
  // Understated, refined dark silk illumination
  vec3 darkSilk = darkMid;
  darkSilk += goldColor * (diff * 0.075);         // Soft diffuse ridge illumination
  darkSilk += goldColor * (softSpec * 0.14);      // Fluid satin surface glow
  darkSilk += goldGleam * (spec * 0.20);          // Delicate specular highlight peak
  
  // -------------------------------------------------------------
  // LIGHT THEME PALETTE: Ivory & Pearl Silk with Sunlit Warmth
  // -------------------------------------------------------------
  vec3 lightBase = vec3(0.975, 0.968, 0.955);    // Soft pearl ivory
  vec3 lightValley = vec3(0.910, 0.900, 0.880);  // Soft fold shadow
  vec3 lightMid = mix(lightValley, lightBase, shadow);
  vec3 lightGold = vec3(0.76, 0.62, 0.38);
  
  vec3 lightSilk = lightMid;
  lightSilk += lightGold * (diff * 0.035);
  lightSilk += vec3(1.0, 0.98, 0.92) * (spec * 0.15);
  
  // Seamlessly interpolate between themes
  vec3 finalColor = mix(lightSilk, darkSilk, u_isDark);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const SilkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect WebGL support
    const gl = (canvas.getContext('webgl', { 
      alpha: false, 
      antialias: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    }) ||
      canvas.getContext('experimental-webgl', {
        alpha: false,
        powerPreference: 'low-power',
      })) as WebGLRenderingContext | null;

    if (!gl) {
      // Fallback handled by CSS if WebGL unsupported
      return;
    }

    // Helper: Compile Shader
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Fullscreen Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const quadVertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const isDarkLoc = gl.getUniformLocation(program, 'u_isDark');

    // Theme state observer
    let targetDark = document.documentElement.classList.contains('dark') ? 1.0 : 0.0;
    let currentDark = targetDark;

    const themeObserver = new MutationObserver(() => {
      targetDark = document.documentElement.classList.contains('dark') ? 1.0 : 0.0;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Resize handling with optimal DPR
    let width = 0;
    let height = 0;

    const resize = () => {
      // 0.75 scale delivers soft organic cloth blending with minimal GPU load
      const scale = 0.75;
      width = Math.floor(window.innerWidth * scale);
      height = Math.floor(window.innerHeight * scale);

      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      gl.useProgram(program);
      gl.uniform2f(resolutionLoc, width, height);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Accessibility: Reduced Motion Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number | null = null;
    let startTime = performance.now();
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible && !animationFrameId && !prefersReducedMotion) {
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (now: number) => {
      if (!isVisible) return;

      // Smooth dark-mode transition
      currentDark += (targetDark - currentDark) * 0.08;

      const elapsed = (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform1f(timeLoc, prefersReducedMotion ? 2.5 : elapsed);
      gl.uniform1f(isDarkLoc, currentDark);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      // Render single static frame of draped silk
      render(startTime + 2500);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      {/* Subtle vignette for cinematic depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
};
