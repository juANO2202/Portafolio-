# Portafolio · Juan Carlos Pashma Alvarez

Portafolio personal de una sola página: intro animada, hero con retrato, historia fijada al scroll con partículas en canvas, proyectos, servicios, certificados y contacto (formulario y mapa). Bloques crema y verde bosque, animaciones con springs y soporte de `prefers-reduced-motion`.

**Stack:** Next.js (App Router) · React · TypeScript estricto · Tailwind CSS v4 · Motion · Phosphor Icons · Resend

## Características

- **Servicios:** software a medida, servicios y APIs, sitios y aplicaciones web, mejora y mantenimiento, y asesoría y planificación.
- **Contacto:** sección con formulario (nombre, email, asunto, mensaje), canales directos y mapa de Google con la ciudad.
- **Formulario seguro:** validación en cliente y servidor, campo trampa contra bots y HTML escapado en el correo.
- **Proyectos:** filas con maqueta de navegador y capturas reales.
- **Historia con partículas:** sección fijada al scroll con figuras de software (interfaz, red y código) dibujadas en canvas.
- **Accesible y responsive:** HTML semántico, foco visible y movimiento reducido (sin intro ni animaciones continuas).
- **Una sola página:** las URLs antiguas (`/proyectos`, `/servicios`, `/certificados`, `/contacto`) redirigen a su sección.

## Empezar

```bash
git clone https://github.com/juANO2202/Portafolio-.git
cd Portafolio-
npm install
cp .env.example .env.local   # necesario solo para probar el formulario
npm run dev                  # http://localhost:3000
```

| Script          | Qué hace                    |
| --------------- | --------------------------- |
| `npm run dev`   | Servidor de desarrollo      |
| `npm run build` | Build de producción         |
| `npm run start` | Sirve el build              |
| `npm run lint`  | ESLint                      |

## Variables de entorno

| Variable               | Obligatoria | Para qué sirve                                                                 |
| ---------------------- | ----------- | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | En producción | URL final del sitio, para las URLs de Open Graph.                            |
| `RESEND_API_KEY`       | Para el formulario | Clave de [Resend](https://resend.com). Sin ella el formulario responde "no configurado". |
| `CONTACT_TO_EMAIL`     | No          | Destino de los mensajes. Por defecto, el correo de `data/profile.ts`.          |
| `CONTACT_FROM_EMAIL`   | No          | Remitente. Con dominio verificado en Resend, p. ej. `Portafolio <hola@tu-dominio.com>`. |

> Sin dominio verificado, Resend solo permite enviar al correo con el que creaste la cuenta.

## Estructura

```text
app/                  Rutas (App Router): home, /servicios, /proyectos, /contacto, /api/contact, Open Graph
components/
  layout/             Navbar, footer y providers
  sections/           Secciones de la home: hero, about, skills, services, contact, portrait
  cards/              Tarjetas: project-card, service-card, certificate-card
  contact/            Formulario de contacto y mapa de ubicación
  ui/                 Piezas reutilizables: button, reveal, theme-toggle, iconos…
data/                 Todo el contenido editable (perfil, about, skills, servicios, proyectos, navegación)
lib/                  Utilidades: tokens de animación (motion.ts), enlaces, metadata
types/                Tipos compartidos
public/               Estáticos: images/ (foto), projects/ (capturas), certificates/ (certificados)
```

## Dónde editar el contenido

| Qué                                              | Archivo              |
| ------------------------------------------------ | -------------------- |
| Nombre, bio, correo, ubicación, GitHub/LinkedIn  | `data/profile.ts`    |
| Texto de "Sobre mí"                              | `data/about.ts`      |
| Habilidades por categoría                        | `data/skills.ts`     |
| Servicios (home y `/servicios`)                  | `data/services.ts`   |
| Proyectos (`/proyectos`)                         | `data/projects.ts`   |
| Navegación y URL del sitio                       | `data/site.ts`       |
| Springs y constantes de animación                | `lib/motion.ts`      |
| Colores, tema y curvas de easing                 | `app/globals.css`    |

## Despliegue

Pensado para [Vercel](https://vercel.com):

1. Importa el repositorio.
2. Define `NEXT_PUBLIC_SITE_URL` con la URL final (por ejemplo `https://tu-dominio.com`).
3. Define `RESEND_API_KEY` (y opcionalmente `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`) para que el formulario envíe correos.
