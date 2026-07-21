import { site } from "@/data/portfolio";
import * as SiIcons from "react-icons/si";

type IconName = keyof typeof SiIcons;

const skillColors: Record<string, string> = {
  PHP: "#777BB4",
  Laravel: "#FF2D20",
  React: "#61DAFB",
  "Next.js": "#EDEDED",
  "Node.js": "#339933",
  MySQL: "#4479A1",
  C: "#A8B9CC",
  "ASP.NET": "#512BD4",
  "Tailwind CSS": "#38BDF8",
};

function getIcon(iconName: string) {
  return SiIcons[iconName as IconName] ?? null;
}

function SkillItems({ markedHidden = false }: { markedHidden?: boolean }) {
  return (
    <ul className="flex items-center" aria-hidden={markedHidden || undefined}>
      {site.skills.map((skill) => {
        const Icon = getIcon(skill.icon);
        const color = skillColors[skill.name] ?? "#c9996a";

        return (
          <li
            key={`${skill.name}-${markedHidden ? "b" : "a"}`}
            className="mx-3 flex shrink-0 items-center gap-3 border border-border/70 px-5 py-4"
          >
            <span
              className="flex h-10 w-10 items-center justify-center"
              style={{ color }}
            >
              {Icon && <Icon size={26} aria-hidden />}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
              {skill.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function SkillsMarquee() {
  return (
    <div>
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
        Languages & tools
      </p>

      <div className="relative overflow-hidden border-y border-border py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee-track flex w-max">
          <SkillItems />
          <SkillItems markedHidden />
        </div>
      </div>
    </div>
  );
}
