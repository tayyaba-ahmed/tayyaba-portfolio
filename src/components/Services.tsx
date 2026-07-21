import Image from "next/image";
import { site } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading index="03" title="Services" />
        </FadeIn>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 50}>
              <li className="group flex h-full flex-col overflow-hidden border border-border bg-surface/40 transition-colors duration-300 hover:border-accent/50">
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-film">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="font-mono text-sm text-accent tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
