import { site } from "@/data/portfolio";
import { skillColors } from "@/lib/skills";
import type { IconType } from "react-icons";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";

const iconPacks = [SiIcons, TbIcons] as const;

function getIcon(iconName: string): IconType | null {
  for (const pack of iconPacks) {
    const Icon = pack[iconName as keyof typeof pack];
    if (Icon) return Icon as IconType;
  }
  return null;
}

function SkillItems({ markedHidden = false }: { markedHidden?: boolean }) {
  return (
    <ul className="flex items-center" aria-hidden={markedHidden || undefined}>
      {site.skills.map((skill) => {
        const Icon = getIcon(skill.icon);
        const color = skillColors[skill.name] ?? "var(--accent)";

        return (
          <li
            key={`${skill.name}-${markedHidden ? "b" : "a"}`}
            className="mx-2 flex shrink-0 items-center gap-3 rounded-full bg-black/35 px-5 py-3 ring-1 ring-white/10"
          >
            <span
              className="flex h-8 w-8 items-center justify-center"
              style={{ color }}
            >
              {Icon && <Icon size={22} aria-hidden />}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-foreground">
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
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
        Languages & tools
      </p>

      <div className="relative overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black/70 to-transparent" />

        <div className="marquee-track flex w-max">
          <SkillItems />
          <SkillItems markedHidden />
        </div>
      </div>
    </div>
  );
}
