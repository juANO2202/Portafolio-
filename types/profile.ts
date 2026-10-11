export interface Profile {
  name: string;
  /** Nombre corto para la marca del navbar. */
  shortName: string;
  initials: string;
  role: string;
  bio: string;
  email: string;
  availability: string;
  /** Ciudad y país que se muestran en el mapa de /contacto (no pongas tu dirección exacta). */
  location: string;
  /** Opcional: ruta dentro de /public (p. ej. "/juan.jpg"). Sin foto se muestra un monograma. */
  photo?: string;
  links: {
    github: string;
    /** Opcional: si no existe, no se renderiza ningún ícono ni enlace. */
    linkedin?: string;
  };
}

export type SocialLinkId = "github" | "linkedin" | "email";

export interface SocialLink {
  id: SocialLinkId;
  label: string;
  href: string;
}
