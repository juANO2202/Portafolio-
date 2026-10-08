import type { Profile } from "@/types/profile";

/**
 * Datos personales: edita solo este archivo.
 * Para agregar LinkedIn después, descomenta la línea `linkedin`.
 */
export const profile: Profile = {
  name: "Juan Carlos Pashma Alvarez",
  shortName: "Juan Pashma",
  initials: "JP",
  role: "Estudiante de Ingeniería en Software",
  bio: "Estudiante de Ingeniería en Software que construye aplicaciones web claras, accesibles y con atención al detalle.",
  email: "juan.pashma2202@gmail.com",
  availability: "Disponible para prácticas y nuevos proyectos",
  // photo: "/juan.jpg", // coloca tu foto en /public (formato vertical 4:5 recomendado)
  links: {
    github: "https://github.com/juANO2202",
    // linkedin: "https://www.linkedin.com/in/tu-usuario",
  },
};
