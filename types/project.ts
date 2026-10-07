export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Ruta dentro de /public (ej. "/projects/mi-app.png"). */
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
