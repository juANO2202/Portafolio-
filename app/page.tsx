import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Contact />
    </>
  );
}
