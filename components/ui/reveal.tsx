"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { revealTransition } from "@/lib/motion";

/**
 * Entrada fade + slide (y: 20 → 0) con spring sin rebote y opacidad con fade corto.
 * Con prefers-reduced-motion, MotionConfig (reducedMotion="user") anula el desplazamiento
 * y solo queda el fade.
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: revealTransition() },
};

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Segundos entre cada hijo (RevealItem o cualquier motion con itemVariants). */
  stagger?: number;
  delay?: number;
  /** true: anima al entrar en el viewport. false: anima al montar. */
  inView?: boolean;
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  inView = true,
}: RevealGroupProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  );
}

/** Línea divisoria que se dibuja de izquierda a derecha al entrar en el viewport. */
export function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
    />
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** "li" cuando el item es hijo directo de un <ul>. */
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component variants={itemVariants} className={className}>
      {children}
    </Component>
  );
}
