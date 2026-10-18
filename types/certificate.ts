export interface Certificate {
  title: string;
  /** Quién lo emitió (institución, plataforma o curso). */
  issuer: string;
  /** Fecha para mostrar, p. ej. "Marzo 2026" o "2025". */
  date: string;
  /** Opcional: imagen del certificado dentro de /public (p. ej. "/certificates/mi-curso.jpg"). */
  image?: string;
  /** Opcional: PDF dentro de /public (p. ej. "/certificates/mi-curso.pdf"). */
  file?: string;
  /** Opcional: enlace de verificación del emisor. */
  credentialUrl?: string;
}
