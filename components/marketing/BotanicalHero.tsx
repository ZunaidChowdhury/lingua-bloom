import Image from "next/image";

export function BotanicalHero({ className }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className ?? ""}`}>
      {/* Friendly character greeting bubble */}
      <div
        className="relative z-20 mb-3 inline-flex items-center gap-2 rounded-full border-2 border-primary/25 bg-white/95 dark:bg-card/95 px-4 py-1.5 text-xs sm:text-sm font-bold text-foreground shadow-sm backdrop-blur-md animate-kid-bounce-1"
        role="status"
      >
        <span className="text-base" aria-hidden="true">💬</span>
        <span>&ldquo;Hello! I&apos;m Bloom. Let&apos;s play with words!&rdquo;</span>
        <span className="text-base" aria-hidden="true">🌸</span>
      </div>

      <div className="relative">
        {/* Soft glowing multi-color aura */}
        <div
          aria-hidden="true"
          className="bloom-ring absolute -inset-6 rounded-full bg-gradient-to-tr from-mint/80 via-sun/40 to-sky/60 blur-2xl dark:from-mint/20 dark:to-sky/20"
        />

        {/* Floating playful badge 1 (top right) */}
        <div
          aria-hidden="true"
          className="bloom-sparkle-1 absolute -top-3 -right-3 z-20 flex items-center gap-1.5 rounded-full border-2 border-sun/60 bg-white/95 dark:bg-card/95 px-3 py-1 text-xs font-bold text-amber-950 dark:text-sun shadow-md backdrop-blur-xs"
        >
          <span>⭐</span>
          <span>Ages 3–7</span>
        </div>

        {/* Floating playful badge 2 (bottom left) */}
        <div
          aria-hidden="true"
          className="bloom-sparkle-2 absolute -bottom-3 -left-4 z-20 flex items-center gap-1.5 rounded-full border-2 border-mint/90 bg-white/95 dark:bg-card/95 px-3 py-1 text-xs font-bold text-primary shadow-md backdrop-blur-xs"
        >
          <span>🌱</span>
          <span>Gentle & Fun</span>
        </div>

        {/* Mascot Bot Card */}
        <div className="bloom-float relative z-10 rounded-4xl bg-gradient-to-b from-white to-mint/20 dark:from-card dark:to-mint/10 p-4 shadow-xl ring-4 ring-primary/20 dark:ring-primary/20">
          <Image
            src="/lingua-bloom-bot.png"
            alt="Bloom, your friendly botanical learning robot"
            width={260}
            height={260}
            priority
            className="size-48 sm:size-56 rounded-3xl object-contain drop-shadow-sm transition-transform hover:scale-105 motion-reduce:hover:scale-100"
          />
        </div>
      </div>
    </div>
  );
}
