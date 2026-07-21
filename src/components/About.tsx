import { site } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillsMarquee } from "@/components/SkillsMarquee";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading index="01" title="About" />
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mt-10 max-w-3xl space-y-6">
            {site.about.map((paragraph) => (
              <p
                key={paragraph}
                className="text-xl leading-relaxed text-muted sm:text-2xl sm:leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <FadeIn>
          <SkillsMarquee />
        </FadeIn>
      </div>
    </section>
  );
}
