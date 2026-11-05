import { ContactForm } from "@/components/contact/contact-form";
import { LocationMap } from "@/components/contact/location-map";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { ClockIcon, HandshakeIcon, TagIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { getSocialLinks } from "@/lib/links";

const benefits = [
  { icon: <ClockIcon />, text: "Respuesta en menos de 24 horas" },
  { icon: <HandshakeIcon />, text: "Consulta inicial sin compromiso" },
  { icon: <TagIcon />, text: "Presupuesto adaptado a lo que necesitas" },
];

export function Contact() {
  const social = getSocialLinks();

  return (
    <section
      id="contacto"
      data-tone="light"
      aria-labelledby="contacto-titulo"
      className="bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <RevealGroup className="space-y-10 lg:col-span-5">
          <RevealItem className="space-y-6">
            <h2 id="contacto-titulo" className="display text-[clamp(3rem,7.5vw,6.5rem)]">
              Hablemos<span className="text-leaf">.</span>
            </h2>
            <p className="max-w-[36ch] text-xl text-ink-muted text-pretty">
              Estoy abierto a prácticas y nuevos proyectos. Escríbeme y respondo lo antes posible.
            </p>
          </RevealItem>

          <RevealItem>
            <ul className="space-y-4">
              {benefits.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-leaf/12 text-leaf">
                    {icon}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="block text-xl font-bold tracking-[-0.02em] break-all text-leaf underline decoration-leaf/40 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-leaf"
            >
              {profile.email}
            </a>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <CopyEmailButton email={profile.email} />
              {social.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="lg:col-span-7">
          <RevealItem>
            <ContactForm />
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="lg:col-span-12">
          <RevealItem>
            <LocationMap />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
