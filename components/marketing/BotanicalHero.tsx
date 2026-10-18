import Image from "next/image";

export function BotanicalHero({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      <div className="relative">
        {/* Soft glowing aura */}
        <div
          aria-hidden="true"
          className="bloom-ring absolute -inset-6 rounded-full bg-gradient-to-tr from-mint/70 via-sun/30 to-sky/50 blur-2xl dark:from-mint/20 dark:to-sky/20"
        />

        {/* Floating playful badge 1 (top right) */}
        <div
          aria-hidden="true"
          className="bloom-sparkle-1 absolute -top-4 -right-4 z-20 hidden items-center gap-1.5 rounded-full border border-sun/50 bg-card/95 px-3 py-1 text-xs font-bold text-amber-900 shadow-md backdrop-blur-xs sm:flex dark:text-sun"
        >
          <span>✨</span>
          <span>Ages 3–7</span>
        </div>

        {/* Floating playful badge 2 (bottom left) */}
        <div
          aria-hidden="true"
          className="bloom-sparkle-2 absolute -bottom-3 -left-6 z-20 hidden items-center gap-1.5 rounded-full border border-mint bg-card/95 px-3 py-1 text-xs font-bold text-primary shadow-md backdrop-blur-xs sm:flex"
        >
          <span>🌱</span>
          <span>Little words</span>
        </div>

        {/* Mascot Bot Card */}
        <div className="bloom-float relative z-10 rounded-3xl bg-card/90 p-4 shadow-xl ring-4 ring-mint/50 dark:ring-mint/20">
          <Image
            src="/lingua-bloom-bot.png"
            alt="LinguaBloom botanical robot friend"
            width={260}
            height={260}
            priority
            className="size-48 sm:size-60 rounded-2xl object-contain drop-shadow-sm transition-transform hover:scale-105 motion-reduce:hover:scale-100"
          />
        </div>
      </div>
    </div>
  );
}
