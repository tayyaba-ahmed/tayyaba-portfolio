import { site } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading index="02" title="Projects" />
        </FadeIn>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 70}>
              <li className="group flex h-full flex-col border border-border bg-surface/40 p-6 transition-colors duration-300 hover:border-accent/50 sm:p-7">
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
                      className="text-accent transition-opacity hover:opacity-70"
                    >
                      Live →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      Code
                    </a>
                  )}
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
