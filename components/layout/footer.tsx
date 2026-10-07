import Link from "next/link";
import { Container } from "@/components/ui/container";
import { IconLink } from "@/components/ui/icon-link";
import { profile } from "@/data/profile";
import { navItems } from "@/data/site";
import { getEmailLink, getSocialLinks } from "@/lib/links";

export function Footer() {
  const links = [...getSocialLinks(), getEmailLink()];

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} · {profile.role}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Pie de página">
            <ul className="flex gap-4 text-sm text-muted">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors duration-150 hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="-ml-2 flex items-center gap-1 sm:ml-0 sm:-mr-2">
            {links.map((link) => (
              <li key={link.id}>
                <IconLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
