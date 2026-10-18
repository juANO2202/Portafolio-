import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="scroll-mt-16 py-24">
      <Container>
        <RevealGroup className="space-y-12">
          <RevealItem>
            <SectionHeading
              id="servicios-titulo"
              title="Cómo puedo ayudarte."
              description="Te ayudo a llevar tu idea a internet, desde el primer boceto hasta la página funcionando."
            />
          </RevealItem>

          <ul aria-labelledby="servicios-titulo" className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <RevealItem key={service.id} as="li">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </ul>

          <RevealItem>
            <Button href="/servicios" variant="secondary">
              Ver todos los servicios
              <ArrowRightIcon />
            </Button>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
