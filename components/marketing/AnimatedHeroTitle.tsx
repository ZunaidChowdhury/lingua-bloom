"use client";

export function AnimatedHeroTitle() {
  return (
    <h1
      className="relative font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl select-none"
      aria-label="Little words. Big worlds."
    >

      {/* "Little words." playful botanical green phrase */}
      <span className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
        <span className="inline-block animate-kid-bounce-1 text-primary">
          Little
        </span>{" "}
        <span className="inline-block animate-kid-bounce-2 text-primary">
          words.
        </span>
      </span>{" "}

      {/* "Big worlds." magical rainbow-botanical gradient phrase */}
      <span className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
        <span className="inline-block animate-kid-bounce-3 bg-gradient-to-r from-primary via-sky to-lavender dark:from-primary dark:via-sky dark:to-lavender bg-clip-text text-transparent animate-kid-shimmer font-black">
          Big
        </span>{" "}
        <span className="inline-block animate-kid-bounce-4 bg-gradient-to-r from-primary via-sky to-lavender dark:from-primary dark:via-sky dark:to-lavender bg-clip-text text-transparent animate-kid-shimmer font-black">
          worlds.
        </span>
      </span>

      {/* Blooming blossom celebration at the end */}
      <span
        aria-hidden="true"
        className="inline-block ml-1.5 sm:ml-2 animate-kid-wiggle text-2xl sm:text-4xl align-middle drop-shadow-xs"
      >
        🌸
      </span>
    </h1>
  );
}
