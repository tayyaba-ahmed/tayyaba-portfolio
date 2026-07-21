"use client";

import { site } from "@/data/portfolio";
import { SplitText } from "@/components/SplitText";

export function Hero() {
  return (
    <section
      id="top"
      className="letterbox relative flex items-start overflow-hidden px-6 pb-16 pt-24 sm:min-h-dvh sm:items-center sm:pb-14 sm:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 via-background/25 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="animate-reveal font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-accent">
          {site.title}
        </p>

        <h1 className="mt-6 font-display text-[clamp(3.5rem,14vw,9.5rem)] font-semibold leading-[0.9] tracking-tight text-foreground">
          <SplitText text={site.fullName} delayMs={120} staggerMs={32} />
        </h1>

        <div className="animate-line-grow mt-8 h-px w-full max-w-md bg-gradient-to-r from-accent via-accent/40 to-transparent" />

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="animate-reveal animate-reveal-delay-2 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
            {site.tagline}
          </p>

          <div className="animate-reveal animate-reveal-delay-3 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center bg-accent px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90"
            >
              View work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-border px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Hire me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
