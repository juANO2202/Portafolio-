import type { ComponentType, SVGProps } from "react";
import type { SocialLink, SocialLinkId } from "@/types/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const icons: Record<SocialLinkId, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: MailIcon,
};

export const iconButtonClass =
  "inline-flex size-10 items-center justify-center rounded-full text-muted " +
  "transition-[color,background-color,transform] duration-150 " +
  "hover:bg-pill hover:text-foreground " +
  "active:scale-95 active:duration-75"; // feedback inmediato al presionar

export function IconLink({ link }: { link: SocialLink }) {
  const Icon = icons[link.id];
  const isExternal = link.href.startsWith("http");

  return (
    <a
      href={link.href}
      aria-label={isExternal ? `${link.label} (se abre en una pestaña nueva)` : link.label}
      title={link.label}
      className={iconButtonClass}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Icon />
    </a>
  );
}
