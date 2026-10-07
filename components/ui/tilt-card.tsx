"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { HOVER_SCALE, TILT_MAX, followSpring } from "@/lib/motion";

const GLOW_SIZE = 320;

/**
 * Tarjeta con tilt 3D sutil y brillo que sigue al cursor.
 * Todo son MotionValues con spring (interrumpibles) y solo anima transform y opacity.
 * Con movimiento reducido no hay tilt, escala ni brillo: queda un fade del borde al hacer hover.
 */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  const rotateX = useSpring(0, followSpring);
  const rotateY = useSpring(0, followSpring);
  const glowX = useSpring(0, followSpring);
  const glowY = useSpring(0, followSpring);

  const hover = useMotionValue(0);
  const hoverSpring = useSpring(hover, { stiffness: 260, damping: 30 });
  const scale = useTransform(hoverSpring, [0, 1], [1, reduce ? 1 : HOVER_SCALE]);
  const glowOpacity = useTransform(hoverSpring, (v) => (reduce ? 0 : v));

  function track(e: PointerEvent<HTMLDivElement>, jump = false) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateX.set(-(py - 0.5) * 2 * TILT_MAX);
    rotateY.set((px - 0.5) * 2 * TILT_MAX);

    const gx = e.clientX - r.left - GLOW_SIZE / 2;
    const gy = e.clientY - r.top - GLOW_SIZE / 2;
    if (jump) {
      // Al entrar, el brillo aparece bajo el cursor en vez de viajar desde donde quedó.
      glowX.jump(gx);
      glowY.jump(gy);
    } else {
      glowX.set(gx);
      glowY.set(gy);
    }
  }

  return (
    <div
      className={`h-full [perspective:900px] ${className}`}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        hover.set(1);
        if (!reduce) track(e, true);
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduce) return;
        track(e);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        hover.set(0);
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <motion.div
        className="surface relative h-full overflow-hidden will-change-transform"
        style={{ rotateX, rotateY, scale }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
          style={{ width: GLOW_SIZE, height: GLOW_SIZE, x: glowX, y: glowY, opacity: glowOpacity }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl border border-foreground/25"
          style={{ opacity: hoverSpring }}
        />
        <div className="relative h-full">{children}</div>
      </motion.div>
    </div>
  );
}
