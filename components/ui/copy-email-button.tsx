"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { springSnappy } from "@/lib/motion";
import { Button, type ButtonProps } from "./button";
import { CheckIcon, CopyIcon } from "./icons";

type CopyState = "idle" | "copied" | "error";

const labels: Record<CopyState, string> = {
  idle: "Copiar correo",
  copied: "Correo copiado",
  error: "No se pudo copiar",
};

export function CopyEmailButton({
  email,
  variant = "secondary",
}: {
  email: string;
  variant?: ButtonProps["variant"];
}) {
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
      <Button onClick={copy} variant={variant} className="min-w-48">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={state}
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(3px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, filter: "blur(3px)" }}
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
