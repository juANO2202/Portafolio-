"use client";

import { motion } from "motion/react";
import type { MouseEventHandler, ReactNode } from "react";
import { pressSpring } from "@/lib/motion";

type Variant = "primary" | "secondary" | "mint" | "outline-light";

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
  disabled?: boolean;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

// Una sola forma: píldora de 48px. El color cambia en 200ms; la presión (scale .97) responde al instante.
const base =
  "group inline-flex h-12 select-none items-center justify-center gap-2 rounded-full px-6 " +
  "text-[15px] font-medium whitespace-nowrap transition-colors duration-200 will-change-transform " +
  "active:opacity-90 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Sobre crema
  primary: "bg-ink text-cream hover:bg-leaf",
  secondary: "border border-ink/20 text-ink hover:bg-ink/5",
  // Sobre verde bosque
  mint: "bg-mint text-forest hover:bg-cream",
  "outline-light": "border border-cream/25 text-cream hover:bg-cream/10",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;

  const shared = {
    className: `${base} ${variants[variant]} ${className}`,
    whileTap: { scale: 0.97 }, // responde en pointer-down, no al soltar
    transition: pressSpring,
    "aria-label": props["aria-label"],
  };

  if (props.href === undefined) {
    return (
      <motion.button
        type={props.type ?? "button"}
        onClick={props.onClick}
        disabled={props.disabled}
        {...shared}
      >
        {children}
      </motion.button>
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
