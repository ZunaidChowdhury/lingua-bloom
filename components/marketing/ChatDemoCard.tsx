import Image from "next/image";

export function ChatDemoCard() {
  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-4xl border-3 border-primary/25 bg-white/95 dark:bg-card/95 p-5 sm:p-7 shadow-xl shadow-primary/5">
      {/* Decorative botanical aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-mint/50 dark:bg-mint/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-sun/40 dark:bg-sun/15 blur-3xl"
      />

      {/* Mini Chat Header */}
      <div className="relative flex items-center justify-between border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40 shadow-xs">
            <Image
              src="/lingua-bloom-bot.png"
              alt="Bloom"
              width={44}
              height={44}
              className="size-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-1.5">
              <span>Bloom</span>
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-xs text-muted-foreground">Always gentle, always listening 🌸</p>
          </div>
        </div>

        <span className="rounded-full border border-mint/80 bg-mint/50 dark:bg-mint/20 px-3 py-1 text-xs font-bold text-primary">
          Level 1 • Seedling 🌱
        </span>
      </div>

      {/* Simulated Chat Dialogue */}
      <div className="relative my-5 flex flex-col gap-3.5">
        {/* Bloom's turn */}
        <div className="flex items-start gap-2.5 max-w-[85%]">
          <div className="size-7 shrink-0 rounded-full bg-mint/80 dark:bg-mint/30 flex items-center justify-center text-sm shadow-2xs">
            🌸
          </div>
          <div className="rounded-2xl rounded-tl-xs border border-primary/20 bg-mint/40 dark:bg-mint/15 p-3.5 text-sm sm:text-base font-medium text-foreground shadow-2xs">
            &ldquo;Look at that pretty butterfly! 🦋 What color are its wings?&rdquo;
          </div>
        </div>

        {/* Child's turn */}
        <div className="flex items-start justify-end gap-2.5 self-end max-w-[85%]">
          <div className="rounded-2xl rounded-tr-xs border border-sky/30 bg-sky/30 dark:bg-sky/15 p-3.5 text-sm sm:text-base font-medium text-foreground shadow-2xs text-right">
            &ldquo;Yellow like sunshine! ☀️&rdquo;
          </div>
          <div className="size-7 shrink-0 rounded-full bg-sky/50 dark:bg-sky/20 flex items-center justify-center text-sm shadow-2xs">
            🧒
          </div>
        </div>

        {/* Bloom's joyful celebration */}
        <div className="flex items-start gap-2.5 max-w-[90%]">
          <div className="size-7 shrink-0 rounded-full bg-mint/80 dark:bg-mint/30 flex items-center justify-center text-sm shadow-2xs">
            🌸
          </div>
          <div className="rounded-2xl rounded-tl-xs border border-primary/20 bg-mint/40 dark:bg-mint/15 p-3.5 text-sm sm:text-base font-medium text-foreground shadow-2xs">
            &ldquo;Spot on! Bright yellow like the warm sun! You are doing great! ⭐🌱&rdquo;
          </div>
        </div>
      </div>

      {/* Tap-to-talk sample pill buttons */}
      <div className="relative border-t border-border/70 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2 text-center sm:text-left">
          Fun Tap-to-Answer Choices for Little Fingers
        </p>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground shadow-2xs">
            <span>☀️</span>
            <span>Yellow like sun!</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky/40 bg-card px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground shadow-2xs">
            <span>🌊</span>
            <span>Blue like the sea!</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-lavender/50 bg-card px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-foreground shadow-2xs">
            <span>📖</span>
            <span>Tell me a story!</span>
          </span>
        </div>
      </div>
    </div>
  );
}
