import type { Service } from "@/types/content";

/** Edita libremente: cada servicio se renderiza tal cual en el home y en /servicios. */
export const services: Service[] = [
  {
    id: "web",
    title: "Desarrollo web a medida",
    description:
      "Sitios y aplicaciones web rápidos, accesibles y pensados para que tu proyecto se vea profesional desde el primer día.",
    features: ["Landing pages y portafolios", "Diseño responsive", "SEO y rendimiento", "Next.js y React"],
  },
  {
    id: "app",
    title: "Apps y sistemas de gestión",
    description:
      "Herramientas a la medida de tu negocio: paneles, simuladores y sistemas que ordenan y automatizan tu trabajo.",
    features: ["Dashboards y paneles", "Formularios y flujos", "Cálculos y simuladores", "Integración con APIs"],
  },
  {
    id: "maintenance",
    title: "Mantenimiento y mejoras",
    description:
      "Corrijo errores, mejoro la velocidad y actualizo sitios que ya existen sin que tengas que empezar de cero.",
    features: ["Corrección de errores", "Optimización de velocidad", "Nuevas funciones", "Rediseño de secciones"],
  },
  {
    id: "design",
    title: "Diseño UI y consultoría",
    description:
      "Te ayudo a aterrizar la idea: prototipos de interfaz y asesoría técnica para elegir bien antes de construir.",
    features: ["Prototipos de interfaz", "Revisión de usabilidad", "Asesoría de tecnologías", "Plan del proyecto"],
  },
];
