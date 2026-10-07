interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-medium text-muted">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
        {title}
      </h2>
      {description && <p className="text-muted">{description}</p>}
    </div>
  );
}
