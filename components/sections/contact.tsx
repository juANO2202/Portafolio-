import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { MailIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="scroll-mt-16 py-24">
      <Container>
        <RevealGroup className="surface space-y-8 px-6 py-12 sm:px-12 sm:py-16">
          <RevealItem>
            <SectionHeading
              id="contacto-titulo"
              eyebrow="Contacto"
              title="Hablemos."
              description="Estoy abierto a prácticas y nuevos proyectos. Escríbeme y respondo lo antes posible."
            />
          </RevealItem>

          <RevealItem>
            <p className="text-lg font-medium tracking-tight break-all sm:text-xl">{profile.email}</p>
          </RevealItem>

          <RevealItem className="flex flex-wrap gap-3">
            <CopyEmailButton email={profile.email} />
            <Button href={`mailto:${profile.email}`} variant="secondary">
              <MailIcon width={18} height={18} />
              Escribir un correo
            </Button>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
