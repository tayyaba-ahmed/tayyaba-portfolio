import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { getProjectImage } from "@/data/project-images";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const image = getProjectImage(project.image);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-white/10 transition-[ring-color] duration-300 hover:ring-accent/35">
      <div className="relative aspect-[1024/465] overflow-hidden bg-[#0e1117]">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-contain object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_40%_20%,rgba(122,162,247,0.14),transparent_55%),#0e1117]">
            <span className="font-mono text-[11px] tracking-[0.28em] text-accent/70 uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent focus-visible:text-accent"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <p className="mt-4 text-[10px] tracking-[0.14em] text-white/40 uppercase">
          {project.tags.join(" · ")}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium tracking-[0.18em] uppercase">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-opacity hover:opacity-70"
            >
              Live ↗
            </a>
          )}
          {!project.href && (
            <span className="text-white/40">Private</span>
          )}
        </div>
      </div>
    </article>
  );
}
