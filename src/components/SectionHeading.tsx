export function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-accent text-[11px] font-medium tracking-[0.28em] uppercase">
        {index} — {label}
      </p>
      <h2 className="text-foreground mt-6 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
