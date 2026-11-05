import Image from "next/image";
import { CertificateIcon, ExternalLinkIcon } from "@/components/ui/icons";
import type { Certificate } from "@/types/certificate";

const linkClass =
  "mono-label inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/20 px-3.5 text-ink " +
  "transition-[background-color,transform] duration-200 hover:bg-ink/5 active:scale-[0.97] active:duration-75";

/** Tarjeta crema ligeramente inclinada sobre el verde bosque. `tilt` en grados. */
export function CertificateCard({
  certificate,
  tilt = 0,
}: {
  certificate: Certificate;
  tilt?: number;
}) {
  const { title, issuer, date, image, file, credentialUrl } = certificate;

  return (
    <article
      style={{ rotate: `${tilt}deg` }}
      className="flex h-full flex-col gap-5 rounded-3xl bg-cream p-5 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-snap hover:rotate-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-2">
        {image ? (
          <Image
            src={image}
            alt={`Certificado: ${title}`}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 90vw"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-leaf">
            <CertificateIcon size={44} />
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-balance">{title}</h3>
        <p className="mono-label text-ink-muted">
          {issuer} / {date}
        </p>
      </div>

      {(file || credentialUrl) && (
        <div className="mt-auto flex flex-wrap gap-2">
          {file && (
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={`Ver certificado de ${title} (se abre en una pestaña nueva)`}
            >
              Ver certificado
              <ExternalLinkIcon size={14} />
            </a>
          )}
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={`Verificar ${title} en línea (se abre en una pestaña nueva)`}
            >
              Verificar
              <ExternalLinkIcon size={14} />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
