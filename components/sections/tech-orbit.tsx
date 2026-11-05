"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import {
  siSharp,
  siDocker,
  siDotnet,
  siGit,
  siGithub,
  siNextdotjs,
  siReact,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { followSpring } from "@/lib/motion";

interface OrbSpec {
  icon: SimpleIcon;
  /** Posición dentro del contenedor, en %. */
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  size: number;
  /** Cuánto se desplaza con el cursor (px). Más profundidad = más desplazamiento. */
  depth: number;
  float: { duration: number; delay: number };
}

// Solo tecnologías de tu stack real (data/skills.ts).
const orbs: OrbSpec[] = [
  { icon: siReact, pos: { left: "0%", top: "8%" }, size: 60, depth: 18, float: { duration: 5.2, delay: 0 } },
  { icon: siNextdotjs, pos: { right: "0%", top: "2%" }, size: 56, depth: 12, float: { duration: 6, delay: 0.8 } },
  { icon: siTypescript, pos: { left: "-1%", top: "44%" }, size: 52, depth: 24, float: { duration: 5.6, delay: 1.4 } },
  { icon: siGit, pos: { right: "-1%", top: "32%" }, size: 56, depth: 20, float: { duration: 6.4, delay: 0.3 } },
  { icon: siDotnet, pos: { left: "4%", bottom: "9%" }, size: 58, depth: 14, float: { duration: 5.8, delay: 1.1 } },
  { icon: siDocker, pos: { right: "2%", bottom: "20%" }, size: 54, depth: 22, float: { duration: 6.2, delay: 0.6 } },
  { icon: siSharp, pos: { right: "22%", bottom: "0%" }, size: 48, depth: 10, float: { duration: 5.4, delay: 1.9 } },
  { icon: siGithub, pos: { left: "26%", top: "0%" }, size: 46, depth: 16, float: { duration: 6.6, delay: 0.2 } },
];

function Orb({
  spec,
  mx,
  my,
  show,
  index,
}: {
  spec: OrbSpec;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  show: boolean;
  index: number;
}) {
  const { icon, pos, size, depth, float } = spec;
  const x = useTransform(mx, [-1, 1], [-depth, depth]);
  const y = useTransform(my, [-1, 1], [-depth, depth]);

  return (
    <motion.div className="absolute" style={{ ...pos, x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.7, delay: 0.5 + index * 0.07 }}
      >
        <div
          className="float flex items-center justify-center rounded-full bg-cream shadow-[0_14px_30px_-12px_rgba(6,17,13,0.4)] ring-1 ring-ink/10"
          style={
            {
              width: size,
              height: size,
              "--float-duration": `${float.duration}s`,
              "--float-delay": `${float.delay}s`,
            } as React.CSSProperties
          }
        >
          <svg
            viewBox="0 0 24 24"
            role="img"
            aria-label={icon.title}
            width={size * 0.5}
            height={size * 0.5}
            fill={`#${icon.hex}`}
          >
            <path d={icon.path} />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Envuelve el retrato con los iconos de tu stack flotando alrededor. Siguen suavemente al cursor
 * (springs sobre MotionValues, sin estado de React) y con movimiento reducido quedan quietos.
 */
export function TechOrbit({ children, show }: { children: ReactNode; show: boolean }) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, followSpring);
  const my = useSpring(rawY, followSpring);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div className="relative px-7 py-7" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
      <div className="pointer-events-none absolute inset-0">
        {orbs.map((spec, i) => (
          <Orb key={spec.icon.slug} spec={spec} mx={mx} my={my} show={show} index={i} />
        ))}
      </div>
    </div>
  );
}
