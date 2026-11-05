import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // El sitio pasó a ser una sola página: las URLs antiguas llevan a su sección.
  async redirects() {
    return [
      { source: "/proyectos", destination: "/#proyectos", permanent: false },
      { source: "/servicios", destination: "/#servicios", permanent: false },
      { source: "/certificados", destination: "/#certificados", permanent: false },
      { source: "/contacto", destination: "/#contacto", permanent: false },
    ];
  },
};

export default nextConfig;
