import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/layout/providers";
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
  themeColor: "#f4f0e6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Antes del primer pintado: evita el parpadeo del telón si la intro ya se vio en esta sesión. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('intro-seen')==='1')document.documentElement.dataset.intro='seen'}catch(e){}",
          }}
        />
      </head>
      <body>
        <Providers>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
          >
            Saltar al contenido
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
