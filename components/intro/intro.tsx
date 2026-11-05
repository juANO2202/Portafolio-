"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { easeSnap } from "@/lib/motion";
import { finishIntro } from "@/lib/intro-store";

type Phase = "typing" | "expand" | "fade" | "gone";

const WORD = "Hola";
const STORAGE_KEY = "intro-seen";

/**
 * Intro de ~2.6 s: un círculo crema sobre verde bosque donde se escribe "Hola" (el texto es más grande
 * que el círculo y queda recortado), luego el círculo se abre hasta cubrir la pantalla y revela el hero.
 * Se muestra una vez por sesión, se salta con cualquier toque o tecla, y no existe con movimiento reducido.
 * El script de layout.tsx marca data-intro="seen" antes del primer pintado para que quien ya la vio no
 * parpadee el telón.
 */
export function Intro() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* sin sessionStorage: se muestra la intro */
    }
    if (reduce || seen) {
      finishIntro();
      const id = window.setTimeout(() => setPhase("gone"), 0);
      return () => clearTimeout(id);
    }

    const root = document.documentElement;
    root.dataset.intro = "running";
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    for (let i = 1; i <= WORD.length; i++) at(450 + i * 150, () => setChars(i));
    at(1500, () => setPhase("expand"));
    at(2300, () => {
      setPhase("fade");
      finishIntro();
    });
    at(2750, () => setPhase("gone"));

    function skip() {
      timers.forEach(clearTimeout);
      setPhase("fade");
      finishIntro();
      timers.length = 0;
      timers.push(window.setTimeout(() => setPhase("gone"), 400));
    }
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    if (phase !== "gone") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignorado */
    }
    delete document.documentElement.dataset.intro;
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <motion.div
      aria-hidden="true"
      className="intro-overlay pointer-events-auto fixed inset-0 z-[300] bg-forest"
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-cream"
        initial={{ clipPath: "circle(78px at 50% 50%)" }}
        animate={{
          clipPath:
            phase === "typing" ? "circle(78px at 50% 50%)" : "circle(150vmax at 50% 50%)",
        }}
        transition={{ duration: 0.85, ease: easeSnap }}
      >
        <span className="font-mono text-[5.5rem] leading-none font-bold tracking-[-0.06em] text-leaf">
          {WORD.slice(0, chars)}
          <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-pulse bg-leaf" />
        </span>
      </motion.div>
    </motion.div>
  );
}
