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
      "Aplicación web para simular créditos de consumo, hipotecarios y educativos con sistema francés o alemán. Calcula la tabla de amortización con interés y seguro de desgravamen, guarda el historial por usuario y exporta el resultado a PDF. Backend con microservicios .NET 8 tras un API Gateway.",
    tags: [".NET 8", "React", "SQL Server", "Docker", "YARP", "JWT"],
    image: "/projects/simulador-de-credito.jpg",
    githubUrl: "https://github.com/juANO2202/SimuladordePrestamos",
    featured: true,
  },
];
