import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { GitHubIcon } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Proyectos",
  description: `Proyectos de ${profile.name}: aplicaciones web claras, accesibles y con atención al detalle.`,
  path: "/proyectos",
});

// Los destacados van primero; el resto conserva el orden de data/projects.ts.
const sortedProjects = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
);

export default function ProyectosPage() {
  return (
    <Container className="py-24">
      <RevealGroup inView={false} className="space-y-12">
        <RevealItem>
          <SectionHeading
            id="proyectos-titulo"
            title="Lo que he construido."
            description="Una selección de mi trabajo, con el código abierto cuando es posible."
          />
        </RevealItem>

        {sortedProjects.length === 0 ? (
          <RevealItem>
            <EmptyState
              title="Aún no hay proyectos publicados"
              description="Estoy preparando los primeros. Mientras tanto, puedes ver mi actividad en GitHub."
            >
              <Button href={profile.links.github}>
                <GitHubIcon width={18} height={18} />
                Ver GitHub
              </Button>
              <Button href="/" variant="secondary">
                Volver al inicio
              </Button>
            </EmptyState>
          </RevealItem>
        ) : (
          <ul aria-labelledby="proyectos-titulo" className="grid gap-4 md:grid-cols-2">
            {sortedProjects.map((project) => (
              <RevealItem key={project.title} as="li">
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </ul>
        )}
      </RevealGroup>
    </Container>
  );
}
