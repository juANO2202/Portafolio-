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

/** Para MotionValues que siguen al cursor (parallax). Sobreamortiguado (ζ ≈ 1.1). */
export const followSpring = { stiffness: 120, damping: 20, mass: 0.6 } as const;

/** Fade corto: es lo que queda cuando `prefers-reduced-motion` anula el movimiento. */
export const fade = { duration: 0.3, ease: "easeOut" } as const satisfies Transition;

/** Curva de salida fuerte (la misma que --ease-snap en globals.css). */
export const easeSnap = [0.23, 1, 0.32, 1] as const;

/**
 * Entrada de contenido al hacer scroll: sube con spring, aparece con fade y se enfoca desde un
 * blur leve (el blur disimula el cruce entre "invisible" y "visible").
 */
export function revealTransition(delay = 0): Transition {
  return {
    y: { type: "spring", bounce: 0, duration: 0.8, delay },
    opacity: { duration: 0.5, ease: "easeOut", delay },
    filter: { duration: 0.6, ease: "easeOut", delay },
  };
}
