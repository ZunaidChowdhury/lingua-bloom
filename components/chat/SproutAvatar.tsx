import Image from "next/image";

export function SproutAvatar({ className }: { className?: string }) {
  return (
    <Image
      src="/lingua-bloom-bot.png"
      alt="Bloom"
      width={36}
      height={36}
      className={`size-9 shrink-0 rounded-full object-cover shadow-xs ${className ?? ""}`}
    />
  );
}
