"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }

  return (
    <footer className="border-t border-border/80 bg-background/60 py-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-muted-foreground">
          LinguaBloom — Little words. Big worlds. 🌸 Made with care for young learners.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/start"
                className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                href="/grown-ups"
                className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Safety
              </Link>
            </li>
            <li>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                How it works
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
