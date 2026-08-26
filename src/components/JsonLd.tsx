import { site } from "@/data/portfolio";
import { siteDescription, siteUrl } from "@/lib/seo";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    url: siteUrl,
    image: `${siteUrl}/og-share.jpg?v=3`,
    jobTitle: site.title,
    description: siteDescription,
    email: site.email,
    telephone: site.phone,
    sameAs: site.socials
      .filter((s) => s.label !== "WhatsApp")
      .map((s) => s.href),
    knowsAbout: [
      "Web development",
      "Next.js",
      "WordPress",
      "Ecommerce",
      "AI chatbots",
      "CMS",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.fullName,
    url: siteUrl,
    description: siteDescription,
    author: {
      "@type": "Person",
      name: site.fullName,
    },
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.fullName} — Web Development`,
    url: siteUrl,
    description: siteDescription,
    image: `${siteUrl}/og-share.jpg?v=3`,
    email: site.email,
    telephone: site.phone,
    areaServed: "Worldwide",
    priceRange: "$$",
    serviceType: site.services.map((s) => s.title),
  };

  const payload = [person, website, professionalService];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
