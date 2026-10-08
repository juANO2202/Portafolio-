import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillCategories } from "@/data/skills";

/**
 * Índice editorial: una fila por categoría (número, título grande, tecnologías en línea).
 * En escritorio, al pasar el cursor por una fila las demás se atenuan (ver `.skill-list` en globals.css)
 * y una línea del acento se dibuja bajo la fila. En móvil las filas se apilan sin hover.
 */
export function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-titulo" className="scroll-mt-16 py-24">
      <Container>
        <RevealGroup className="space-y-14">
          <RevealItem>
            <SectionHeading
              id="habilidades-titulo"
              title="Con lo que construyo."
              description="Las herramientas y fundamentos que uso a diario."
            />
          </RevealItem>

          <ul className="skill-list border-t border-line">
            {skillCategories.map(({ title, items }, i) => (
              <RevealItem key={title} as="li">
                <div className="skill-row group relative grid gap-4 border-b border-line py-8 transition-opacity duration-200 md:grid-cols-12 md:gap-8 md:py-10">
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-accent tabular-nums md:col-span-1 md:pt-3"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-3xl font-semibold tracking-[-0.02em] transition-transform duration-300 ease-snap sm:text-4xl md:col-span-4 md:group-hover:translate-x-2">
                    {title}
                  </h3>

                  <ul className="flex flex-wrap gap-x-2 gap-y-2 md:col-span-7 md:pt-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-pill px-3.5 py-1.5 text-sm transition-[color,border-color,background-color] duration-200 group-hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Línea del acento: se dibuja al entrar en hover y se retira por el otro lado. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-right scale-x-0 bg-accent transition-transform duration-500 ease-snap md:group-hover:origin-left md:group-hover:scale-x-100"
                  />
                </div>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  );
}
