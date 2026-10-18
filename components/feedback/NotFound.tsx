import Link from "next/link";

export function NotFound() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
      <svg
        viewBox="0 0 64 64"
        className="size-14"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="32" cy="32" r="30" className="fill-mint" />
        <path
          d="M32 48V30"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-primary"
        />
        <path
          d="M32 38c-7 0-12-4-12-10 7-1 12 3 12 10z"
          className="fill-primary"
        />
        <text
          x="40"
          y="24"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          className="fill-lavender"
        >
          ?
        </text>
      </svg>
      <h1 className="font-heading text-lg font-bold text-foreground">
        This path is overgrown
      </h1>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Back home
      </Link>
    </div>
  );
}
