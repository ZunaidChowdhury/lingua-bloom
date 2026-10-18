"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { DeleteMyDataButton } from "@/components/layout/DeleteMyDataButton";
import { SettingsMenu } from "@/components/layout/SettingsMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "🏡" },
  { label: "Learn", href: "/start", icon: "🌱" },
  { label: "Safety", href: "/grown-ups", icon: "🛡️" },
  { label: "How it Works", href: "/how-it-works", icon: "🌸" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/start") {
    return pathname === "/start" || pathname === "/chat";
  }
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);


  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-white dark:bg-card/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:py-3">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-90"
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
            <span className="hidden lg:block truncate text-xs font-medium text-muted-foreground">
              Little words. Big worlds. 🌸
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`cursor-pointer inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary text-white dark:text-[#0A1B14] shadow-xs font-bold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
                }`}
              >
                <span aria-hidden="true" className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <SettingsMenu />

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="cursor-pointer inline-flex size-10 shrink-0 md:hidden items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen ? (
        <div className="md:hidden border-t border-border/70 bg-white/98 dark:bg-card/98 px-4 py-3 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`cursor-pointer flex min-h-11 items-center gap-3 rounded-2xl px-4 py-2.5 text-base font-semibold transition-all ${
                    active
                      ? "bg-primary text-white dark:text-[#0A1B14] font-bold shadow-xs"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span aria-hidden="true" className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="my-1.5 border-t border-border/70 pt-2 sm:hidden flex items-center justify-between">
              <DeleteMyDataButton />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
