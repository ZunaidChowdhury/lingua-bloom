import Image from "next/image";
import Link from "next/link";

import { DeleteMyDataButton } from "@/components/layout/DeleteMyDataButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:py-3">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative size-10 shrink-0">
            <Image
              src="/lingua-bloom-bot.png"
              alt="LinguaBloom mascot"
              width={40}
              height={40}
              className="size-10 rounded-full object-cover shadow-xs ring-2 ring-primary/30 transition-transform group-hover:scale-105 motion-reduce:group-hover:scale-100"
              priority
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-heading text-xl font-bold tracking-tight text-foreground">
              LinguaBloom
            </span>
            <span className="truncate text-xs font-medium text-muted-foreground">
              Little words. Big worlds. 🌸
            </span>
          </div>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <DeleteMyDataButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
