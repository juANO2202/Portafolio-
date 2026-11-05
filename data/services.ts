import type { Service } from "@/types/content";

/**
 * Edita libremente: cada servicio se renderiza tal cual en la sección Servicios.
 * Tono: profesional y claro. Se explica en lenguaje sencillo y el término técnico va entre
 * paréntesis o en las etiquetas, para que lo entienda tanto quien contrata como quien conoce el tema.
 * Las tecnologías mencionadas salen de data/skills.ts.
 */
export const services: Service[] = [
  {
    id: "app",
    title: "Software a medida",
    description:
      "Desarrollo el sistema completo que tu negocio necesita: la interfaz que usan las personas y, por detrás, el servidor y la base de datos que lo hacen funcionar.",
    features: [
      "Sistemas de gestión y aplicaciones web",
      "Acceso con usuario y contraseña (JWT)",
      "Formularios, cálculos y reportes en PDF",
      "Base de datos (SQL Server)",
    ],
  },
  {
    id: "backend",
    title: "Servicios y APIs",
    description:
      "Construyo la parte que no se ve: servidores y servicios ordenados, seguros y listos para crecer, que conectan tus sistemas entre sí y con otras herramientas.",
    features: [
      ".NET 8 y C#",
      "APIs REST",
      "Microservicios",
      "Contenedores con Docker",
    ],
  },
  {
    id: "web",
    title: "Sitios y aplicaciones web",
    description:
      "Interfaces claras, rápidas y accesibles para tu negocio o marca, bien adaptadas tanto a celular como a computador y visibles en buscadores.",
    features: [
      "Sitio de presentación o portafolio",
      "React, Next.js y TypeScript",
      "Adaptable a celular y computador (responsive)",
      "Carga rápida",
    ],
  },
  {
    id: "maintenance",
    title: "Mejora y mantenimiento",
    description:
      "Reviso y mejoro software que ya existe y presenta fallas, funciona lento o quedó desactualizado, sin necesidad de empezar desde cero.",
    features: [
      "Corrección de errores",
      "Mayor velocidad y rendimiento",
      "Nuevas funcionalidades",
      "Renovación del diseño",
    ],
  },
  {
    id: "design",
    title: "Asesoría y planificación",
    description:
      "Si tienes una idea pero no sabes por dónde empezar, la analizamos juntos: te explico las opciones con un lenguaje claro y definimos un plan de trabajo.",
    features: [
      "Análisis de lo que realmente necesitas",
      "Boceto previo del resultado",
      "Plan con pasos y tiempos",
      "Recomendación de herramientas",
    ],
  },
];
