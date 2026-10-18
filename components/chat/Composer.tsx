"use client";

import { FormEvent } from "react";

const MAX_LENGTH = 200;

export function Composer({
  value,
  onChange,
  onSend,
  pending,
}: {
  value: string;
  onChange: (next: string) => void;
  onSend: () => void;
  pending: boolean;
}) {
  const trimmed = value.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (trimmed.length === 0 || pending) {
      return;
    }
    onSend();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-1 border-t-2 border-border/70 bg-background/95 pt-3 pb-[max(0.25rem,env(safe-area-inset-bottom))] backdrop-blur-xs"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Type a message to Bloom
        </label>
        <input
          id="chat-input"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={MAX_LENGTH}
          autoComplete="off"
          enterKeyHint="send"
          placeholder="Talk to Bloom (e.g. 'hello', 'lets learn')…"
          className="min-h-14 flex-1 rounded-full border-2 border-border/80 bg-card px-5 text-base font-medium text-foreground placeholder:text-muted-foreground shadow-xs focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <button
          type="submit"
          disabled={pending || trimmed.length === 0}
          className="inline-flex min-h-14 items-center justify-center gap-1.5 rounded-full bg-primary px-6 font-heading font-bold text-primary-foreground shadow-md transition-all hover:scale-102 hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
        >
          {pending ? (
            <span>…</span>
          ) : (
            <>
              <span>Send</span>
              <span aria-hidden="true">🌱</span>
            </>
          )}
        </button>
      </div>
      <p
        aria-hidden="true"
        className="self-end pr-2 text-xs text-muted-foreground"
      >
        {value.length}/{MAX_LENGTH}
      </p>
    </form>
  );
}
