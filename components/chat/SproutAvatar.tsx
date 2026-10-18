export function SproutAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={`size-9 shrink-0 ${className ?? ""}`}
    >
      <circle cx="16" cy="16" r="16" className="fill-mint" />
      <path
        d="M16 24V13"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-primary"
        fill="none"
      />
      <path
        d="M16 18c-5 0-8-3-8-7 5-1 8 2 8 7z"
        className="fill-primary"
      />
      <path
        d="M16 15c5 0 8-3 8-7-5-1-8 2-8 7z"
        className="fill-primary"
      />
      <circle cx="16" cy="11" r="3" className="fill-lavender" />
    </svg>
  );
}
