export interface SkillCategory {
  title: string;
  items: string[];
}

export interface Highlight {
  title: string;
  text: string;
}

export type ServiceIconName = "web" | "app" | "maintenance" | "design";

export interface Service {
  id: ServiceIconName;
  title: string;
  description: string;
  features: string[];
}
