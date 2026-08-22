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
      className="fixed right-5 bottom-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.28)] transition-transform duration-300 hover:scale-105 sm:right-7 sm:bottom-8"
    >
      <SiWhatsapp size={22} aria-hidden />
    </a>
  );
}
