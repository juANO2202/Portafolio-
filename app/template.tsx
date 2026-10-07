"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { revealTransition } from "@/lib/motion";

/**
 * A diferencia del layout, el template se vuelve a montar en cada navegación:
 * cada página entra con fade + slide. Con movimiento reducido solo queda el fade.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={revealTransition()}
    >
      {children}
    </motion.div>
  );
}
