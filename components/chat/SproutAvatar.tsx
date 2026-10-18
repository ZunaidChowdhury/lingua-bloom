import Image from "next/image";

export function SproutAvatar({ className }: { className?: string }) {
  return (
    <Image
      src="/lingua-bloom-bot.png"
      alt="Bloom"
      width={36}
      height={36}
      className={`size-9 sm:size-10 shrink-0 rounded-full object-cover shadow-xs ring-2 ring-primary/25 bg-secondary/40 transition-transform hover:scale-105 motion-reduce:hover:scale-100 ${className ?? ""}`}
    />
  );
}
