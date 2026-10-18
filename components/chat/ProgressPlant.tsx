import type { Progress } from "@/lib/types";

export function ProgressPlant({ progress }: { progress: Progress }) {
  const required = Math.max(progress.required, 1);
  const filled = Math.min(Math.max(progress.correct_in_window, 0), required);
  const atTop = progress.level >= 3;
  const alt = atTop
    ? `${filled} of ${required} stars — keep blooming!`
    : `${filled} of ${required} stars toward Level ${progress.level + 1}`;

  return (
    <div
      role="img"
      aria-label={alt}
      className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
    >
      <span aria-hidden="true" className="text-lg">
        🌱
      </span>
      <span aria-hidden="true" className="flex items-center gap-1">
        {Array.from({ length: required }, (_, index) => (
          <span
            key={index}
            className={`size-2.5 rounded-full ${
              index < filled ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </span>
      <span aria-hidden="true" className="text-xs font-semibold text-muted-foreground">
        {filled}/{required}
      </span>
    </div>
  );
}
