"use client";

type GridChoice = {
  id: string;
  label: string;
  emoji: string | null;
};

const OPTION_BADGES = [
  { letter: "A", bg: "bg-mint text-primary dark:bg-mint/30 dark:text-mint" },
  { letter: "B", bg: "bg-sky text-sky-900 dark:bg-sky/30 dark:text-sky" },
  { letter: "C", bg: "bg-sun text-amber-900 dark:bg-sun/30 dark:text-sun" },
  { letter: "D", bg: "bg-lavender text-purple-900 dark:bg-lavender/30 dark:text-lavender" },
];

export function ChoiceGrid({
  choices,
  onSelect,
  disabled = false,
  label,
}: {
  choices: GridChoice[];
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {choices.map((choice, index) => {
        const badge = OPTION_BADGES[index % OPTION_BADGES.length];
        return (
          <button
            key={choice.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(choice.id)}
            className="group flex min-h-16 items-center gap-3.5 rounded-3xl border-2 border-border/80 bg-card p-3.5 text-left font-semibold text-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md active:translate-y-0 active:scale-98 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:translate-y-0"
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-2xl text-xs font-bold transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100 ${badge.bg}`}
              aria-hidden="true"
            >
              {badge.letter}
            </span>
            {choice.emoji ? (
              <span
                aria-hidden="true"
                className="text-2xl sm:text-3xl transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100"
              >
                {choice.emoji}
              </span>
            ) : null}
            <span className="flex-1 text-base leading-snug">{choice.label}</span>
          </button>
        );
      })}
    </div>
  );
}
