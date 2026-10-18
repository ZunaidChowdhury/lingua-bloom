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
      className="flex flex-col gap-1 w-full"
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
          placeholder="Talk to Bloom (e.g. 'hello', 'quiz me')…"
          className="min-h-12 sm:min-h-13.5 flex-1 rounded-full border-2 border-primary/25 bg-[#F4FAF6] dark:bg-[#122019] px-4 sm:px-5 text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground/75 shadow-xs focus-visible:border-primary focus-visible:bg-white dark:focus-visible:bg-[#182821] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all"
        />
        <button
          type="submit"
          disabled={pending || trimmed.length === 0}
          className="cursor-pointer inline-flex min-h-12 sm:min-h-13.5 items-center justify-center gap-1.5 rounded-full bg-primary px-5 sm:px-6 font-heading text-sm sm:text-base font-bold text-white dark:text-[#0C1B14] shadow-md transition-all hover:bg-primary/90 hover:scale-102 hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
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
