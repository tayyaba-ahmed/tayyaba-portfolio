import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from "next/font/google";
import { PageAtmosphere } from "@/components/PageAtmosphere";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/data/portfolio";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${site.fullName} — ${site.title}`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} scroll-smooth antialiased`}
    >
      <body className="film-stage relative min-h-screen text-foreground">
        <PageAtmosphere />
        <div className="film-grain" aria-hidden />
        <div className="relative z-10">{children}</div>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
