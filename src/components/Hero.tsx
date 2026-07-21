"use client";

import { site } from "@/data/portfolio";
import { SplitText } from "@/components/SplitText";

export function Hero() {
  return (
    <section
      id="top"
      className="letterbox relative flex min-h-dvh items-end overflow-hidden px-6 pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div
        className="animate-light-drift pointer-events-none absolute -top-1/4 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,#c4894a22_0%,transparent_65%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent"
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
