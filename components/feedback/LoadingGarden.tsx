import Image from "next/image";

export function LoadingGarden({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 text-center ${className ?? ""}`}
      role="status"
      aria-label="Bloom is waking up the garden"
    >
      {/* Mascot with glowing botanical aura & playful sparkles */}
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing halo */}
        <div
          aria-hidden="true"
          className="bloom-ring absolute size-36 rounded-full bg-mint/50 blur-xl dark:bg-mint/20"
        />
        {/* Soft decorative inner ring */}
        <div
          aria-hidden="true"
          className="bloom-ring absolute size-28 rounded-full border-2 border-sun/40 bg-sun/10 [animation-delay:0.5s]"
        />

        {/* Playful sparkles & little garden leaves */}
        <span
          aria-hidden="true"
          className="bloom-sparkle-1 absolute -top-2 -right-2 text-xl select-none"
        >
          ✨
        </span>
        <span
          aria-hidden="true"
          className="bloom-sparkle-2 absolute -bottom-1 -left-3 text-lg select-none"
        >
          🌱
        </span>
        <span
          aria-hidden="true"
          className="bloom-sparkle-3 absolute -top-1 -left-2 text-base select-none"
        >
          🌸
        </span>

        {/* Central Floating Mascot */}
        <div className="bloom-float relative z-10 flex size-24 items-center justify-center rounded-3xl bg-card p-2 shadow-md ring-4 ring-mint/60">
          <Image
            src="/lingua-bloom-bot.png"
            alt="Bloom"
            width={88}
            height={88}
            priority
            className="size-full rounded-2xl object-contain drop-shadow-xs"
          />
        </div>
      </div>

      {/* Warm, kid-friendly animated message */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="flex items-center gap-1 font-heading text-lg font-bold text-foreground">
          <span>Bloom is waking up the garden</span>
          <span className="flex items-center gap-0.5 text-primary">
            <span className="bloom-dot-1">.</span>
            <span className="bloom-dot-2">.</span>
            <span className="bloom-dot-3">.</span>
          </span>
        </p>
        <p className="text-xs font-medium text-muted-foreground">
          Little words. Big worlds. ✨
        </p>
      </div>
    </div>
  );
}
