import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Portfolio — ${site.fullName}`,
  description: `Selected work by ${site.fullName}: websites, ecommerce, and product builds.`,
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="px-5 pb-20 pt-28 sm:px-10 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
                Portfolio
              </p>
              <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-tight text-foreground">
                All projects
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted">
                A fuller list of selected client and personal work.
              </p>
            </div>
            <Link
              href="/#projects"
              className="text-[11px] font-medium tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent"
            >
              ← Back to home
            </Link>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.projects.map((project, index) => (
              <li key={project.title}>
                <ProjectCard project={project} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
