"use client";

type SplitTextProps = {
  text: string;
  className?: string;
  delayMs?: number;
  staggerMs?: number;
};

export function SplitText({
  text,
  className = "",
  delayMs = 80,
  staggerMs = 38,
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => {
        const charOffset = words
          .slice(0, wordIndex)
          .reduce((sum, w) => sum + w.length + 1, 0);

        return (
          <span
            key={`${word}-${wordIndex}`}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((char, charIndex) => (
              <span key={`${char}-${charIndex}`} className="inline-block overflow-hidden align-bottom">
                <span
                  className="split-letter"
                  style={{
                    animationDelay: `${delayMs + (charOffset + charIndex) * staggerMs}ms`,
                  }}
                  aria-hidden
                >
                  {char}
                </span>
              </span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block" aria-hidden>
                &nbsp;
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
