import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { aboutHighlights, aboutParagraphs } from "@/data/about";

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-titulo" className="scroll-mt-16 py-24">
      <Container>
        <RevealGroup className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <RevealItem>
              <SectionHeading id="sobre-mi-titulo" eyebrow="Sobre mí" title="Detalles que se sienten." />
            </RevealItem>
            {aboutParagraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="leading-relaxed text-muted text-pretty">{paragraph}</p>
              </RevealItem>
            ))}
          </div>

          <ul className="grid gap-4">
            {aboutHighlights.map(({ title, text }) => (
              <RevealItem key={title} as="li">
                <TiltCard>
                  <div className="space-y-1.5 p-6">
                    <h3 className="font-medium tracking-tight">{title}</h3>
                    <p className="text-sm text-muted">{text}</p>
                  </div>
                </TiltCard>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  );
}
