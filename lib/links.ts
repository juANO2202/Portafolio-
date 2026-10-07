import { profile } from "@/data/profile";
import type { SocialLink } from "@/types/profile";

/** Perfiles externos. Los opcionales (LinkedIn) solo aparecen si están definidos en el perfil. */
export function getSocialLinks(): SocialLink[] {
  const { github, linkedin } = profile.links;
  const links: SocialLink[] = [{ id: "github", label: "GitHub", href: github }];
  if (linkedin) links.push({ id: "linkedin", label: "LinkedIn", href: linkedin });
  return links;
}

export function getEmailLink(): SocialLink {
  return { id: "email", label: "Correo", href: `mailto:${profile.email}` };
}
