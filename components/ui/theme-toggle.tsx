"use client";

import { useAnimate } from "motion/react";
import { useTheme } from "next-themes";
import { springSnappy } from "@/lib/motion";
import { iconButtonClass } from "./icon-link";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [scope, animate] = useAnimate<HTMLSpanElement>();

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    // El ícono cambia al instante por CSS (sin mismatch de hidratación); este giro corto lo hace sentir físico.
    animate(scope.current, { rotate: [-70, 0], scale: [0.7, 1], opacity: [0.3, 1] }, springSnappy);
  }

  return (
    <button
      type="button"
      className={iconButtonClass}
      aria-label="Cambiar entre tema claro y oscuro"
      onClick={toggle}
    >
      <span ref={scope} className="inline-flex">
        <SunIcon className="hidden dark:block" />
        <MoonIcon className="dark:hidden" />
      </span>
    </button>
  );
}
