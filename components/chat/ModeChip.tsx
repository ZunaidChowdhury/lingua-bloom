import type { Mode } from "@/lib/types";

const MODE_LABELS: Record<Mode, string> = {
  learning: "Learning",
  conversation: "Conversation",
  engagement: "Engagement",
  support: "Support",
};

export function ModeChip({ mode }: { mode: Mode }) {
  return (
    <span
      data-mode={mode}
      className="inline-flex min-h-8 items-center rounded-full bg-mode-accent px-3 py-1 text-sm font-bold text-mode-accent-foreground"
    >
      {MODE_LABELS[mode]}
    </span>
  );
}
