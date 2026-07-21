import { site } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          © {year} {site.fullName}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          End credits
        </p>
      </div>
    </footer>
  );
}
