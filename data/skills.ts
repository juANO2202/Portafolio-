import type { SkillCategory } from "@/types/content";

/** Edita libremente: categorías y elementos se renderizan tal cual. */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "Backend",
    items: [".NET 8", "C#", "APIs REST", "SQL Server", "Microservicios", "Docker", "JWT"],
  },
  {
    title: "Fundamentos web",
    items: ["HTML semántico", "CSS", "JavaScript", "Accesibilidad", "Diseño responsive"],
  },
  {
    title: "Herramientas",
    items: ["Git", "GitHub", "npm", "VS Code"],
  },
];
