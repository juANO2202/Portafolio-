export const siteConfig = {
  /** Define NEXT_PUBLIC_SITE_URL en producción para URLs absolutas de Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_ES",
} as const;

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
] as const;
