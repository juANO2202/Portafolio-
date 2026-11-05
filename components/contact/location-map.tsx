import { ExternalLinkIcon, MapPinIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";

/** Mapa de Google sin API key: solo ciudad y país, nunca una dirección exacta. */
export function LocationMap() {
  const query = encodeURIComponent(profile.location);

  return (
    <div className="overflow-hidden rounded-3xl bg-cream-2">
      <iframe
        title={`Mapa de ${profile.location}`}
        src={`https://www.google.com/maps?q=${query}&z=12&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full border-0 sm:h-96"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 px-7 py-5 text-sm">
        <span className="flex items-center gap-2">
          <MapPinIcon size={18} className="text-leaf" />
          {profile.location}
        </span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-medium text-leaf underline-offset-4 hover:underline"
        >
          Abrir en Maps
          <ExternalLinkIcon size={16} />
        </a>
      </div>
    </div>
  );
}
