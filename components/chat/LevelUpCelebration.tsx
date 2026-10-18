"use client";

import { useEffect, useRef } from "react";

const DECORATIONS = [
  { emoji: "🍃", className: "left-[8%] top-[12%]", delay: "0ms" },
  { emoji: "🌿", className: "right-[10%] top-[18%]", delay: "200ms" },
  { emoji: "⭐", className: "left-[14%] bottom-[20%]", delay: "400ms" },
  { emoji: "✨", className: "right-[12%] bottom-[16%]", delay: "600ms" },
  { emoji: "🍃", className: "left-[45%] top-[6%]", delay: "300ms" },
  { emoji: "⭐", className: "right-[40%] bottom-[8%]", delay: "500ms" },
] as const;

export function LevelUpCelebration({
  level,
  onDismiss,
}: {
  level: number;
  onDismiss: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    buttonRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDismiss();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`You grew to Level ${level}`}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          buttonRef.current?.focus();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4"
    >
      {DECORATIONS.map((decoration, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`pointer-events-none absolute ${decoration.className} animate-bounce text-4xl motion-reduce:animate-none`}
          style={{ animationDelay: decoration.delay }}
        >
          {decoration.emoji}
        </span>
      ))}
      <div className="relative flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
        <span
          aria-hidden="true"
          className="animate-pulse text-6xl motion-reduce:animate-none"
        >
          🌟
        </span>
        <h2 className="font-heading text-3xl font-bold text-foreground">
          You grew to Level {level}!
        </h2>
        <p className="text-muted-foreground">
          Your garden is blooming. Wonderful work!
        </p>
        <button
          ref={buttonRef}
          type="button"
          onClick={onDismiss}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 font-heading text-lg font-bold text-primary-foreground transition-transform hover:scale-105 motion-reduce:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Keep going
        </button>
      </div>
    </div>
  );
}
