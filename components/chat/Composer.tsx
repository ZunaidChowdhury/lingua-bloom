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
      className="flex flex-col gap-1 border-t border-border bg-background pt-3 pb-[max(0.25rem,env(safe-area-inset-bottom))]"
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
          placeholder="Say something…"
          className="min-h-12 flex-1 rounded-xl border border-border bg-card px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <button
          type="submit"
          disabled={pending || trimmed.length === 0}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 font-heading font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {pending ? "…" : "Send"}
        </button>
      </div>
      <p
        aria-hidden="true"
        className="self-end text-xs text-muted-foreground"
      >
        {value.length}/{MAX_LENGTH}
      </p>
    </form>
  );
}
