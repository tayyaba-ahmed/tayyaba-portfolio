"use client";

import { usePathname } from "next/navigation";
import { site } from "@/data/portfolio";

export function Footer() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const year = new Date().getFullYear();
  const toHref = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <footer className="px-5 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] tracking-[0.18em] text-muted uppercase sm:tracking-[0.22em]">
          © {year} {site.fullName}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] tracking-[0.18em] text-muted uppercase sm:tracking-[0.22em]">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={toHref(item.href)}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
