export function LevelBadge({ level }: { level: number }) {
  const clamped = level === 2 || level === 3 ? level : 1;
  return (
    <span
      data-level={`L${clamped}`}
      aria-label={`Level ${clamped}`}
      className="inline-flex min-h-8 items-center rounded-full bg-level-accent px-3 py-1 text-sm font-bold text-level-accent-foreground"
    >
      L{clamped}
    </span>
  );
}
