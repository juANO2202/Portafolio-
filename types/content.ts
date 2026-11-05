export interface SkillCategory {
  title: string;
  /** Una frase que explica para qué sirve la categoría. */
  summary: string;
  items: string[];
}

export interface Highlight {
  title: string;
  text: string;
}

export type ServiceIconName = "app" | "backend" | "web" | "maintenance" | "design";

export interface Service {
  id: ServiceIconName;
  title: string;
  description: string;
  features: string[];
}
