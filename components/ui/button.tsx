"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Link from "next/link";
import type { MouseEventHandler, PointerEvent, ReactNode } from "react";
import { MAGNET_MAX, followSpring, pressSpring } from "@/lib/motion";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
}

interface ActionButtonProps extends BaseProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

const base =
  "group relative isolate inline-flex h-11 select-none items-center justify-center gap-2 overflow-hidden " +
  "rounded-full px-5 text-sm font-medium will-change-transform " +
  "active:opacity-85"; // active:opacity = feedback también con movimiento reducido

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background",
  secondary:
    "border border-line bg-pill text-foreground transition-colors duration-200 hover:border-accent/50",
};

/** Color del relleno que nace bajo el cursor al hacer hover. */
const fillColor: Record<Variant, string> = {
  primary: "bg-accent",
  secondary: "bg-accent-soft",
};

/**
 * Relleno circular que se expande desde el punto por donde entró el cursor (--fx/--fy).
 * Asimétrico: entra en 400ms y sale en 220ms, porque el sistema responde más rápido de lo que el usuario decide.
 * Con movimiento reducido es un simple fade.
 */
const fillBase =
  "pointer-events-none absolute inset-0 -z-10 " +
  "[clip-path:circle(0%_at_var(--fx,50%)_var(--fy,50%))] " +
  "transition-[clip-path] duration-[220ms] ease-snap " +
  "group-hover:[clip-path:circle(150%_at_var(--fx,50%)_var(--fy,50%))] group-hover:duration-[400ms] " +
  "motion-reduce:[clip-path:none] motion-reduce:opacity-0 motion-reduce:transition-opacity " +
  "motion-reduce:group-hover:opacity-100";

/** Guarda por dónde entra/sale el cursor para que el relleno nazca y muera en ese punto. */
function markPointer(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--fx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--fy", `${e.clientY - r.top}px`);
}

/** Efecto magnético: el botón se desplaza hacia el cursor. Solo ratón; los springs lo hacen interrumpible. */
function useMagnetic() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, followSpring);
  const sy = useSpring(y, followSpring);

  const clamp = (v: number) => Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, v));

  return {
    style: { x: sx, y: sy },
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (reduce || e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.25));
      y.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.25));
    },
    onPointerEnter: markPointer,
    onPointerLeave(e: PointerEvent<HTMLElement>) {
      markPointer(e);
      x.set(0);
      y.set(0);
    },
  };
}

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const magnet = useMagnetic();

  const shared = {
    className: `${base} ${variants[variant]} ${className}`,
    style: magnet.style,
    onPointerMove: magnet.onPointerMove,
    onPointerEnter: magnet.onPointerEnter,
    onPointerLeave: magnet.onPointerLeave,
    whileTap: { scale: 0.97 }, // responde en pointer-down, no al soltar
    transition: pressSpring,
    "aria-label": props["aria-label"],
  };

  const content = (
    <>
      <span aria-hidden="true" className={`${fillBase} ${fillColor[variant]}`} />
      {children}
    </>
  );

  if (props.href === undefined) {
    return (
      <motion.button type={props.type ?? "button"} onClick={props.onClick} {...shared}>
        {content}
      </motion.button>
    );
  }

  if (props.href.startsWith("/")) {
    return (
      <MotionLink href={props.href} {...shared}>
        {content}
      </MotionLink>
    );
  }

  const isExternal = props.href.startsWith("http");
  return (
    <motion.a
      href={props.href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...shared}
    >
      {content}
    </motion.a>
  );
}
