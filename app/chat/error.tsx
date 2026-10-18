"use client";

import { ErrorFallback } from "@/components/feedback/ErrorFallback";

export default function ChatError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <ErrorFallback
        message="Bloom lost the train of thought. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
