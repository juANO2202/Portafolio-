import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { services } from "@/data/services";

/**
 * Servicios sobre verde bosque. Izquierda: titular fijo. Derecha: los cuatro servicios en una línea de
 * tiempo vertical (la línea nace de arriba y se dibuja al entrar). Todo el texto sale de data/services.ts.
 */
export function Services() {
  return (
    <section
      id="servicios"
      data-tone="dark"
      aria-labelledby="servicios-titulo"
      className="bg-forest py-24 text-cream sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <RevealGroup className="space-y-6 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <RevealItem>
            <h2 id="servicios-titulo" className="display text-[clamp(3rem,7.5vw,6.5rem)]">
              Servicios<span className="text-mint">.</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[34ch] text-xl text-mist text-pretty">
              Acompaño tu proyecto de software desde la idea hasta que está publicado y funcionando.
            </p>
          </RevealItem>
        </RevealGroup>

        <ol className="relative space-y-14 border-l border-cream/15 pl-8 sm:pl-12 lg:col-span-7">
          {services.map((service) => (
            <li key={service.id} className="relative">
              {/* Marcador de la línea de tiempo: señala dónde empieza cada servicio. */}
              <span
                aria-hidden="true"
                className="absolute top-3 -left-[calc(2rem+4.5px)] size-2 rounded-full bg-mint sm:-left-[calc(3rem+4.5px)]"
              />
              <RevealGroup className="space-y-5">
                <RevealItem>
                  <h3 className="display text-[clamp(1.75rem,3.2vw,2.5rem)] text-balance">
                    {service.title}
                  </h3>
                </RevealItem>
                <RevealItem>
                  <p className="max-w-[52ch] text-lg text-mist text-pretty">{service.description}</p>
                </RevealItem>
                <RevealItem>
                  <ul className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="mono-label rounded-full border border-cream/15 px-3 py-2 text-cream/90"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              </RevealGroup>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
