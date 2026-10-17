export function DataLoadFailed({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-[#DCE7DF] bg-white p-6 text-center">
      <p className="text-[#20332B]">We could not load this right now.</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-[#389B78] px-5 py-2 text-white"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
