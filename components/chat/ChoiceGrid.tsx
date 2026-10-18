"use client";

type GridChoice = {
  id: string;
  label: string;
  emoji: string | null;
};

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
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(choice.id)}
          className="flex min-h-16 items-center gap-3 rounded-2xl border-2 border-border bg-card px-4 py-3 text-left font-semibold text-foreground transition-colors hover:border-primary disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {choice.emoji ? (
            <span aria-hidden="true" className="text-3xl">
              {choice.emoji}
            </span>
          ) : null}
          <span>{choice.label}</span>
        </button>
      ))}
    </div>
  );
}
