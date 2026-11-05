import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer data-tone="light" className="bg-cream">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-ink/10 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="mono-label text-ink-muted">
          {profile.name} &copy; {new Date().getFullYear()}
        </p>
        <p className="mono-label text-ink-muted">{profile.location}</p>
      </div>
    </footer>
  );
}
