import type { SkillCategory } from "@/types/content";

/** Edita libremente: categorías y elementos se renderizan tal cual. */
export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    summary: "APIs, bases de datos y servicios que sostienen la aplicación.",
    items: [".NET 8", "C#", "APIs REST", "SQL Server", "Microservicios", "Docker", "JWT"],
  },
  {
    title: "Frontend",
    summary: "Interfaces rápidas, accesibles y con movimiento cuidado.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "Fundamentos web",
    summary: "La base de todo lo que construyo, sin importar el framework.",
    items: ["HTML semántico", "CSS", "JavaScript", "Accesibilidad", "Diseño responsive"],
  },
  {
    title: "Herramientas",
    summary: "Para trabajar con orden y dejar el código listo para crecer.",
    items: ["Git", "GitHub", "npm", "VS Code"],
  },
];
