import type { Certificate } from "@/types/certificate";

/**
 * Agrega tus certificados aquí. Los archivos van en la carpeta public/certificates/.
 * Mientras la lista esté vacía, /certificados muestra un mensaje de "próximamente".
 *
 * Ejemplo:
 * {
 *   title: "Desarrollo web con React",
 *   issuer: "Platzi",
 *   date: "Marzo 2026",
 *   image: "/certificates/react.jpg",   // vista previa (opcional)
 *   file: "/certificates/react.pdf",    // PDF para abrir (opcional)
 *   credentialUrl: "https://...",       // verificación en línea (opcional)
 * }
 */
export const certificates: Certificate[] = [];
