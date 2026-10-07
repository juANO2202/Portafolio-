import type { ReactNode } from "react";
import { FolderIcon } from "./icons";

interface EmptyStateProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="surface flex flex-col items-center px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border border-line bg-pill text-muted">
        <FolderIcon />
      </span>
      <h2 className="mt-6 text-lg font-medium tracking-tight">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
