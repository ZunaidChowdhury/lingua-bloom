"use client";

import { ErrorFallback } from "@/components/feedback/ErrorFallback";

export default function RouteError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <ErrorFallback
        message="Something went wrong in the garden. Nothing you did — please try again."
        onRetry={reset}
      />
    </div>
  );
}
