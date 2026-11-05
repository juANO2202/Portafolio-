import type { ComponentType, SVGProps } from "react";
import type { SocialLink, SocialLinkId } from "@/types/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const icons: Record<SocialLinkId, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: MailIcon,
};

/** Hereda el color del texto (currentColor), así sirve sobre crema y sobre verde bosque. */
export const iconButtonClass =
  "inline-flex size-10 items-center justify-center rounded-full opacity-70 " +
  "transition-[opacity,background-color,transform] duration-150 " +
  "hover:bg-current/10 hover:opacity-100 active:scale-95 active:duration-75";

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
