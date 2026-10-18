import { ExternalLinkIcon, MapPinIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";

/** Mapa de Google sin API key: solo ciudad y país, nunca una dirección exacta. */
export function LocationMap() {
  const query = encodeURIComponent(profile.location);

  return (
    <div className="surface overflow-hidden">
      <iframe
        title={`Mapa de ${profile.location}`}
        src={`https://www.google.com/maps?q=${query}&z=12&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full border-0 sm:h-80"
      />
      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 text-sm">
        <span className="flex items-center gap-2">
          <MapPinIcon size={18} className="text-accent" />
          {profile.location}
        </span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-accent underline-offset-4 hover:underline"
        >
          Abrir en Maps
          <ExternalLinkIcon size={16} />
        </a>
      </div>
    </div>
  );
}
