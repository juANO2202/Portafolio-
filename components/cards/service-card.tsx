import type { ReactElement } from "react";
import { AppWindowIcon, CheckIcon, CodeIcon, DesignIcon, WrenchIcon } from "@/components/ui/icons";
import type { Service, ServiceIconName } from "@/types/content";

const iconByService: Record<ServiceIconName, ReactElement> = {
  web: <CodeIcon size={24} />,
  app: <AppWindowIcon size={24} />,
  maintenance: <WrenchIcon size={24} />,
  design: <DesignIcon size={24} />,
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="surface flex h-full flex-col gap-5 p-6 transition-colors duration-200 hover:border-accent/40 sm:p-8">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent">
        {iconByService[service.id]}
      </span>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
        <p className="text-muted text-pretty">{service.description}</p>
      </div>
      <ul className="mt-auto space-y-2 text-sm">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckIcon size={16} className="shrink-0 text-accent" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
