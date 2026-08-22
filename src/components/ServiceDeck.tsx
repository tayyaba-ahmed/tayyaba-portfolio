"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/data/portfolio";
import websitesImg from "@/assets/services/websites.webp";
import ecommerceImg from "@/assets/services/ecommerce.webp";
import redesignImg from "@/assets/services/redesign.webp";
import cmsImg from "@/assets/services/cms.webp";
import integrationsImg from "@/assets/services/integrations.webp";
import careImg from "@/assets/services/care.webp";

const serviceImages = {
  "Landing Pages": websitesImg,
  "Ecommerce Websites": ecommerceImg,
  "Website Redesign": redesignImg,
  "CMS & Admin Systems": cmsImg,
  Integrations: integrationsImg,
  "Care & Fixes": careImg,
} as const;

export function ServiceDeck() {
  const [active, setActive] = useState(0);
  const services = site.services;

  return (
    <div id="services" className="mx-auto w-full max-w-md scroll-mt-24 pr-7">
      <div className="relative h-[22rem] sm:h-[26rem]">
        {services.map((service, index) => {
          const offset = (index - active + services.length) % services.length;
          if (offset > 2) return null;
          const image =
            serviceImages[service.title as keyof typeof serviceImages];
          const isFront = offset === 0;

          return (
            <button
              key={service.title}
              type="button"
              onClick={() =>
                setActive(isFront ? (active + 1) % services.length : index)
              }
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-black/60 text-left ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500"
              style={{
                transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.04})`,
                zIndex: services.length - offset,
                opacity: isFront ? 1 : 0.4,
              }}
              aria-label={
                isFront
                  ? `${service.title}. Show next service.`
                  : `Show ${service.title}`
              }
            >
              {image && (
                <div className="relative h-44 w-full shrink-0 overflow-hidden">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 28rem"
                    quality={70}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-accent text-[11px] font-medium tracking-[0.22em] uppercase">
                  {String(index + 1).padStart(2, "0")} · Service
                </p>
                <h3 className="text-foreground mt-3 text-2xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted mt-3 line-clamp-3 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {services.map((service, index) => (
          <button
            key={service.title}
            type="button"
            aria-label={`Show ${service.title}`}
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? "bg-accent w-6" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
