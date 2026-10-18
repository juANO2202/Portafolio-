import { ServiceCard } from "@/components/cards/service-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MailIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Servicios",
  description:
    "Tu página web, programas a tu medida, arreglo y mejora de sitios existentes, y orientación para empezar tu proyecto.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <Container className="py-24">
      <RevealGroup inView={false} className="space-y-12">
        <RevealItem>
          <SectionHeading
            id="servicios-titulo"
            title="Servicios."
            description="Convierto tus ideas en páginas y programas que funcionan. Esto es lo que puedo hacer por ti."
          />
        </RevealItem>

        <ul aria-labelledby="servicios-titulo" className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <RevealItem key={service.id} as="li">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </ul>

        <RevealItem className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">¿Tienes un proyecto en mente?</h2>
            <p className="text-muted">Cuéntame tu idea y te respondo con una propuesta.</p>
          </div>
          <Button href="/contacto">
            <MailIcon />
            Hablemos de tu proyecto
          </Button>
        </RevealItem>
      </RevealGroup>
    </Container>
  );
}
