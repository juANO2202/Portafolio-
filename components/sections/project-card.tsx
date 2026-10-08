import Image from "next/image";
import { ExternalLinkIcon, GitHubIcon } from "@/components/ui/icons";
import { TiltCard } from "@/components/ui/tilt-card";
import type { Project } from "@/types/project";

const linkClass =
  "group/link inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted " +
  "transition-[color,background-color,transform] duration-150 " +
  "hover:bg-pill hover:text-foreground active:scale-[0.97] active:duration-75";

const arrowNudge =
  "transition-transform duration-200 ease-snap group-hover/link:translate-x-px group-hover/link:-translate-y-px";

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, tags, image, githubUrl, liveUrl, featured } = project;

  return (
    <TiltCard>
      <article className="group flex h-full flex-col">
        {image && (
          <div className="relative aspect-video overflow-hidden border-b border-line">
            <Image
              src={image}
              alt={`Captura de ${title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-snap group-hover:scale-[1.05]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-medium tracking-tight">{title}</h3>
              {featured && (
                <span className="shrink-0 rounded-full border border-line bg-pill px-2.5 py-0.5 text-xs text-muted">
                  Destacado
                </span>
              )}
            </div>
            <p className="text-sm text-muted">{description}</p>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-pill px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          {(githubUrl || liveUrl) && (
            <div className="mt-auto -ml-3 flex flex-wrap gap-1 pt-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  aria-label={`Código de ${title} en GitHub (se abre en una pestaña nueva)`}
                >
                  <GitHubIcon width={16} height={16} />
                  Código
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  aria-label={`Ver ${title} en vivo (se abre en una pestaña nueva)`}
                >
                  <ExternalLinkIcon width={16} height={16} className={arrowNudge} />
                  Ver en vivo
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </TiltCard>
  );
}
