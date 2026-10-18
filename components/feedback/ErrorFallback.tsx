type ErrorFallbackProps = {
  message: string;
  onRetry?: () => void;
  title?: string;
};

export function ErrorFallback({
  message,
  onRetry,
  title = "Oops, a little tangle happened",
}: ErrorFallbackProps) {
  return (
    <div
      role="alert"
      className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center"
    >
      <svg
        viewBox="0 0 64 64"
        className="size-14"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="32" cy="32" r="30" className="fill-mint" />
        <path
          d="M32 46V28"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-primary"
        />
        <path
          d="M32 34c-6 0-10-4-10-9 6-1 10 3 10 9z"
          className="fill-primary"
        />
        <path
          d="M24 20l16 16M40 20L24 36"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="stroke-lavender"
        />
      </svg>
      <h2 className="font-heading text-lg font-bold text-foreground">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
