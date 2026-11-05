export const siteConfig = {
  /** Define NEXT_PUBLIC_SITE_URL en producción para URLs absolutas de Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_ES",
} as const;

/** La página es una sola: cada enlace lleva a una sección (el id existe en app/page.tsx). */
export const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "servicios", label: "Servicios" },
  { id: "certificados", label: "Certificados" },
  { id: "contacto", label: "Contacto" },
] as const;

export type SectionId = (typeof navItems)[number]["id"] | "historia";
