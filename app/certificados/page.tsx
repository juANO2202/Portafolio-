import { CertificateCard } from "@/components/cards/certificate-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { certificates } from "@/data/certificates";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Certificados",
  description: `Cursos y certificaciones de ${profile.name}.`,
  path: "/certificados",
});

export default function CertificadosPage() {
  return (
    <Container className="py-24">
      <RevealGroup inView={false} className="space-y-12">
        <RevealItem>
          <SectionHeading
            id="certificados-titulo"
            title="Lo que he aprendido."
            description="Cursos y certificaciones que respaldan mi formación."
          />
        </RevealItem>

        {certificates.length === 0 ? (
          <RevealItem>
            <EmptyState
              title="Pronto subiré mis certificados"
              description="Estoy ordenando mis cursos y certificaciones para publicarlos aquí."
            >
              <Button href="/" variant="secondary">
                Volver al inicio
              </Button>
            </EmptyState>
          </RevealItem>
        ) : (
          <ul
            aria-labelledby="certificados-titulo"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {certificates.map((certificate) => (
              <RevealItem key={certificate.title} as="li">
                <CertificateCard certificate={certificate} />
              </RevealItem>
            ))}
          </ul>
        )}
      </RevealGroup>
    </Container>
  );
}
