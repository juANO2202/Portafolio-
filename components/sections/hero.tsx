"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Fragment, useRef } from "react";
import { Portrait } from "@/components/sections/portrait";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

// Máscara editorial: cada palabra sube desde detrás de una línea invisible.
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { y: { type: "spring", bounce: 0, duration: 0.7 }, opacity: { duration: 0.25 } },
  },
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.5, ease: [0.77, 0, 0.175, 1] } },
};

const headlineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// Cada palabra es [texto, resaltada]. El resaltado usa el acento, en la misma tipografía.
const headline: ReadonlyArray<readonly [string, boolean]> = [
  ["Interfaces", false],
  ["que", false],
  ["se", false],
  ["entienden", false],
  ["a", true],
  ["la", true],
  ["primera.", true],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Profundidad: al bajar, el retrato se mueve más lento que el texto y este se desvanece.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -48]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 72]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center py-16"
    >
      {/* Fondo: retícula con máscara radial + resplandor del acento. Solo decorativo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]"
      >
        <div className="bg-dots absolute inset-0" />
        <div className="aurora absolute top-1/4 right-[8%] size-[34rem] will-change-transform" />
      </div>
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div className="lg:col-span-7" style={{ y: textY, opacity: textOpacity }}>
            <RevealGroup inView={false} stagger={0.1} delay={0.1} className="space-y-6">
              <RevealItem>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-pill px-3.5 py-1.5 text-sm text-muted">
                  <span className="relative flex size-2">
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping"
                    />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                  {profile.availability}
                </p>
              </RevealItem>

              <motion.h1
                id="hero-titulo"
                variants={headlineVariants}
                className="text-5xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl"
              >
                {headline.map(([word, accent], i) => (
                  <Fragment key={`${word}-${i}`}>
                    <span className="relative inline-block">
                      <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                        <motion.span
                          variants={wordVariants}
                          className={`inline-block ${accent ? "text-accent" : ""}`}
                        >
                          {word}
                        </motion.span>
                      </span>
                      {i === headline.length - 1 && (
                        <motion.span
                          aria-hidden="true"
                          variants={underlineVariants}
                          className="absolute inset-x-0 -bottom-1 h-[0.05em] origin-left rounded-full bg-accent/70"
                        />
                      )}
                    </span>{" "}
                  </Fragment>
                ))}
              </motion.h1>

              <RevealItem>
                <p className="max-w-[48ch] text-lg text-muted text-pretty sm:text-xl">
                  {profile.bio}
                </p>
              </RevealItem>

              <RevealItem className="flex flex-wrap gap-3 pt-2">
                <Button href="/proyectos">
                  Ver proyectos
                  <ArrowRightIcon className="transition-transform duration-200 ease-snap group-hover:translate-x-1" />
                </Button>
                <Button href="#contacto" variant="secondary">
                  Escríbeme
                </Button>
              </RevealItem>
            </RevealGroup>
          </motion.div>

          <motion.div
            className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none lg:justify-self-end lg:pl-8"
            style={{ y: portraitY }}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 24, clipPath: "inset(100% 0% 0% 0% round 1rem)" }
            }
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 1rem)" }}
            transition={{
              y: { type: "spring", bounce: 0, duration: 0.8, delay: 0.25 },
              opacity: { duration: 0.3, delay: 0.25 },
              clipPath: { duration: 0.9, delay: 0.25, ease: [0.77, 0, 0.175, 1] },
            }}
          >
            <Portrait />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
