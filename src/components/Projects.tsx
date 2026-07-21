import Image from "next/image";
import { site } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import stridewearImg from "@/assets/projects/stridewear.png";
import zasImg from "@/assets/projects/zas.png";
import portfolioImg from "@/assets/projects/portfolio.png";

const projectImages = {
  stridewear: stridewearImg,
  zas: zasImg,
  portfolio: portfolioImg,
} as const;

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading index="02" title="Projects" />
        </FadeIn>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((project, index) => {
            const image = project.image
              ? projectImages[project.image as keyof typeof projectImages]
              : undefined;

            return (
              <FadeIn key={project.title} delay={index * 70}>
                <li className="group relative flex h-full flex-col overflow-hidden border border-border bg-surface/40 transition-colors duration-300 hover:border-accent/50">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-0"
                      aria-label={`Open ${project.title}`}
                    />
                  )}

                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-film">
                    {image ? (
                      <Image
                        src={image}
                        alt={project.title}
                        fill
                        priority={index < 2}
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={70}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface via-film to-background">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                          Image coming soon
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7 pointer-events-none">
                    <span className="font-mono text-sm text-accent/80 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex gap-5 border-t border-border pt-5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto text-accent transition-opacity hover:opacity-70"
                        >
                          Live →
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto text-muted transition-colors hover:text-foreground"
                        >
                          Code
                        </a>
                      )}
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
