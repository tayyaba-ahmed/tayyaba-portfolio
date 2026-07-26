type LogoMarkProps = {
  className?: string;
  priority?: boolean;
};

/** TA monogram mark used in the header and atmosphere. */
export function LogoMark({ className = "h-9 w-9", priority = false }: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static brand asset
    <img
      src="/logo-ta.png"
      alt="Tayyaba Ahmed"
      width={256}
      height={256}
      className={className}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
