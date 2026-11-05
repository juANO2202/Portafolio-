import { Intro } from "@/components/intro/intro";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Story } from "@/components/sections/story";
import { aboutHighlights, aboutParagraphs } from "@/data/about";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Intro />
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <Story title="Cómo trabajo." paragraphs={aboutParagraphs} highlights={aboutHighlights} />
        <Projects />
        <Services />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
