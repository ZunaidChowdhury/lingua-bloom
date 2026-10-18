export function WakingUp() {
  return (
    <div
      className="flex items-center gap-2 text-muted-foreground"
      role="status"
      aria-label="Waking up the garden"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0 animate-pulse motion-reduce:animate-none"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="5" className="fill-sun" />
        <g strokeWidth="2" strokeLinecap="round" className="stroke-sun">
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
      <span className="text-sm">Waking up the garden…</span>
    </div>
  );
}
