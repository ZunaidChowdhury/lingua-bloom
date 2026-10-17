export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1" role="status" aria-label="Bloom is typing">
      <span className="size-2 animate-bounce rounded-full bg-[#389B78] motion-reduce:animate-none" />
      <span className="size-2 animate-bounce rounded-full bg-[#389B78] [animation-delay:150ms] motion-reduce:animate-none" />
      <span className="size-2 animate-bounce rounded-full bg-[#389B78] [animation-delay:300ms] motion-reduce:animate-none" />
    </div>
  );
}
