"use client";

import { SiWhatsapp } from "react-icons/si";
import { site } from "@/data/portfolio";

export function WhatsAppFloat() {
  const href =
    site.socials.find((s) => s.label === "WhatsApp")?.href ??
    "https://wa.me/923132115662";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_28px_rgba(37,211,102,0.45)] sm:bottom-8 sm:right-7"
    >
      <SiWhatsapp size={22} aria-hidden />
    </a>
  );
}
