import Image from "next/image";
import { CertificateIcon, ExternalLinkIcon } from "@/components/ui/icons";
import type { Certificate } from "@/types/certificate";

const linkClass =
  "group/link inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted " +
  "transition-[color,background-color,transform] duration-150 " +
  "hover:bg-pill hover:text-foreground active:scale-[0.97] active:duration-75";

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const { title, issuer, date, image, file, credentialUrl } = certificate;

  return (
    <article className="surface flex h-full flex-col overflow-hidden transition-colors duration-200 hover:border-accent/40">
      <div className="relative aspect-[4/3] border-b border-line bg-pill">
        {image ? (
          <Image
            src={image}
            alt={`Certificado: ${title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-accent">
            <CertificateIcon size={48} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium tracking-tight">{title}</h3>
          <p className="text-sm text-muted">
            {issuer} · {date}
          </p>
        </div>

        {(file || credentialUrl) && (
          <div className="mt-auto -ml-3 flex flex-wrap gap-1 pt-2">
            {file && (
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label={`Ver certificado de ${title} (se abre en una pestaña nueva)`}
              >
                <ExternalLinkIcon width={16} height={16} />
                Ver certificado
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
                <ExternalLinkIcon width={16} height={16} />
                Verificar
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
