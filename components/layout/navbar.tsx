"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { IconLink } from "@/components/ui/icon-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/data/profile";
import { navItems } from "@/data/site";
import { getSocialLinks } from "@/lib/links";
import { springSnappy } from "@/lib/motion";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const socialLinks = getSocialLinks();
  const { scrollY } = useScroll();
  const glassOpacity = useTransform(scrollY, [0, 64], [0, 1]);

  return (
    <header className="sticky top-0 z-50">
      {/* Capa de cristal: transparente arriba, esmerilada al hacer scroll (solo opacity). */}
      <motion.div
        aria-hidden="true"
        className="glass absolute inset-0 border-b border-line"
        style={{ opacity: glassOpacity }}
      />
      <Container className="relative flex h-16 items-center justify-between gap-2">
        <Link
          href="/"
          className="rounded-full px-2 py-1 text-sm font-semibold tracking-tight active:opacity-70"
          aria-label={`${profile.name}, ir al inicio`}
        >
          <span aria-hidden="true" className="sm:hidden">
            {profile.initials}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            {profile.shortName}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Principal">
            <ul className="flex items-center">
              {navItems.map(({ href, label }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex h-10 items-center rounded-full px-3 text-sm transition-colors duration-150 active:opacity-70 ${
                        active ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-pill"
                          transition={springSnappy}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />

          {socialLinks.map((link) => (
            <IconLink key={link.id} link={link} />
          ))}
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
