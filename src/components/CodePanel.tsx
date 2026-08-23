"use client";

import { useEffect, useState } from "react";

type Token = { text: string; className?: string };

const KEY = "text-accent";
const STR = "text-foreground/80";
const FN = "text-foreground";
const MUTED = "text-muted";

const SNIPPET: Token[][] = [
  [
    { text: "const ", className: KEY },
    { text: "developer" },
    { text: " = {", className: MUTED },
  ],
  [
    { text: "  name", className: MUTED },
    { text: ": " },
    { text: "'Tayyaba Ahmed'", className: STR },
    { text: ",", className: MUTED },
  ],
  [
    { text: "  role", className: MUTED },
    { text: ": " },
    { text: "'Software Developer'", className: STR },
    { text: ",", className: MUTED },
  ],
  [
    { text: "  ships", className: MUTED },
    { text: ": " },
    { text: "true", className: KEY },
    { text: ",", className: MUTED },
  ],
  [{ text: "};", className: MUTED }],
  [],
  [
    { text: "await ", className: KEY },
    { text: "developer." },
    { text: "build", className: FN },
    { text: "(", className: MUTED },
    { text: "yourIdea" },
    { text: ");", className: MUTED },
  ],
];

const LINE_LENGTHS = SNIPPET.map((line) =>
  line.reduce((total, token) => total + token.text.length, 0),
);
const LINE_STARTS = LINE_LENGTHS.reduce<number[]>((starts, length, index) => {
  starts.push(index === 0 ? 0 : starts[index - 1] + LINE_LENGTHS[index - 1]);
  return starts;
}, []);
const TOTAL_CHARS = LINE_LENGTHS.reduce((a, b) => a + b, 0);

const TYPE_MS = 32;
const HOLD_MS = 2600;

export function CodePanel() {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(TOTAL_CHARS);
      return;
    }

    let timer = 0;
    let count = 0;

    const step = () => {
      const finished = count >= TOTAL_CHARS;
      count = finished ? 0 : count + 1;
      setTyped(count);
      timer = window.setTimeout(
        step,
        count >= TOTAL_CHARS ? HOLD_MS : count === 0 ? 500 : TYPE_MS,
      );
    };

    timer = window.setTimeout(step, 900);
    return () => window.clearTimeout(timer);
  }, []);

  const activeLine = LINE_STARTS.findIndex(
    (start, index) => typed <= start + LINE_LENGTHS[index],
  );

  return (
    <aside className="panel-float relative min-w-0 max-w-full overflow-hidden rounded-2xl bg-black/35 ring-1 ring-white/10">
      <div
        className="panel-glow pointer-events-none absolute -top-16 right-0 h-44 w-44 rounded-full bg-accent/18 blur-3xl"
        aria-hidden
      />

      <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
          developer.ts
        </span>
        <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted uppercase">
          <span className="live-dot bg-accent h-1.5 w-1.5 rounded-full" />
          Live
        </span>
      </div>

      <pre className="relative overflow-x-hidden px-4 py-5 font-mono text-[clamp(10px,2.6vw,13px)] leading-7 max-[325px]:px-3 max-[325px]:py-4 max-[325px]:text-[10px] max-[325px]:leading-6 sm:px-5">
        <code className="block min-w-0">
          {SNIPPET.map((line, lineIndex) => {
            const visible = Math.max(
              0,
              Math.min(typed - LINE_STARTS[lineIndex], LINE_LENGTHS[lineIndex]),
            );
            let offset = 0;
            const isActive = lineIndex === activeLine;

            return (
              <div
                key={lineIndex}
                className={`flex min-h-7 gap-3 rounded-md px-1.5 transition-colors duration-300 max-[325px]:gap-2 max-[325px]:min-h-6 ${
                  isActive ? "bg-accent/8" : "bg-transparent"
                }`}
              >
                <span
                  className={`w-4 shrink-0 select-none text-right text-[10px] transition-colors duration-300 max-[325px]:w-3.5 max-[325px]:text-[9px] ${
                    isActive ? "text-accent" : "text-white/25"
                  }`}
                >
                  {String(lineIndex + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 break-words whitespace-pre-wrap">
                  {line.map((token, tokenIndex) => {
                    const shown = token.text.slice(
                      0,
                      Math.max(0, Math.min(visible - offset, token.text.length)),
                    );
                    offset += token.text.length;
                    return (
                      <span key={tokenIndex} className={token.className}>
                        {shown}
                      </span>
                    );
                  })}
                  <span
                    className={`bg-accent ml-0.5 inline-block h-3.5 w-[2px] align-[-2px] ${
                      isActive ? "caret" : "opacity-0"
                    }`}
                  />
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </aside>
  );
}
