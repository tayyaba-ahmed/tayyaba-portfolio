import Image from "next/image";
import { site } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import websitesImg from "@/assets/services/websites.webp";
import ecommerceImg from "@/assets/services/ecommerce.webp";
import redesignImg from "@/assets/services/redesign.webp";
import cmsImg from "@/assets/services/cms.webp";
import integrationsImg from "@/assets/services/integrations.webp";
import careImg from "@/assets/services/care.webp";
import chatbotsImg from "@/assets/services/chatbots.webp";
import wordpressImg from "@/assets/services/wordpress.webp";

const serviceImages = {
  "Landing Pages": websitesImg,
  "Ecommerce Websites": ecommerceImg,
  "Website Redesign": redesignImg,
  "CMS & Admin Systems": cmsImg,
  Integrations: integrationsImg,
  "Care & Fixes": careImg,
  "AI Chatbots": chatbotsImg,
  WordPress: wordpressImg,
} as const;

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-5 pb-16 sm:px-10 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading index="03" label="Services" title="What I build" />
        </FadeIn>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {site.services.map((service, index) => {
            const image =
              serviceImages[service.title as keyof typeof serviceImages];

            return (
              <FadeIn key={service.title} delay={index * 45}>
                <li className="service-card group relative flex min-h-[17.5rem] overflow-hidden rounded-2xl border border-accent/45 bg-black/20 hover:border-accent sm:aspect-[6/5] sm:min-h-0 lg:aspect-[5/4]">
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      fill
                      priority={index < 3}
                      className="service-card-media object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={80}
                    />
                  )}

                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black from-15% via-black/55 via-45% to-black/10 to-100% transition-opacity duration-500 group-hover:via-black/35 sm:from-10% sm:via-40% sm:to-70%"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 bg-gradient-to-b from-black/35 to-transparent sm:block"
                    aria-hidden
                  />
                  <div className="service-card-shine z-[5]" aria-hidden />

                  <div className="relative z-10 flex w-full flex-col justify-end p-5 sm:justify-between sm:p-7">
                    <span className="hidden font-mono text-[11px] tracking-[0.28em] text-accent uppercase transition-transform duration-500 group-hover:translate-x-0.5 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="service-card-copy">
                      <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-accent uppercase sm:hidden">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="mb-3 h-px w-8 bg-accent transition-all duration-500 group-hover:w-16 sm:mb-4" />
                      <h3 className="text-xl leading-tight font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white sm:text-[clamp(1.35rem,3vw,1.75rem)]">
                        {service.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90 sm:mt-3">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </li>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
