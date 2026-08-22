import { site } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { CardStack } from "@/components/CardStack";
import { SkillsMarquee } from "@/components/SkillsMarquee";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 pb-16 sm:px-10 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <FadeIn>
          <p className="text-accent mb-6 text-[11px] font-medium tracking-[0.28em] uppercase">
            01 — About
          </p>
          <h2 className="text-foreground text-[clamp(1.45rem,6vw,2.75rem)] leading-[1.2] font-semibold tracking-tight">
            I am {site.fullName}, I create{" "}
            <span className="text-accent font-serif italic">
              unconventional
            </span>{" "}
            yet functional interfaces for the web.
          </h2>
          <div className="mt-8 max-w-xl space-y-5">
            {site.about.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <CardStack />
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
