import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-titulo" className="scroll-mt-16 py-24">
      <Container>
        <RevealGroup className="space-y-12">
          <RevealItem>
            <SectionHeading
              id="habilidades-titulo"
              eyebrow="Habilidades"
              title="Con lo que construyo."
              description="Las herramientas y fundamentos que uso a diario."
            />
          </RevealItem>

          <ul className="grid gap-4 md:grid-cols-3">
            {skillCategories.map(({ title, items }) => (
              <RevealItem key={title} as="li">
                <TiltCard>
                  <div className="space-y-4 p-6">
                    <h3 className="font-medium tracking-tight">{title}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-pill px-3 py-1 text-sm text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
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
