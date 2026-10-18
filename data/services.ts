import type { Service } from "@/types/content";

/** Edita libremente: cada servicio se renderiza tal cual en el home y en /servicios. */
export const services: Service[] = [
  {
    id: "web",
    title: "Tu página web",
    description:
      "Creo la página de tu negocio o tu marca para que te encuentren en internet, se vea bien en el celular y transmita confianza.",
    features: [
      "Página de presentación o portafolio",
      "Se ve bien en celular y computador",
      "Aparece en Google",
      "Carga rápido",
    ],
  },
  {
    id: "app",
    title: "Programas a tu medida",
    description:
      "Si hoy llevas tu trabajo en papel o en Excel, te hago un sistema propio para ordenarlo y ahorrar tiempo: usuarios, datos guardados y reportes.",
    features: [
      "Sistemas con inicio de sesión",
      "Base de datos y servidor (backend)",
      "Formularios, cálculos y reportes en PDF",
      "Conexión con otros servicios",
    ],
  },
  {
    id: "maintenance",
    title: "Arreglar o mejorar tu web",
    description:
      "¿Ya tienes una página que falla, va lenta o se ve anticuada? La reviso y la arreglo sin que tengas que empezar de cero.",
    features: [
      "Corrijo lo que no funciona",
      "La hago más rápida",
      "Agrego funciones nuevas",
      "Renuevo su diseño",
    ],
  },
  {
    id: "design",
    title: "Te oriento antes de empezar",
    description:
      "Si tienes una idea pero no sabes por dónde empezar, la conversamos: te explico las opciones sin tecnicismos y armamos un plan claro.",
    features: [
      "Te explico qué necesitas y qué no",
      "Boceto de cómo se verá",
      "Plan con pasos y tiempos",
      "Recomendación de herramientas",
    ],
  },
];
