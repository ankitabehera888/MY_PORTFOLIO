/**
 * GALAXY CURSOR CONFIGURATION
 * Easily customizable parameters for tuning particle density, trail length,
 * swirl speed, glow intensity, and cosmic colors.
 */
export interface GalaxyCursorConfig {
  /** Maximum number of active particles in memory simultaneously */
  maxParticles: number;
  /** Base particle emission count when cursor moves slowly */
  baseEmissionCount: number;
  /** Multiplier for emitting more particles based on cursor speed */
  speedEmissionFactor: number;
  /** Base particle decay rate per frame (higher = shorter trail, lower = longer trail) */
  decayRate: number;
  /** Spiral orbital rotation speed (radians per frame) */
  swirlSpeed: number;
  /** Multiplier for particle glow radius */
  glowIntensity: number;
  /** Number of particles emitted during a click burst (supernova) */
  clickBurstCount: number;
  /** Color palette for Dark Mode (luminous neon cosmic tones with additive blending) */
  darkPalette: string[];
  /** Color palette for Light Mode (deep celestial cosmic tones for light background) */
  lightPalette: string[];
}

export const DEFAULT_GALAXY_CONFIG: GalaxyCursorConfig = {
  maxParticles: 220,
  baseEmissionCount: 2,
  speedEmissionFactor: 0.08,
  decayRate: 0.016,
  swirlSpeed: 0.065,
  glowIntensity: 1.6,
  clickBurstCount: 42,
  darkPalette: [
    '#00d2ff', // Electric Cyan
    '#3a86ff', // Celestial Blue
    '#7b2cbf', // Radiant Violet
    '#9d4edd', // Neon Purple
    '#c77dff', // Soft Lavender
    '#f72585', // Starlight Magenta
    '#ffffff', // Core White Spark
  ],
  lightPalette: [
    '#0077b6', // Deep Ocean Blue
    '#4361ee', // Royal Blue
    '#7209b7', // Deep Violet
    '#3a0ca3', // Midnight Indigo
    '#b5179e', // Cosmic Berry
    '#560bad', // Imperial Purple
  ],
};
