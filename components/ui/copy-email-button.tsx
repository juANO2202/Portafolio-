"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { springSnappy } from "@/lib/motion";
import { Button } from "./button";
import { CheckIcon, CopyIcon } from "./icons";

type CopyState = "idle" | "copied" | "error";

const labels: Record<CopyState, string> = {
  idle: "Copiar correo",
  copied: "¡Correo copiado!",
  error: "No se pudo copiar",
};

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  return (
    <>
      <Button onClick={copy} className="min-w-44">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={state}
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springSnappy}
          >
            {state === "copied" ? <CheckIcon /> : <CopyIcon />}
            {labels[state]}
          </motion.span>
        </AnimatePresence>
      </Button>
      <span role="status" className="sr-only">
        {state === "idle" ? "" : labels[state]}
      </span>
    </>
  );
}
