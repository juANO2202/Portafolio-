import type { Highlight } from "@/types/content";

/** Texto de la sección "Sobre mí": edítalo con tu propia voz. */
export const aboutParagraphs: string[] = [
  "Soy estudiante de Ingeniería en Software y me interesa construir aplicaciones web que se entiendan desde el primer vistazo.",
  "Cuido los detalles que casi nadie nota —la accesibilidad, la jerarquía visual, el movimiento con propósito— porque son los que hacen que una interfaz se sienta bien hecha.",
];

export const aboutHighlights: Highlight[] = [
  {
    title: "Claridad",
    text: "Interfaces simples, con jerarquía visible y lenguaje directo.",
  },
  {
    title: "Accesibilidad",
    text: "Navegación por teclado, buen contraste y respeto por las preferencias de cada persona.",
  },
  {
    title: "Atención al detalle",
    text: "Espaciados, tipografía y animaciones pensados, nunca aleatorios.",
  },
];
