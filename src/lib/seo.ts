import { site } from "@/data/portfolio";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://tayyaba-ahmed-portfolio.vercel.app";

export const siteTitle = `${site.fullName} — ${site.title}`;

export const siteDescription =
  "Software developer building fast websites, ecommerce stores, WordPress themes, CMS tools, and AI chatbots. Available worldwide for client work.";

export const siteKeywords = [
  "Tayyaba Ahmed",
  "software developer",
  "web developer",
  "Next.js developer",
  "WordPress developer",
  "ecommerce websites",
  "landing pages",
  "AI chatbots",
  "portfolio",
  "freelance developer",
];
