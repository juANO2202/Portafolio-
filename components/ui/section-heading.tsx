interface SectionHeadingProps {
  id: string;
  title: string;
  description?: string;
}

/** Titular + descripción apilados. Sin etiqueta superior: el titular ya dice de qué va la sección. */
export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <h2 id={id} className="text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
        {title}
      </h2>
      {description && <p className="max-w-[65ch] text-lg text-muted text-pretty">{description}</p>}
    </div>
  );
}
