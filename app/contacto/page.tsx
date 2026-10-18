import { ContactForm } from "@/components/contact/contact-form";
import { LocationMap } from "@/components/contact/location-map";
import { Container } from "@/components/ui/container";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { ClockIcon, HandshakeIcon, TagIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { getSocialLinks } from "@/lib/links";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contacto",
  description: `Escríbele a ${profile.name} para hablar de tu proyecto: respuesta rápida y consulta inicial sin compromiso.`,
  path: "/contacto",
});

const benefits = [
  { icon: <ClockIcon />, text: "Respuesta en menos de 24 horas" },
  { icon: <HandshakeIcon />, text: "Consulta inicial sin compromiso" },
  { icon: <TagIcon />, text: "Presupuesto adaptado a lo que necesitas" },
];

export default function ContactoPage() {
  const social = getSocialLinks();

  return (
    <Container className="py-24">
      <RevealGroup inView={false} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-8 lg:col-span-5">
          <RevealItem className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
              ¿Tienes un proyecto en mente?
            </h1>
            <p className="text-lg text-muted text-pretty">
              Cuéntame tu idea y buscamos juntos la mejor forma de construirla.
            </p>
          </RevealItem>

          <RevealItem>
            <ul className="space-y-3">
              {benefits.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    {icon}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="space-y-3 text-sm">
            <p className="text-muted">También puedes escribirme directamente:</p>
            <a
              href={`mailto:${profile.email}`}
              className="block text-lg font-medium break-all text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {profile.email}
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <CopyEmailButton email={profile.email} />
              {social.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </RevealItem>
        </div>

        <RevealItem className="lg:col-span-7">
          <ContactForm />
        </RevealItem>

        <RevealItem className="mx-auto w-full max-w-3xl lg:col-span-12">
          <LocationMap />
        </RevealItem>
      </RevealGroup>
    </Container>
  );
}
