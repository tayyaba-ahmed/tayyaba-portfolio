"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/portfolio";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = site.nav.map((item) => item.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <a
            href="#top"
            className="shrink-0 font-display text-lg font-medium tracking-tight text-foreground transition-colors hover:text-accent sm:text-xl"
            onClick={closeMenu}
          >
            {site.fullName}
          </a>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-8 md:flex">
              {site.nav.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                      isActive
                        ? "text-accent"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />
                    )}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-foreground md:hidden"
            >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-px w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-[7px] -rotate-45" : "top-3.5"
                }`}
              />
            </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background/90 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex h-dvh flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="absolute right-6 top-5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted"
        >
          Close
        </button>
        <ul className="space-y-6">
          {site.nav.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="group flex items-baseline gap-4"
              >
                <span className="font-mono text-xs text-accent/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-5xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
