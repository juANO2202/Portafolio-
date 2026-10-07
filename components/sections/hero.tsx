"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Fragment, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem, itemVariants } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

const headlineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const driftA = {
  x: [0, 60, -40, 0],
  y: [0, -30, 40, 0],
};
const driftB = {
  x: [0, -50, 30, 0],
  y: [0, 40, -30, 0],
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallax: el contenido sube un poco más rápido que el fondo y se desvanece al salir.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);

  const words = profile.name.split(" ");

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titulo"
      className="relative flex min-h-[calc(100dvh-4rem)] items-center py-24"
    >
      {/* Fondo: dos gradientes radiales que derivan muy despacio (solo transform). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      >
        <motion.div className="absolute inset-x-0 -top-32 bottom-0" style={{ y: backgroundY }}>
          <motion.div
            className="absolute top-[15%] left-1/2 -ml-[30rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)] will-change-transform"
            animate={reduce ? undefined : driftA}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[30%] left-1/2 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-b),transparent)] will-change-transform"
            animate={reduce ? undefined : driftB}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <Container className="relative">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <RevealGroup inView={false} stagger={0.1} delay={0.1} className="space-y-6">
            <RevealItem>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-pill px-3.5 py-1.5 text-sm text-muted">
                <span className="relative flex size-2">
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping"
                  />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                {profile.availability}
              </p>
            </RevealItem>

            <motion.h1
              id="hero-titulo"
              variants={headlineVariants}
              className="text-5xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl md:text-7xl"
            >
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <motion.span variants={itemVariants} className="inline-block">
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))}
            </motion.h1>

            <RevealItem>
              <p className="text-xl text-foreground/90 sm:text-2xl">{profile.role}</p>
            </RevealItem>

            <RevealItem>
              <p className="max-w-xl text-lg text-muted text-pretty">{profile.bio}</p>
            </RevealItem>

            <RevealItem className="flex flex-wrap gap-3 pt-2">
              <Button href="/proyectos">
                Ver proyectos
                <ArrowRightIcon width={18} height={18} />
              </Button>
              <Button href="#contacto" variant="secondary">
                Contacto
              </Button>
            </RevealItem>
          </RevealGroup>
        </motion.div>
      </Container>
    </section>
  );
}
