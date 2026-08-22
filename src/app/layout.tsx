import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { PageAtmosphere } from "@/components/PageAtmosphere";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/data/portfolio";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tayyaba-ahmed-portfolio.vercel.app"),
  title: `${site.fullName} — ${site.title}`,
  description: site.tagline,
  openGraph: {
    title: `${site.fullName} — ${site.title}`,
    description: site.tagline,
    url: "/",
    siteName: site.fullName,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 675,
        alt: `${site.fullName} — ${site.title}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.title}`,
    description: site.tagline,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} scroll-smooth antialiased`}
    >
      <body className="mesh-stage relative min-h-screen text-foreground">
        <PageAtmosphere />
        <div className="film-grain" aria-hidden />
        <div className="relative z-10">{children}</div>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
