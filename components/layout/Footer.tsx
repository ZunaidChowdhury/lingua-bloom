import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-4">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/grown-ups"
                className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                For grown-ups
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
