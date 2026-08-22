"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/portfolio";
import { getProjectImage } from "@/data/project-images";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

const AUTO_MS = 3000;
const INTERACT_PAUSE_MS = 10000;

export function Projects() {
  const projects = site.projects;
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const total = projects.length;
  const sectionRef = useRef<HTMLElement>(null);
  const pauseTimerRef = useRef(0);
  const inViewRef = useRef(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const pauseForInteraction = useCallback(() => {
    window.clearTimeout(pauseTimerRef.current);
    setPaused(true);

    pauseTimerRef.current = window.setTimeout(() => {
      setPaused(false);
    }, INTERACT_PAUSE_MS);
  }, []);

  const select = useCallback(
    (index: number) => {
      pauseForInteraction();
      setActive(index);
    },
    [pauseForInteraction],
  );

  const step = useCallback(
    (dir: -1 | 1) => {
      pauseForInteraction();
      setActive((i) => (i + dir + total) % total);
    },
    [total, pauseForInteraction],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setPaused(false);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(section);

    const onScroll = () => {
      if (pausedRef.current && inViewRef.current) {
        setPaused(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(pauseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    setProgressKey((k) => k + 1);
  }, [active, inView, paused]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      if (!inViewRef.current || pausedRef.current) return;
      setActive((i) => (i + 1) % total);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, inView]);

  const project = projects[active];
  const image = getProjectImage(project.image);
  const progressRunning = inView && !paused;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-24 px-5 pb-16 sm:px-10 sm:pb-24"
      aria-roledescription="carousel"
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading index="02" label="Work" title="Selected work" />
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.22em] text-white/40">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous project"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next project"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mt-8 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:gap-12">
            <div className="relative aspect-[1024/465] w-full overflow-hidden rounded-xl bg-[#0e1117]">
              {image ? (
                <Image
                  key={project.title}
                  src={image}
                  alt=""
                  fill
                  priority
                  className="animate-[carousel-fade_0.45s_ease] object-contain object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                />
              ) : (
                <div
                  key={project.title}
                  className="absolute inset-0 flex animate-[carousel-fade_0.45s_ease] flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_50%_20%,rgba(122,162,247,0.16),transparent_55%),#0e1117]"
                >
                  <span className="font-mono text-[11px] tracking-[0.28em] text-accent/70 uppercase">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="px-4 text-center text-xl font-semibold tracking-tight text-white/25">
                    {project.title}
                  </span>
                </div>
              )}
            </div>

            <div
              key={`${project.title}-copy`}
              className="flex animate-[carousel-fade_0.45s_ease] flex-col justify-center gap-5 pt-8 md:pt-0"
            >
              <h3 className="text-[1.65rem] leading-tight font-semibold tracking-tight text-foreground sm:text-[1.85rem]">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent focus-visible:text-accent"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
                {project.tags.join(" · ")}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium tracking-[0.18em] uppercase">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent transition-opacity hover:opacity-70"
                  >
                    View live
                    <span aria-hidden>↗</span>
                  </a>
                )}
                {!project.href && (
                  <span className="text-white/40">Private build</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 h-px overflow-hidden rounded-full bg-white/10">
            <div
              key={progressKey}
              className="carousel-progress h-full bg-accent"
              style={
                {
                  "--progress-ms": `${AUTO_MS}ms`,
                  animationPlayState: progressRunning ? "running" : "paused",
                } as CSSProperties
              }
            />
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {projects.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Show ${item.title}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => select(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === active
                    ? "w-7 bg-accent"
                    : "w-1.5 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-medium tracking-[0.22em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent"
            >
              View all
              <span aria-hidden>→</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
