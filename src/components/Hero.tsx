"use client";

import { useEffect, useRef } from "react";
import { CodePanel } from "@/components/CodePanel";
import { site } from "@/data/portfolio";

const LENS_SIZE_MAX = 80;
const LENS_SIZE_MIN = 56;

function lensSizeForViewport(width: number) {
  if (width < 640) return LENS_SIZE_MIN;
  if (width < 1024) return 68;
  return LENS_SIZE_MAX;
}

const [firstName, ...restOfName] = site.fullName.split(" ");
const lastName = restOfName.join(" ");

function Headline({
  className = "",
  decorative = false,
  /** Chromatic copies: big name only. Crisp title pass: subtitle only. */
  lensPart = "all",
}: {
  className?: string;
  decorative?: boolean;
  lensPart?: "all" | "name" | "title";
}) {
  const Tag = decorative ? "div" : "h1";
  const hideName = lensPart === "title";
  const hideTitle = lensPart === "name";

  return (
    <Tag
      className={`text-foreground text-[clamp(2.35rem,11vw,5.5rem)] leading-[0.92] font-semibold tracking-[-0.045em] ${className}`}
    >
      <span
        className={`animate-reveal block ${hideName ? "invisible" : ""}`}
        aria-hidden={hideName || undefined}
      >
        {firstName}
      </span>
      <span className="animate-reveal animate-reveal-delay-1 flex flex-wrap items-baseline gap-x-[0.16em]">
        <span
          className={hideName ? "invisible" : undefined}
          aria-hidden={hideName || undefined}
        >
          {lastName}
        </span>
        <span
          className={`font-serif text-[0.3em] font-normal tracking-normal italic ${
            hideTitle ? "invisible" : "text-accent"
          }`}
          aria-hidden={hideTitle || undefined}
        >
          — {site.title.toLowerCase()}
        </span>
      </span>
    </Tag>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const lens = lensRef.current;
    if (!section || !wrap || !lens) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /** Lens top-left, in section coordinates. */
    const pos = { x: 0, y: 0 };
    const drag = { active: false, x: 0, y: 0, ox: 0, oy: 0 };
    /** Headline box inside the section, used to aim the lens and its blur mask. */
    const headline = { dx: 0, dy: 0, w: 0, h: 0 };
    let lensSize = lensSizeForViewport(window.innerWidth);

    const isStackedLayout = () => window.innerWidth < 1024;

    let raf = 0;
    let resumeTimer = 0;
    let touring = !reduced;
    let legIndex = 0;
    let leg: {
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      start: number;
      ms: number;
    } | null = null;
    let dwellUntil = 0;

    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      headline.dx = wrapRect.left - sectionRect.left;
      headline.dy = wrapRect.top - sectionRect.top;
      headline.w = wrapRect.width;
      headline.h = wrapRect.height;
    };

    const clamp = (x: number, y: number) => {
      const rect = section.getBoundingClientRect();
      return {
        x: Math.min(rect.width - lensSize, Math.max(0, x)),
        y: Math.min(rect.height - lensSize, Math.max(0, y)),
      };
    };

    /** A point over the headline, given as a fraction of its box. */
    const nameAt = (fx: number, fy: number) =>
      clamp(
        headline.dx + headline.w * fx - lensSize / 2,
        headline.dy + headline.h * fy - lensSize / 2,
      );

    /** Resting spot: beside the first name on desktop, end of the line on stacked layouts. */
    const homeAt = () =>
      isStackedLayout() ? nameAt(0.84, 0.22) : nameAt(0.72, 0.24);

    /** Idle tour: rush onto the name, roam it slowly, then rush back home. */
    const TOUR = [
      { at: () => nameAt(0.06, 0.26), speed: 750, dwell: 250 },
      { at: () => nameAt(0.52, 0.26), speed: 70, dwell: 400 },
      { at: () => nameAt(0.06, 0.74), speed: 500, dwell: 250 },
      { at: () => nameAt(0.88, 0.76), speed: 70, dwell: 700 },
      { at: homeAt, speed: 900, dwell: 2200 },
    ];

    const startLeg = (now: number) => {
      const target = TOUR[legIndex].at();
      const distance = Math.hypot(target.x - pos.x, target.y - pos.y);
      leg = {
        fromX: pos.x,
        fromY: pos.y,
        toX: target.x,
        toY: target.y,
        start: now,
        ms: Math.max(220, (distance / TOUR[legIndex].speed) * 1000),
      };
    };

    const apply = () => {
      lens.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      wrap.style.setProperty(
        "--lx",
        `${pos.x + lensSize / 2 - headline.dx}px`,
      );
      wrap.style.setProperty(
        "--ly",
        `${pos.y + lensSize / 2 - headline.dy}px`,
      );
    };

    const syncLensSize = () => {
      lensSize = lensSizeForViewport(window.innerWidth);
      lens.style.width = `${lensSize}px`;
      lens.style.height = `${lensSize}px`;
      wrap.style.setProperty("--lr", `${lensSize / 2}px`);
    };

    const layout = () => {
      syncLensSize();
      measure();
      const home = homeAt();
      pos.x = home.x;
      pos.y = home.y;
      apply();
    };

    const tick = (now: number) => {
      if (drag.active) {
        pos.x = drag.x;
        pos.y = drag.y;
      } else if (touring) {
        if (!leg) {
          if (now >= dwellUntil) startLeg(now);
        } else {
          const t = Math.min(1, (now - leg.start) / leg.ms);
          const eased = -(Math.cos(Math.PI * t) - 1) / 2;
          pos.x = leg.fromX + (leg.toX - leg.fromX) * eased;
          pos.y = leg.fromY + (leg.toY - leg.fromY) * eased;
          if (t >= 1) {
            dwellUntil = now + TOUR[legIndex].dwell;
            legIndex = (legIndex + 1) % TOUR.length;
            leg = null;
          }
        }
      }

      apply();
      raf = requestAnimationFrame(tick);
    };

    const aimAtPointer = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      const next = clamp(
        clientX - rect.left - drag.ox,
        clientY - rect.top - drag.oy,
      );
      drag.x = next.x;
      drag.y = next.y;
    };

    /** Pick the lens up, then drag it. Clicks elsewhere leave it alone. */
    const onPointerDown = (e: PointerEvent) => {
      if (reduced || e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = section.getBoundingClientRect();
      drag.ox = e.clientX - rect.left - pos.x;
      drag.oy = e.clientY - rect.top - pos.y;
      window.clearTimeout(resumeTimer);
      touring = false;
      leg = null;
      drag.active = true;
      drag.x = pos.x;
      drag.y = pos.y;
      lens.setPointerCapture(e.pointerId);
      lens.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.active) return;
      aimAtPointer(e.clientX, e.clientY);
    };

    /** Linger where you dropped it, then head home and resume the tour. */
    const onPointerUp = () => {
      if (!drag.active) return;
      drag.active = false;
      lens.style.cursor = "grab";
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        legIndex = TOUR.length - 1;
        leg = null;
        dwellUntil = 0;
        touring = true;
      }, 5000);
    };

    const onResize = () => {
      syncLensSize();
      measure();
      const clamped = clamp(pos.x, pos.y);
      pos.x = clamped.x;
      pos.y = clamped.y;
      leg = null;
    };

    layout();
    dwellUntil = performance.now() + 1600;
    window.addEventListener("resize", onResize);
    lens.addEventListener("pointerdown", onPointerDown);
    lens.addEventListener("pointermove", onPointerMove);
    lens.addEventListener("pointerup", onPointerUp);
    lens.addEventListener("pointercancel", onPointerUp);
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      window.removeEventListener("resize", onResize);
      lens.removeEventListener("pointerdown", onPointerDown);
      lens.removeEventListener("pointermove", onPointerMove);
      lens.removeEventListener("pointerup", onPointerUp);
      lens.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-dvh flex-col justify-center px-5 pt-28 pb-16 sm:px-10 sm:pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div ref={wrapRef} className="lens-stage relative min-w-0 w-full">
          <Headline className="lens-sharp" />

          <div
            className="lens-blur pointer-events-none absolute top-0 left-0 w-full"
            aria-hidden
          >
            <div className="lens-chroma lens-chroma-r">
              <Headline decorative lensPart="name" />
            </div>
            <div className="lens-chroma lens-chroma-g">
              <Headline decorative lensPart="name" />
            </div>
            <div className="lens-chroma lens-chroma-b">
              <Headline decorative lensPart="name" />
            </div>
            <div className="lens-title-crisp">
              <Headline decorative lensPart="title" />
            </div>
          </div>
        </div>

        <div className="animate-reveal animate-reveal-delay-2 min-w-0 w-full">
          <CodePanel />
        </div>
      </div>

      <div className="animate-reveal animate-reveal-delay-2 mx-auto mt-10 flex w-full max-w-6xl flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
        <a
          href="#projects"
          className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-center text-[11px] font-medium tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-90"
        >
          View portfolio
        </a>
        <a
          href={site.cv}
          download="Tayyaba-Ahmed-CV.pdf"
          className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center text-[11px] font-medium tracking-[0.2em] text-foreground uppercase ring-1 ring-white/15 transition-colors hover:bg-white/5 hover:ring-white/30"
        >
          Download CV
        </a>
      </div>

      <div
        ref={lensRef}
        className="glass-lens absolute top-0 left-0 z-20 cursor-grab touch-none"
        style={{ width: LENS_SIZE_MIN, height: LENS_SIZE_MIN }}
        role="button"
        tabIndex={0}
        aria-label="Drag magnifying lens"
      />
    </section>
  );
}
