import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { MailIcon } from "@/components/ui/icons";
import { DrawLine, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="scroll-mt-16 py-24">
      <Container>
        <DrawLine />
        <RevealGroup className="space-y-10 pt-16">
          <RevealItem>
            <h2
              id="contacto-titulo"
              className="text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl"
            >
              Hablemos.
            </h2>
          </RevealItem>

          <RevealItem>
            <p className="max-w-[48ch] text-lg text-muted text-pretty">
              Estoy abierto a prácticas y nuevos proyectos. Escríbeme y respondo lo antes posible.
            </p>
          </RevealItem>

          <RevealItem>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block rounded-md text-2xl font-medium tracking-tight break-all text-accent underline decoration-accent/40 underline-offset-8 transition-[text-decoration-color] duration-150 hover:decoration-accent sm:text-4xl"
            >
              {profile.email}
            </a>
          </RevealItem>

          <RevealItem className="flex flex-wrap gap-3">
            <Button href="/contacto">
              <MailIcon />
              Hablemos de tu proyecto
            </Button>
            <CopyEmailButton email={profile.email} />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
