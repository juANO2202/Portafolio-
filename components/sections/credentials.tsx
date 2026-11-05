import { CertificateCard } from "@/components/cards/certificate-card";
import { CertificateIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { certificates } from "@/data/certificates";
import { skillCategories } from "@/data/skills";

const tilts = [-2.5, 1.8, -1.4, 2.4] as const;

/**
 * Certificados y herramientas, sobre verde bosque (continúa el bloque de Servicios).
 * Los certificados salen de data/certificates.ts: mientras esté vacío se muestra el aviso
 * "Pronto subiré mis certificados", sin tarjetas inventadas.
 */
export function Credentials() {
  return (
    <section
      id="certificados"
      data-tone="dark"
      aria-labelledby="certificados-titulo"
      className="bg-forest pb-28 text-cream sm:pb-36"
    >
      <div className="mx-auto w-full max-w-6xl space-y-24 border-t border-cream/10 px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="space-y-12">
          <RevealGroup className="max-w-3xl space-y-5">
            <RevealItem>
              <h2 id="certificados-titulo" className="display text-[clamp(2.75rem,6.5vw,5.5rem)]">
                Certificados<span className="text-mint">.</span>
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="max-w-[44ch] text-xl text-mist text-pretty">
                Cursos y certificaciones que respaldan mi formación.
              </p>
            </RevealItem>
          </RevealGroup>

          {certificates.length === 0 ? (
            <RevealGroup>
              <RevealItem className="flex max-w-xl items-center gap-5 rounded-3xl border border-dashed border-cream/20 p-6 sm:p-8">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mint/12 text-mint">
                  <CertificateIcon size={26} />
                </span>
                <div className="space-y-1">
                  <p className="text-xl font-bold tracking-[-0.03em]">Pronto subiré mis certificados</p>
                  <p className="text-mist">
                    Estoy ordenando mis cursos y certificaciones para publicarlos aquí.
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>
          ) : (
            <RevealGroup>
              <ul
                aria-labelledby="certificados-titulo"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {certificates.map((certificate, i) => (
                  <RevealItem key={certificate.title} as="li">
                    <CertificateCard certificate={certificate} tilt={tilts[i % tilts.length]} />
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          )}
        </div>

        <div className="space-y-12">
          <RevealGroup className="max-w-3xl space-y-5">
            <RevealItem>
              <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)]">
                Con lo que construyo<span className="text-mint">.</span>
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="max-w-[52ch] text-xl text-mist text-pretty">
                Las herramientas que uso a diario, tanto en lo que se ve (frontend) como en lo que
                no se ve (backend).
              </p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {skillCategories.map(({ title, items }) => (
              <RevealItem key={title} className="space-y-4">
                <h3 className="mono-label text-mint">{title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="mono-label rounded-full border border-cream/15 px-3.5 py-2 text-cream"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
