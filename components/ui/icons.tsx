import {
  ArrowRight,
  AppWindow,
  ArrowUpRight,
  Certificate,
  Check,
  ClockCountdown,
  Code,
  Copy,
  Handshake,
  EnvelopeSimple,
  Folder,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  Moon,
  PaperPlaneTilt,
  PencilRuler,
  Sun,
  Tag,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps as PhosphorProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";

type IconProps = Omit<PhosphorProps, "ref">;

/**
 * Una sola familia (Phosphor, trazo "regular") para todo el sitio.
 * Entrada SSR: funciona en Server y Client Components. Tamaño por defecto 20px.
 * `width`/`height` siguen funcionando para ajustar casos puntuales.
 */
function icon(Glyph: ComponentType<PhosphorProps>) {
  return function Icon(props: IconProps) {
    return <Glyph size={20} aria-hidden="true" focusable="false" {...props} />;
  };
}

export const GitHubIcon = icon(GithubLogo);
export const LinkedInIcon = icon(LinkedinLogo);
export const MailIcon = icon(EnvelopeSimple);
export const SunIcon = icon(Sun);
export const MoonIcon = icon(Moon);
export const CopyIcon = icon(Copy);
export const CheckIcon = icon(Check);
export const ArrowRightIcon = icon(ArrowRight);
export const ExternalLinkIcon = icon(ArrowUpRight);
export const FolderIcon = icon(Folder);
export const MapPinIcon = icon(MapPin);
export const CodeIcon = icon(Code);
export const AppWindowIcon = icon(AppWindow);
export const WrenchIcon = icon(Wrench);
export const DesignIcon = icon(PencilRuler);
export const SendIcon = icon(PaperPlaneTilt);
export const ClockIcon = icon(ClockCountdown);
export const HandshakeIcon = icon(Handshake);
export const TagIcon = icon(Tag);
export const CertificateIcon = icon(Certificate);
