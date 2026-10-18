"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const NEXT_THEME = {
  light: "dark",
  dark: "system",
  system: "light",
} as const;

type ThemeName = keyof typeof NEXT_THEME;

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

  const current: ThemeName =
    mounted && theme && theme in NEXT_THEME ? (theme as ThemeName) : "system";
  const next = NEXT_THEME[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}`}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {current === "light" ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : current === "dark" ? (
        <Moon className="size-5" aria-hidden="true" />
      ) : (
        <Monitor className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
