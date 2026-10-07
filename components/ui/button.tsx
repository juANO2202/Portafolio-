"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Link from "next/link";
import type { MouseEventHandler, PointerEvent, ReactNode } from "react";
import { HOVER_SCALE, MAGNET_MAX, followSpring, pressSpring } from "@/lib/motion";

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
  "inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-sm font-medium " +
  "will-change-transform active:opacity-85"; // active:opacity = feedback también con movimiento reducido

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background",
  secondary: "border border-line bg-pill text-foreground",
};

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
    onPointerLeave() {
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
    onPointerLeave: magnet.onPointerLeave,
    whileHover: { scale: HOVER_SCALE },
    whileTap: { scale: 0.97 }, // responde en pointer-down, no al soltar
    transition: pressSpring,
    "aria-label": props["aria-label"],
  };

  if (props.href === undefined) {
    return (
      <motion.button type={props.type ?? "button"} onClick={props.onClick} {...shared}>
        {children}
      </motion.button>
    );
  }

  if (props.href.startsWith("/")) {
    return (
      <MotionLink href={props.href} {...shared}>
        {children}
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
      {children}
    </motion.a>
  );
}
