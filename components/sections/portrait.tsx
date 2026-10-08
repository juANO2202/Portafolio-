import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * Retrato del hero. Con `profile.photo` usa la foto real (carga prioritaria para el LCP).
 * Sin foto muestra un monograma tipográfico, no una ilustración inventada.
 */
export function Portrait() {
  return (
    <figure className="space-y-3">
      <div className="surface relative aspect-[4/5] overflow-hidden">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={`Retrato de ${profile.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`Monograma de ${profile.name}`}
            className="flex size-full items-center justify-center bg-accent-soft"
          >
            <span className="text-9xl font-semibold tracking-[-0.06em] text-accent select-none sm:text-[10rem]">
              {profile.initials}
            </span>
          </div>
        )}
      </div>
      <figcaption className="text-sm text-muted">{profile.name}</figcaption>
    </figure>
  );
}
