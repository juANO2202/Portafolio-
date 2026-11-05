import Image from "next/image";
import { ExternalLinkIcon, GitHubIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

// Los destacados van primero; el resto conserva el orden de data/projects.ts.
const sorted = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
);

/** Texto de la barra de la maqueta: la dirección real del proyecto, sin protocolo. */
function addressOf(project: Project): string {
  const url = project.liveUrl ?? project.githubUrl ?? "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ProjectRow({ project }: { project: Project }) {
  const { title, description, tags, image, githubUrl, liveUrl, featured } = project;

  return (
    <article className="group grid items-center gap-10 border-t border-ink/10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
      <RevealGroup className="min-w-0 space-y-6 lg:col-span-5">
        {featured && (
          <RevealItem>
            <p className="mono-label text-leaf">Destacado</p>
          </RevealItem>
        )}
        <RevealItem>
          <h3 className="display text-[clamp(2.25rem,4.6vw,3.75rem)] text-balance">{title}</h3>
        </RevealItem>
        <RevealItem>
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
            {tags.map((tag) => (
              <li
                key={tag}
                className="mono-label rounded-full border border-ink/15 bg-cream-2/60 px-3 py-1.5 text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
        </RevealItem>
        <RevealItem>
          <p className="max-w-[46ch] text-lg text-ink-muted text-pretty">{description}</p>
        </RevealItem>
        <RevealItem className="flex flex-wrap gap-3 pt-1">
          {liveUrl && (
            <Button href={liveUrl} aria-label={`Ver ${title} en vivo (se abre en una pestaña nueva)`}>
              Ver en vivo
              <ExternalLinkIcon size={18} />
            </Button>
          )}
          {githubUrl && (
            <Button
              href={githubUrl}
              variant={liveUrl ? "secondary" : "primary"}
              aria-label={`Código de ${title} en GitHub (se abre en una pestaña nueva)`}
            >
              <GitHubIcon size={18} />
              Código
            </Button>
          )}
        </RevealItem>
      </RevealGroup>

      {image && (
        <RevealGroup className="min-w-0 lg:col-span-7">
          <RevealItem>
            {/* Maqueta de navegador: barra con la dirección real y la captura debajo. */}
            <div className="overflow-hidden rounded-3xl bg-cream-2 shadow-[0_40px_80px_-36px_rgba(6,17,13,0.45)] ring-1 ring-ink/10 transition-transform duration-700 ease-snap group-hover:[transform:perspective(1400px)_rotateY(-2.5deg)_rotateX(1.2deg)_translateY(-4px)]">
              <div className="flex h-11 items-center px-4">
                <span className="mono-label mx-auto max-w-full truncate rounded-full bg-cream px-4 py-1.5 text-ink-muted">
                  {addressOf(project)}
                </span>
              </div>
              <div className="relative aspect-[16/10] bg-cream">
                <Image
                  src={image}
                  alt={`Captura de ${title}`}
                  fill
                  sizes="(min-width: 1024px) 56vw, 92vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      )}
    </article>
  );
}

export function Projects() {
  if (sorted.length === 0) return null;

  return (
    <section
      id="proyectos"
      data-tone="light"
      aria-labelledby="proyectos-titulo"
      className="overflow-x-clip bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <RevealGroup className="mb-14 max-w-3xl space-y-6">
          <RevealItem>
            <h2 id="proyectos-titulo" className="display text-[clamp(3rem,8vw,7rem)]">
              Proyectos<span className="text-leaf">.</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[46ch] text-xl text-ink-muted text-pretty">
              Una selección de mi trabajo, con el código abierto cuando es posible.
            </p>
          </RevealItem>
        </RevealGroup>

        <div>
          {sorted.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}
