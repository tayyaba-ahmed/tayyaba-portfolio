import { site } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-8">
        <p className="text-[11px] tracking-[0.18em] text-muted uppercase sm:tracking-[0.22em]">
          © {year} {site.fullName}
        </p>
      </div>
    </footer>
  );
}
