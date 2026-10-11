import { ServiceCard } from "@/components/sections/service-card";
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
    "Desarrollo web a medida, apps y sistemas de gestión, mantenimiento y mejoras, diseño UI y consultoría.",
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
            description="Convierto ideas en productos web claros y rápidos. Estos son los servicios que ofrezco."
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
