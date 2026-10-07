import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { defaultTitle } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${profile.name}`,
  },
  description: profile.bio,
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: profile.name,
    title: defaultTitle,
    description: profile.bio,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: profile.bio,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
