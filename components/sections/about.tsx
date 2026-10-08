import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { aboutHighlights, aboutParagraphs } from "@/data/about";

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-titulo" className="scroll-mt-16 py-24">
      <Container>
        <RevealGroup className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Columna izquierda fija mientras se recorren los principios (solo en escritorio). */}
          <div className="space-y-6 md:col-span-5 md:sticky md:top-28 md:self-start">
            <RevealItem>
              <h2
                id="sobre-mi-titulo"
                className="text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl"
              >
                Cómo trabajo.
              </h2>
            </RevealItem>
            {aboutParagraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="max-w-[65ch] leading-relaxed text-muted text-pretty">{paragraph}</p>
              </RevealItem>
            ))}
          </div>

          <ul className="divide-y divide-line md:col-span-7 md:col-start-6">
            {aboutHighlights.map(({ title, text }) => (
              <RevealItem key={title} as="li" className="space-y-2 py-8 first:pt-0 last:pb-0">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
                <p className="max-w-[48ch] text-muted">{text}</p>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  );
}
