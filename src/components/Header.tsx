"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/portfolio";

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toHref = (hash: string) => (onHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActiveSection("");
      return;
    }

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
  }, [onHome]);

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
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-background/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-3 px-5 py-5 sm:gap-6 sm:px-10">
          <Link
            href={onHome ? "/#top" : "/"}
            className="flex shrink-0 items-center transition-opacity hover:opacity-70"
            onClick={closeMenu}
            aria-label={site.fullName}
          >
            <Image
              src="/logo-ta.png"
              alt=""
              width={44}
              height={42}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {site.nav.map((item) => {
              const isActive =
                onHome && activeSection === item.href
                  ? true
                  : !onHome &&
                    item.href === "#projects" &&
                    pathname === "/portfolio";
              return (
                <a
                  key={item.href}
                  href={toHref(item.href)}
                  className={`text-[11px] font-medium tracking-[0.28em] uppercase transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <a
            href={toHref("#contact")}
            className="hidden items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-[11px] font-medium tracking-[0.28em] text-foreground uppercase transition-colors hover:border-accent/70 hover:bg-accent/20 lg:inline-flex"
          >
            Contact me
            <span aria-hidden>↗</span>
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center text-muted lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-[7px] left-0 block h-px w-5 bg-current transition-all duration-300 ${
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
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background/85 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex h-dvh flex-col justify-center px-8 transition-all duration-500 lg:hidden ${
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
          className="absolute top-5 right-6 text-[11px] tracking-[0.28em] text-muted uppercase"
        >
          Close
        </button>
        <ul className="space-y-6">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={toHref(item.href)}
                onClick={closeMenu}
                className="font-serif text-5xl text-foreground italic"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
