"use client";

import { useTheme } from "next-themes";
import { iconButtonClass } from "./icon-link";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className={iconButtonClass}
      aria-label="Cambiar entre tema claro y oscuro"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Ambos íconos van en el HTML; el CSS elige cuál mostrar, así no hay mismatch de hidratación. */}
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </button>
  );
}
