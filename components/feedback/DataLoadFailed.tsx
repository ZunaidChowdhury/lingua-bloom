export function DataLoadFailed({ onRetry }: { onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center"
    >
      <p className="text-sm font-semibold text-foreground">
        Data could not be loaded
      </p>
      <p className="text-sm text-muted-foreground">
        The garden is having trouble reaching the server. Please try again.
      </p>
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
