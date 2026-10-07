import type { ComponentPropsWithoutRef } from "react";

export function Container({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`} {...props} />;
}
