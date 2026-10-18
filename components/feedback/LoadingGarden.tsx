export function LoadingGarden({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-3 ${className ?? ""}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 96 96"
        className="size-24"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="48" cy="48" r="44" className="fill-mint" />
        <path
          d="M34 66h28l-3 16a4 4 0 0 1-4 3H41a4 4 0 0 1-4-3z"
          className="fill-lavender"
        />
        <rect
          x="32"
          y="62"
          width="32"
          height="8"
          rx="4"
          className="fill-lavender"
        />
        <rect
          x="46"
          y="28"
          width="4"
          height="38"
          rx="2"
          className="garden-stem fill-primary"
        />
        <path
          d="M46 50c-8 0-14-5-14-12 8-1 14 4 14 12z"
          className="garden-leaf-left fill-primary"
        />
        <path
          d="M50 44c8 0 14-5 14-12-8-1-14 4-14 12z"
          className="garden-leaf-right fill-primary"
        />
        <circle cx="48" cy="26" r="8" className="garden-bud fill-sun" />
        <circle cx="48" cy="26" r="3.5" className="garden-bud fill-primary" />
      </svg>
      <span className="text-sm text-muted-foreground">
        The garden is loading…
      </span>
    </div>
  );
}
