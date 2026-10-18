import Image from "next/image";

export function WakingUp() {
  return (
    <div
      className="flex items-center gap-2.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 shadow-xs backdrop-blur-xs"
      role="status"
      aria-label="Waking up the garden"
    >
      <div className="bloom-float relative size-5 shrink-0">
        <Image
          src="/lingua-bloom-bot.png"
          alt="Bloom"
          width={20}
          height={20}
          className="size-5 rounded-full object-cover"
        />
      </div>
      <span className="flex items-center gap-1 text-sm font-medium text-foreground">
        <span>Bloom is waking up the garden</span>
        <span className="flex items-center text-primary">
          <span className="bloom-dot-1">.</span>
          <span className="bloom-dot-2">.</span>
          <span className="bloom-dot-3">.</span>
        </span>
      </span>
    </div>
  );
}
