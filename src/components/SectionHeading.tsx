export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        {index}
      </p>
      <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
