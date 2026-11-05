"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { ParticleField } from "@/components/ui/particle-field";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Highlight } from "@/types/content";

/** Una escena: aparece, se queda y se va según el tramo del scroll que le corresponde. */
function Scene({
  index,
  total,
  progress,
  highlight,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  highlight: Highlight;
}) {
  const reduce = useReducedMotion();
  const from = index / total;
  const to = (index + 1) / total;
  const fade = 0.07;
  const first = index === 0;
  const last = index === total - 1;

  const opacity = useTransform(
    progress,
    [from, from + fade, to - fade, to],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(
    progress,
    [from, from + fade, to - fade, to],
    reduce ? [0, 0, 0, 0] : [first ? 0 : 36, 0, 0, last ? 0 : -36],
  );
  const blur = useTransform(
    progress,
    [from, from + fade, to - fade, to],
    [first ? 0 : 8, 0, 0, last ? 0 : 8],
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center gap-6" style={{ opacity, y, filter }}>
      <h3 className="display text-[clamp(2.5rem,5.6vw,5rem)] text-balance">
        {highlight.title}
        <span className="text-mint">.</span>
      </h3>
      <p className="max-w-[34ch] text-xl text-mist text-pretty sm:text-2xl">{highlight.text}</p>
    </motion.div>
  );
}

/**
 * Historia fijada al scroll: la pantalla queda "pegada" y, mientras bajas, el texto cambia de escena
 * y el objeto de partículas cambia de forma. El contenido sale íntegro de data/about.ts.
 */
export function Story({
  title,
  paragraphs,
  highlights,
}: {
  title: string;
  paragraphs: string[];
  highlights: Highlight[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(highlights.length - 1, Math.max(0, Math.floor(p * highlights.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section id="historia" data-tone="dark" aria-labelledby="historia-titulo" className="bg-forest text-cream">
      <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-12 sm:px-8 sm:pt-40">
        <RevealGroup className="max-w-3xl space-y-8">
          <RevealItem>
            <h2 id="historia-titulo" className="display text-[clamp(2.75rem,7vw,6rem)] text-balance">
              {title}
            </h2>
          </RevealItem>
          {paragraphs.map((paragraph) => (
            <RevealItem key={paragraph}>
              <p className="max-w-[56ch] text-lg text-mist text-pretty sm:text-xl">{paragraph}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Tramo fijado: 110vh de scroll por escena. */}
      <div ref={track} style={{ height: `${highlights.length * 110}vh` }} className="relative">
        <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-0 size-[60rem] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(closest-side,rgba(62,207,142,0.1),transparent)]"
          />

          <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-rows-[38dvh_1fr] items-center gap-4 px-5 pt-20 sm:px-8 lg:grid-cols-2 lg:grid-rows-1 lg:gap-8">
            <div className="order-1 h-full lg:order-2">
              <ParticleField progress={scrollYProgress} />
            </div>

            <div className="relative order-2 h-full lg:order-1">
              {highlights.map((highlight, i) => (
                <Scene
                  key={highlight.title}
                  index={i}
                  total={highlights.length}
                  progress={scrollYProgress}
                  highlight={highlight}
                />
              ))}
            </div>
          </div>

          <ol
            aria-hidden="true"
            className="mono-label mx-auto flex w-full max-w-6xl gap-6 px-5 pb-8 sm:px-8"
          >
            {highlights.map(({ title: label }, i) => (
              <li
                key={label}
                className={`transition-colors duration-300 ${i === active ? "text-mint" : "text-mist/60"}`}
              >
                {label}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
