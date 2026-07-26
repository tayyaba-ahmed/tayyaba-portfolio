"use client";

import { useEffect, useRef } from "react";

type Dust = {
  x: number;
  y: number;
  z: number;
  r: number;
  drift: number;
  phase: number;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Lightweight film atmosphere — tuned for smooth scrolling. */
export function PageAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const aperture = apertureRef.current;
    const logo = logoRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let running = !document.hidden;

    const pointer = { x: 0.55, y: 0.35, tx: 0.55, ty: 0.35 };
    const ring = { angle: -40, tAngle: -40 };
    const beads = [
      { angle: 0, speed: 42, offset: 0, key: "a" },
      { angle: 40, speed: -58, offset: -12, key: "b" },
      { angle: 120, speed: 72, offset: 14, key: "c" },
      { angle: 200, speed: -48, offset: 8, key: "d" },
      { angle: 280, speed: 64, offset: -18, key: "e" },
      { angle: 90, speed: -78, offset: -6, key: "f" },
      { angle: 310, speed: 54, offset: 20, key: "g" },
      { angle: 160, speed: -36, offset: 28, key: "h" },
    ];
    let beadMode: "home" | "orbit" = "orbit";
    let lastCursorAngle = ring.tAngle;
    let lastT = 0;
    let frame = 0;
    const dust: Dust[] = [];
    let logoProgress = 0;
    let logoTarget = 0;

    const angleDelta = (a: number, b: number) =>
      Math.abs(((a - b + 540) % 360) - 180);

    const seedDust = () => {
      dust.length = 0;
      const count = Math.min(80, Math.floor((w * h) / 16000));
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random(),
          y: Math.random(),
          z: 0.35 + Math.random() * 0.65,
          r: 0.45 + Math.random() * 1.6,
          drift: 0.015 + Math.random() * 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const updateRingTarget = (clientX: number, clientY: number) => {
      if (!aperture || reduced) return;
      const rect = aperture.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const next =
        (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;
      if (angleDelta(next, lastCursorAngle) > 3) {
        beadMode = "home";
        lastCursorAngle = next;
      }
      ring.tAngle = next;
    };

    /** Form from About through Services; fade as Contact arrives. */
    const updateLogoTarget = () => {
      const about = document.getElementById("about");
      const contact = document.getElementById("contact");
      if (!about || !contact) {
        logoTarget = 0;
        return;
      }

      const y = window.scrollY;
      const vh = window.innerHeight;
      const aboutTop = about.getBoundingClientRect().top + y;
      const contactTop = contact.getBoundingClientRect().top + y;

      // Start forming as About approaches center; stay solid until Contact nears
      const start = aboutTop - vh * 0.55;
      const end = contactTop - vh * 0.2;
      const fadeIn = vh * 0.35;
      const fadeOut = vh * 0.4;

      if (end <= start + fadeIn + fadeOut) {
        const doc = document.documentElement;
        const maxScroll = Math.max(1, doc.scrollHeight - vh);
        const t = y / maxScroll;
        if (t <= 0.1) logoTarget = t / 0.1;
        else if (t >= 0.9) logoTarget = (1 - t) / 0.1;
        else logoTarget = 1;
        return;
      }

      if (y <= start) logoTarget = 0;
      else if (y < start + fadeIn) logoTarget = (y - start) / fadeIn;
      else if (y < end - fadeOut) logoTarget = 1;
      else if (y < end) logoTarget = (end - y) / fadeOut;
      else logoTarget = 0;
    };

    const applyLogo = (p: number) => {
      if (!logo) return;
      // Once mostly there, lock to fully formed until fade-out begins
      const locked = p >= 0.5 ? 1 : p / 0.5;
      const ease = locked * locked * (3 - 2 * locked);
      const opacity = ease * 0.18;
      const scale = 0.8 + ease * 0.2;
      const blur = (1 - ease) * 12;
      const rotate = (1 - ease) * -5;
      logo.style.opacity = String(opacity);
      logo.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)}) rotate(${rotate.toFixed(2)}deg)`;
      logo.style.filter = blur < 0.35 ? "none" : `blur(${blur.toFixed(2)}px)`;
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      updateLogoTarget();
      // Slightly lighter on small screens, but still animate
      const mobile = window.matchMedia("(max-width: 640px)").matches;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25) * (mobile ? 0.5 : 0.65);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      seedDust();
    };

    const onPointer = (e: PointerEvent) => {
      if (reduced || !running) return;
      pointer.tx = e.clientX / w;
      pointer.ty = e.clientY / h;
      updateRingTarget(e.clientX, e.clientY);
    };

    const onScroll = () => {
      updateLogoTarget();
      if (reduced) applyLogo(logoTarget);
    };

    const lerpAngle = (from: number, to: number, t: number) => {
      const diff = ((to - from + 540) % 360) - 180;
      return from + diff * t;
    };

    const drawStatic = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      const gx = cw * 0.55;
      const gy = ch * 0.32;
      const spot = ctx.createRadialGradient(
        gx,
        gy,
        0,
        gx,
        gy,
        Math.max(cw, ch) * 0.4,
      );
      spot.addColorStop(0, "rgba(201, 153, 106, 0.18)");
      spot.addColorStop(0.45, "rgba(196, 137, 74, 0.06)");
      spot.addColorStop(1, "rgba(196, 137, 74, 0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, cw, ch);
    };

    const draw = (t: number) => {
      if (!running) return;

      const dt = lastT ? Math.min((t - lastT) / 1000, 0.05) : 0.016;
      lastT = t;
      frame += 1;

      if (frame % 2 === 1) {
        raf = requestAnimationFrame(draw);
        return;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      ring.angle = lerpAngle(ring.angle, ring.tAngle, 0.1);

      // Snap faster toward fully formed so quick scrolls don't miss it
      const catchUp = logoTarget >= 0.99 ? 0.22 : 0.16;
      logoProgress += (logoTarget - logoProgress) * catchUp;
      if (Math.abs(logoTarget - logoProgress) < 0.004) logoProgress = logoTarget;
      applyLogo(logoProgress);

      if (aperture) {
        aperture.style.setProperty(
          "--ring-angle",
          `${ring.angle.toFixed(1)}deg`,
        );

        let settled = true;
        for (const bead of beads) {
          if (beadMode === "home") {
            const target = ring.tAngle + bead.offset;
            bead.angle = lerpAngle(bead.angle, target, 0.16);
            if (angleDelta(bead.angle, target) > 4) settled = false;
          } else {
            bead.angle =
              (((bead.angle + bead.speed * dt * 2) % 360) + 360) % 360;
          }
          aperture.style.setProperty(
            `--bead-${bead.key}`,
            `${bead.angle.toFixed(1)}deg`,
          );
        }
        if (beadMode === "home" && settled) beadMode = "orbit";
      }

      {
        const cw = canvas.width;
        const ch = canvas.height;
        ctx.clearRect(0, 0, cw, ch);

        const gx = pointer.x * cw;
        const gy = pointer.y * ch;
        const radius = Math.max(cw, ch) * 0.38;
        const spot = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
        spot.addColorStop(0, "rgba(232, 198, 150, 0.16)");
        spot.addColorStop(0.35, "rgba(201, 153, 106, 0.07)");
        spot.addColorStop(1, "rgba(196, 137, 74, 0)");
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, cw, ch);

        const time = t * 0.001;
        for (const p of dust) {
          const sway = Math.sin(time * p.drift * 8 + p.phase) * 0.012;
          const rise = ((time * p.drift * 0.08 + p.y) % 1.15) - 0.08;
          const px = (p.x + sway + (pointer.x - 0.5) * 0.03 * p.z) * cw;
          const py = rise * ch;
          const alpha = 0.12 + p.z * 0.25;
          const size = Math.max(0.55, p.r * p.z * dpr * 1.15);
          ctx.beginPath();
          ctx.fillStyle = `rgba(240, 233, 224, ${alpha})`;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) {
        lastT = 0;
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    resize();
    updateLogoTarget();
    applyLogo(reduced ? logoTarget : 0);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      className="page-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="emulsion-bloom emulsion-bloom-a" />
      <div className="emulsion-bloom emulsion-bloom-b" />

      <div className="light-leak light-leak-a" />
      <div className="light-leak light-leak-c" />

      <div ref={logoRef} className="logo-scroll-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-ta.png" alt="" width={512} height={512} />
      </div>

      <div ref={apertureRef} className="film-aperture">
        <span className="film-aperture-ring film-aperture-ring-1" />
        <span className="film-aperture-ring film-aperture-ring-2" />
        <span className="film-aperture-ring film-aperture-ring-3" />
        <span className="film-aperture-ring film-aperture-ring-4" />
        <span className="film-aperture-arc" />
        <span className="film-aperture-follower film-aperture-follower-a" />
        <span className="film-aperture-follower film-aperture-follower-b" />
        <span className="film-aperture-follower film-aperture-follower-c" />
        <span className="film-aperture-follower film-aperture-follower-d" />
        <span className="film-aperture-follower film-aperture-follower-e" />
        <span className="film-aperture-follower film-aperture-follower-f" />
        <span className="film-aperture-follower film-aperture-follower-g" />
        <span className="film-aperture-follower film-aperture-follower-h" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
