import type { Project } from "@/types/project";

/**
 * Agrega tus proyectos aquí. Mientras la lista esté vacía, /proyectos muestra un empty state.
 *
 * Ejemplo:
 * {
 *   title: "Mi proyecto",
 *   description: "Qué hace y qué problema resuelve.",
 *   tags: ["Next.js", "TypeScript"],
 *   image: "/projects/mi-proyecto.png", // archivo dentro de /public
 *   githubUrl: "https://github.com/juANO2202/mi-proyecto",
 *   liveUrl: "https://mi-proyecto.vercel.app",
 *   featured: true,
 * }
 */
export const projects: Project[] = [
  {
    title: "Simulador de crédito",
    description:
      "Simula créditos de consumo, hipotecarios y educativos con sistema francés o alemán. Calcula la tabla de amortización con interés y seguro de desgravamen, guarda el historial por usuario y exporta a PDF. Backend en microservicios .NET 8.",
    tags: [".NET 8", "React", "SQL Server", "Docker", "YARP", "JWT"],
    image: "/projects/simulador-de-credito.jpg",
    githubUrl: "https://github.com/juANO2202/SimuladordePrestamos",
    featured: true,
  },
  {
    title: "LMS inteligente con asistente de IA",
    description:
      "Proyecto en equipo de 3 sobre Moodle: el docente sube su sílabo, la IA propone el curso y luego responde en lenguaje natural con los datos reales. Mi parte fue el backend de IA, datos y analítica en NestJS: extracción del sílabo, chat con herramientas y seudonimización, indicadores, señales de dificultad y recomendaciones pedagógicas.",
    tags: ["NestJS", "TypeScript", "Zod", "Jest", "Moodle", "LLM"],
    image: "/projects/lms-asistente-ia.jpg",
    githubUrl: "https://github.com/kiramman-mp3/sistema-gestion-aprendizaje-IA",
  },
  {
    title: "Oromedios",
    description:
      "Sitio web de Oromedios, radio online desde Ambato, Ecuador. Landing page responsive con reproductor en directo, secciones de programación (clásicos, noticias y entretenimiento) y contacto.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/projects/oromedios.png",
    githubUrl: "https://github.com/juANO2202/OroMedios",
    liveUrl: "https://oromedios.com/",
  },
];
