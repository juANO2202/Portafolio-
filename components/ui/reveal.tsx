"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { revealTransition } from "@/lib/motion";

/**
 * Entrada fade + slide + enfoque (y: 24 → 0, blur 6px → 0) con spring sin rebote.
 * Con prefers-reduced-motion, MotionConfig (reducedMotion="user") anula el desplazamiento
 * y solo quedan los cambios de opacidad.
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: revealTransition() },
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
