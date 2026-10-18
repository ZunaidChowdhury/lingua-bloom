"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && theme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${isDark ? "dark" : "light"}. Switch to ${next}`}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {isDark ? (
        <Moon className="size-5" aria-hidden="true" />
      ) : (
        <Sun className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
