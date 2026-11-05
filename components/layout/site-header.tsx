"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { IconLink, iconButtonClass } from "@/components/ui/icon-link";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { navItems, type SectionId } from "@/data/site";
import { getSocialLinks } from "@/lib/links";
import { springSnappy } from "@/lib/motion";

type Tone = "light" | "dark";
type NavId = (typeof navItems)[number]["id"];

// Orden de arriba hacia abajo. "historia" no tiene enlace propio: cuenta como Inicio.
const sectionOrder: SectionId[] = [
  "inicio",
  "historia",
  "proyectos",
  "servicios",
  "certificados",
  "contacto",
];

function navIdFor(section: SectionId): NavId {
  return section === "historia" ? "inicio" : section;
}

/**
 * Header flotante con cristal. Cambia de tono según la sección que tiene debajo (crema o bosque) y
 * resalta el enlace de la sección actual. Usa IntersectionObserver para saber CUÁNDO recalcular
 * (sin listeners de scroll) y mide solo en ese momento.
 */
export function SiteHeader() {
  const [active, setActive] = useState<NavId>("inicio");
  const [tone, setTone] = useState<Tone>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const socialLinks = getSocialLinks();

  useEffect(() => {
    const PROBE = 88; // px desde arriba: la línea que decide "dónde estás"

    function recompute() {
      let current: SectionId = "inicio";
      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= PROBE && r.bottom > PROBE) current = id;
      }
      const host = document.getElementById(current)?.closest<HTMLElement>("[data-tone]");
      setTone(host?.dataset.tone === "dark" ? "dark" : "light");
      setActive(navIdFor(current));
    }

    const io = new IntersectionObserver(recompute, {
      rootMargin: `-${PROBE - 8}px 0px -88% 0px`,
      threshold: [0, 1],
    });
    sectionOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    recompute();
    window.addEventListener("resize", recompute);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const dark = tone === "dark" || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        <div className="mx-auto grid h-[72px] w-full max-w-6xl grid-cols-[1fr_auto] items-center px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#inicio"
            onClick={() => setMenuOpen(false)}
            className="flex w-fit items-center gap-3 rounded-full py-1 pr-2 active:opacity-70"
            aria-label={`${profile.name}, ir al inicio`}
          >
            <span
              aria-hidden="true"
              className={`flex size-10 items-center justify-center rounded-full text-sm font-bold tracking-[-0.04em] transition-colors duration-300 ${
                dark ? "bg-cream text-forest" : "bg-ink text-cream"
              }`}
            >
              {profile.initials}.
            </span>
            <span
              aria-hidden="true"
              className="mono-label hidden leading-[1.6] whitespace-nowrap opacity-80 sm:block"
            >
              {profile.shortName}
              <br />
              <span className="opacity-70">{profile.role}</span>
            </span>
          </a>

          <nav
            aria-label="Principal"
            className={`hidden rounded-full border p-1 transition-colors duration-300 lg:block ${
              dark ? "glass-dark border-cream/10" : "glass-light border-ink/10"
            }`}
          >
            <ul className="flex items-center">
              {navItems.map(({ id, label }) => {
                const current = id === active;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={current ? "location" : undefined}
                      className={`relative inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200 active:opacity-70 ${
                        current ? (dark ? "text-mint" : "text-leaf") : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      {current && (
                        <motion.span
                          layoutId="nav-pill"
                          className={`absolute inset-0 rounded-full ${
                            dark ? "bg-mint/15" : "bg-leaf/12"
                          }`}
                          transition={springSnappy}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end">
            {socialLinks.map((link) => (
              <IconLink key={link.id} link={link} />
            ))}
            <button
              type="button"
              className={`${iconButtonClass} lg:hidden`}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  className="inline-flex"
                  initial={{ opacity: 0, rotate: menuOpen ? -60 : 60, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: menuOpen ? 60 : -60, scale: 0.8 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-[90] flex flex-col bg-forest px-5 pt-28 pb-10 text-cream sm:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.ul
              className="space-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
              }}
            >
              {navItems.map(({ id, label }) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springSnappy },
                  }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={id === active ? "location" : undefined}
                    className={`display block rounded-2xl py-2 text-5xl transition-colors duration-150 active:opacity-70 ${
                      id === active ? "text-mint" : "text-cream"
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href={`mailto:${profile.email}`}
              className="mono-label mt-auto break-all text-mist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
