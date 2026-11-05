"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { TechOrbit } from "@/components/sections/tech-orbit";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { useIntroDone } from "@/lib/intro-store";
import { easeSnap } from "@/lib/motion";

// Máscara editorial: cada palabra sube desde detrás de una línea invisible.
const wordVariants: Variants = {
  hidden: { y: "108%" },
  visible: { y: "0%", transition: { type: "spring", bounce: 0, duration: 0.9 } },
};

const headlineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeSnap },
  },
};

// Tu nombre real, partido en dos líneas: las dos primeras palabras y el resto.
const nameWords = profile.name.split(" ");
const lines = [
  { words: nameWords.slice(0, 2), accent: false },
  { words: nameWords.slice(2).map((w, i, a) => (i === a.length - 1 ? `${w}.` : w)), accent: true },
];

export function Hero() {
  const introDone = useIntroDone();
  const reduce = useReducedMotion();
  const state = introDone ? "visible" : "hidden";

  return (
    <section
      id="inicio"
      data-tone="light"
      aria-labelledby="hero-titulo"
      className="relative overflow-x-clip bg-cream pt-28 pb-20 sm:pt-32 lg:pb-28"
    >
      <div className="mx-auto grid min-h-[calc(100dvh-8rem)] w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6">
        <div className="space-y-8 lg:col-span-7">
          <motion.h1
            id="hero-titulo"
            variants={headlineVariants}
            initial="hidden"
            animate={state}
            className="display text-[clamp(2.5rem,5.4vw,4.75rem)]"
          >
            {lines.map(({ words, accent }, line) => (
              <span key={line} className="block lg:whitespace-nowrap">
                {words.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom"
                  >
                    <motion.span
                      variants={wordVariants}
                      className={`inline-block ${accent ? "text-leaf" : ""}`}
                    >
                      {word}
                      {i < words.length - 1 ? " " : ""}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } } }}
            initial="hidden"
            animate={state}
            className="space-y-8"
          >
            <motion.p variants={fadeUp} className="max-w-[34ch] text-xl text-ink/90 text-pretty sm:text-2xl">
              {profile.bio}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <Button href="#proyectos">
                Explorar proyectos
                <ArrowRightIcon className="rotate-90 transition-transform duration-200 ease-snap group-hover:translate-y-0.5" />
              </Button>
              <Button href="#contacto" variant="secondary">
                Hablemos
              </Button>
            </motion.div>

            <motion.p variants={fadeUp} className="mono-label text-ink-muted">
              {profile.location}
              <br />
              {profile.availability}
            </motion.p>
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <TechOrbit show={introDone}>
            <motion.figure
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, clipPath: "inset(12% 8% 0% 8% round 2rem)" }}
              animate={
                introDone
                  ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 2rem)" }
                  : undefined
              }
              transition={{
                y: { type: "spring", bounce: 0, duration: 1, delay: 0.2 },
                opacity: { duration: 0.5, delay: 0.2 },
                clipPath: { duration: 1.1, delay: 0.2, ease: easeSnap },
              }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-2 shadow-[0_40px_80px_-30px_rgba(6,17,13,0.4)]"
            >
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={`Retrato de ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-[50%_20%]"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Monograma de ${profile.name}`}
                  className="flex size-full items-center justify-center"
                >
                  <span className="display text-[9rem] text-leaf select-none">{profile.initials}</span>
                </div>
              )}
              <figcaption className="sr-only">{profile.name}</figcaption>
            </motion.figure>
          </TechOrbit>
        </div>
      </div>
    </section>
  );
}
