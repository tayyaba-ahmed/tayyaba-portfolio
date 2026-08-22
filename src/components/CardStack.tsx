"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import frame01 from "@/assets/about/frame-01.webp";
import frame02 from "@/assets/about/frame-02.webp";
import frame03 from "@/assets/about/frame-03.webp";

const cards = [
  {
    label: "Blue night website",
    src: frame01,
  },
  {
    label: "Fashion storefront",
    src: frame02,
  },
  {
    label: "Personal portfolio interface",
    src: frame03,
  },
] as const;

const INTERVAL_MS = 1000;
const STEP = 40;

export function CardStack() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || paused) return;

    let id = 0;
    const start = () => {
      window.clearInterval(id);
      id = window.setInterval(() => {
        setActive((index) => (index + 1) % cards.length);
      }, INTERVAL_MS);
    };

    const onVisibility = () => {
      if (document.hidden) window.clearInterval(id);
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused]);

  const trail = STEP * (cards.length - 1);

  return (
    <div
      className="mx-auto w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative aspect-square w-full">
        {cards.map((card, index) => {
          const offset = (index - active + cards.length) % cards.length;
          const isFront = offset === 0;

          return (
            <button
              key={card.label}
              type="button"
              onClick={() =>
                setActive(isFront ? (active + 1) % cards.length : index)
              }
              className="absolute bottom-0 left-0 overflow-hidden rounded-2xl bg-[#12141a] ring-1 ring-white/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                width: `calc(100% - ${trail}px)`,
                height: `calc(100% - ${trail}px)`,
                transform: `translate3d(${offset * STEP}px, ${-offset * STEP}px, 0)`,
                zIndex: cards.length - offset,
                boxShadow: isFront
                  ? "0 22px 40px rgba(0, 0, 0, 0.42)"
                  : "0 12px 24px rgba(0, 0, 0, 0.28)",
              }}
              aria-label={
                isFront
                  ? `${card.label}. Show next card.`
                  : `Show ${card.label}`
              }
              aria-current={isFront ? "true" : undefined}
            >
              <Image
                src={card.src}
                alt=""
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 22rem"
                quality={70}
                priority={index === 0}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
