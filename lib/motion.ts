import type { Transition } from "motion/react";

/** Spring críticamente amortiguado (damping 1.0): se asienta sin rebote. */
export const spring = { type: "spring", bounce: 0, duration: 0.5 } as const satisfies Transition;

/** Variante más rápida para elementos pequeños (indicadores, estados). */
export const springSnappy = {
  type: "spring",
  bounce: 0,
  duration: 0.35,
} as const satisfies Transition;

/** Presión de botones: respuesta casi instantánea, sin rebote (ζ ≈ 0.98). */
export const pressSpring = {
  type: "spring",
  stiffness: 700,
  damping: 52,
} as const satisfies Transition;

/** Para MotionValues que siguen al cursor (magnetismo, tilt, brillo). Sobreamortiguado (ζ ≈ 1.1). */
export const followSpring = { stiffness: 220, damping: 26, mass: 0.6 } as const;

/** Fade corto: es lo que queda cuando `prefers-reduced-motion` anula el movimiento. */
export const fade = { duration: 0.3, ease: "easeOut" } as const satisfies Transition;

/** Entrada: el movimiento usa spring; la opacidad, un fade corto. */
export function revealTransition(delay = 0): Transition {
  return {
    y: { ...spring, delay },
    opacity: { ...fade, delay },
  };
}

/** Escala máxima permitida en hover. */
export const HOVER_SCALE = 1.02;
/** Inclinación máxima de las tarjetas, en grados. */
export const TILT_MAX = 5;
/** Desplazamiento máximo del efecto magnético, en px. */
export const MAGNET_MAX = 8;
