import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";

export const defaultTitle = `${profile.name} · ${profile.role}`;

// Generada por app/opengraph-image.tsx. Se declara a mano porque Next no hereda la imagen de
// archivo cuando una página define su propio `openGraph`.
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: defaultTitle };

interface PageMetadataInput {
  /** Título de la página; se combina con la plantilla del layout. Si falta, se usa el título por defecto. */
  title?: string;
  description?: string;
  path: string;
}

/**
 * Metadata consistente por página. Next reemplaza `openGraph` completo cuando una página lo define,
 * así que aquí se repiten los campos base para no perderlos.
 */
export function createPageMetadata({
  title,
  description = profile.bio,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${profile.name}` : defaultTitle;

  return {
    ...(title ? { title } : { title: { absolute: defaultTitle } }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: profile.name,
      title: fullTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
