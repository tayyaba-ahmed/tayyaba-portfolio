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

/** Site-wide film atmosphere: blooms, light leaks, reactive rings, light, dust. */
export function PageAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const aperture = apertureRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const pointer = { x: 0.55, y: 0.35, tx: 0.55, ty: 0.35 };
    const ring = { angle: -40, tAngle: -40, ax: 0, ay: 0, tax: 0, tay: 0 };
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
    const dust: Dust[] = [];

    const angleDelta = (a: number, b: number) =>
      Math.abs(((a - b + 540) % 360) - 180);

    const seedDust = () => {
      dust.length = 0;
      const count = Math.min(90, Math.floor((w * h) / 14000));
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random(),
          y: Math.random(),
          z: 0.35 + Math.random() * 0.65,
          r: 0.45 + Math.random() * 1.8,
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
      const dx = clientX - cx;
      const dy = clientY - cy;
      const next = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      if (angleDelta(next, lastCursorAngle) > 2) {
        beadMode = "home";
        lastCursorAngle = next;
      }
      ring.tAngle = next;
      ring.tax = Math.max(-1, Math.min(1, dx / (rect.width * 0.7))) * 18;
      ring.tay = Math.max(-1, Math.min(1, dy / (rect.height * 0.7))) * 14;
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedDust();
    };

    const onPointer = (e: PointerEvent) => {
      if (reduced) return;
      pointer.tx = e.clientX / w;
      pointer.ty = e.clientY / h;
      updateRingTarget(e.clientX, e.clientY);
    };

    const lerpAngle = (from: number, to: number, t: number) => {
      let diff = ((to - from + 540) % 360) - 180;
      return from + diff * t;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      const gx = w * 0.55;
      const gy = h * 0.32;
      const spot = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.45);
      spot.addColorStop(0, "rgba(201, 153, 106, 0.2)");
      spot.addColorStop(0.35, "rgba(196, 137, 74, 0.08)");
      spot.addColorStop(1, "rgba(196, 137, 74, 0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      const dt = lastT ? Math.min((t - lastT) / 1000, 0.05) : 0.016;
      lastT = t;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ring.angle = lerpAngle(ring.angle, ring.tAngle, 0.08);
      ring.ax += (ring.tax - ring.ax) * 0.07;
      ring.ay += (ring.tay - ring.ay) * 0.07;

      if (aperture) {
        aperture.style.setProperty("--ring-angle", `${ring.angle}deg`);
        aperture.style.setProperty("--ring-x", `${ring.ax}px`);
        aperture.style.setProperty("--ring-y", `${ring.ay}px`);
        aperture.style.setProperty("--ring-rx", `${(-ring.ay / 14) * 6}deg`);
        aperture.style.setProperty("--ring-ry", `${(ring.ax / 18) * 7}deg`);

        let settled = true;
        for (const bead of beads) {
          if (beadMode === "home") {
            const target = ring.tAngle + bead.offset;
            bead.angle = lerpAngle(bead.angle, target, 0.14);
            if (angleDelta(bead.angle, target) > 4) settled = false;
          } else {
            bead.angle = ((bead.angle + bead.speed * dt) % 360 + 360) % 360;
          }
          aperture.style.setProperty(`--bead-${bead.key}`, `${bead.angle}deg`);
        }
        if (beadMode === "home" && settled) {
          beadMode = "orbit";
        }
      }

      const gx = pointer.x * w;
      const gy = pointer.y * h;
      const radius = Math.max(w, h) * 0.42;

      const spot = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
      spot.addColorStop(0, "rgba(232, 198, 150, 0.2)");
      spot.addColorStop(0.22, "rgba(201, 153, 106, 0.11)");
      spot.addColorStop(0.55, "rgba(196, 137, 74, 0.045)");
      spot.addColorStop(1, "rgba(196, 137, 74, 0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);

      const time = t * 0.001;
      for (const p of dust) {
        const sway = Math.sin(time * p.drift * 8 + p.phase) * 0.012;
        const rise = ((time * p.drift * 0.08 + p.y) % 1.15) - 0.08;
        const px = (p.x + sway + (pointer.x - 0.5) * 0.04 * p.z) * w;
        const py = rise * h;
        const alpha = 0.1 + p.z * 0.28;
        const size = p.r * p.z * (1 + (1 - Math.abs(pointer.x - p.x)) * 0.35);

        ctx.beginPath();
        ctx.fillStyle = `rgba(240, 233, 224, ${alpha})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div
      className="page-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Emulsion blooms */}
      <div className="emulsion-bloom emulsion-bloom-a" />
      <div className="emulsion-bloom emulsion-bloom-b" />
      <div className="emulsion-bloom emulsion-bloom-c" />

      {/* Projector light leaks */}
      <div className="light-leak light-leak-a" />
      <div className="light-leak light-leak-b" />
      <div className="light-leak light-leak-c" />

      {/* Quiet cursor-reactive rings */}
      <div ref={apertureRef} className="film-aperture">
        <span className="film-aperture-ring film-aperture-ring-1" />
        <span className="film-aperture-ring film-aperture-ring-2" />
        <span className="film-aperture-ring film-aperture-ring-3" />
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

      {/* Reactive spotlight + film dust */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
