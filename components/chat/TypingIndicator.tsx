export function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1"
      role="status"
      aria-label="Bloom is typing"
    >
      <span className="size-2 animate-bounce rounded-full bg-primary motion-reduce:animate-none" />
      <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:150ms] motion-reduce:animate-none" />
      <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:300ms] motion-reduce:animate-none" />
    </div>
  );
}
