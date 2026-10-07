# Portafolio · Juan Carlos Pashma Alvarez

Next.js (App Router) · TypeScript estricto · Tailwind CSS · Motion · next-themes.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Dónde editar el contenido

| Qué                                  | Archivo              |
| ------------------------------------ | -------------------- |
| Nombre, bio, correo, GitHub/LinkedIn | `data/profile.ts`    |
| Texto de "Sobre mí"                  | `data/about.ts`      |
| Habilidades por categoría            | `data/skills.ts`     |
| Proyectos (`/proyectos`)             | `data/projects.ts`   |
| Navegación y URL del sitio           | `data/site.ts`       |
| Springs y constantes de animación    | `lib/motion.ts`      |
| Colores y tema                       | `app/globals.css`    |

Define `NEXT_PUBLIC_SITE_URL` en producción (por ejemplo `https://tu-dominio.com`) para que las URLs de Open Graph sean correctas.
