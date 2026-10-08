# Portafolio · Juan Carlos Pashma Alvarez

Portafolio personal con home (hero, sobre mí, habilidades, contacto) y una página de proyectos.
Dark-first con tema claro, animaciones con springs y soporte de `prefers-reduced-motion`.

**Stack:** Next.js (App Router) · React · TypeScript estricto · Tailwind CSS v4 · Motion · next-themes · Phosphor Icons

## Empezar

```bash
git clone https://github.com/juANO2202/Portafolio-.git
cd Portafolio-
npm install
cp .env.example .env.local   # opcional en local
npm run dev                  # http://localhost:3000
```

| Script          | Qué hace                    |
| --------------- | --------------------------- |
| `npm run dev`   | Servidor de desarrollo      |
| `npm run build` | Build de producción         |
| `npm run start` | Sirve el build              |
| `npm run lint`  | ESLint                      |

## Estructura

```text
app/                  Rutas (App Router): layout, home, /proyectos, Open Graph, template de transición
components/
  layout/             Navbar y footer
  sections/           Secciones de página: hero, about, skills, contact, project-card, portrait
  ui/                 Piezas reutilizables: button, tilt-card, reveal, theme-toggle, iconos…
data/                 Todo el contenido editable (perfil, about, skills, proyectos, navegación)
lib/                  Utilidades: tokens de animación (motion.ts), enlaces, metadata
types/                Tipos compartidos
public/               Estáticos; las capturas de proyectos van en public/projects/
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
| Colores, tema y curvas de easing     | `app/globals.css`    |

## Despliegue

Pensado para [Vercel](https://vercel.com): importa el repositorio y define la variable
`NEXT_PUBLIC_SITE_URL` con la URL final (por ejemplo `https://tu-dominio.com`) para que las
URLs de Open Graph sean correctas.
