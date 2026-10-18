import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-heading text-xl font-bold text-foreground">
            LinguaBloom
          </span>
          <span className="truncate text-sm text-muted-foreground">
            Little words. Big worlds.
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
