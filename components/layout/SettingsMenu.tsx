"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteSession } from "@/lib/actions/deleteSession";
import { ApiError, NotFoundError, UnauthorizedError } from "@/lib/core/errors";
import { clearToken, getToken } from "@/lib/session/token";

export function SettingsMenu() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click-outside
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("pointerdown", handlePointerDown);
    }
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  // Close dropdown on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    try {
      const token = getToken();
      if (token) {
        await deleteSession();
      }
      clearToken();
      setDialogOpen(false);
      setMenuOpen(false);
      router.replace("/start");
    } catch (caught) {
      if (
        caught instanceof UnauthorizedError ||
        caught instanceof NotFoundError
      ) {
        clearToken();
        setDialogOpen(false);
        setMenuOpen(false);
        router.replace("/start");
        return;
      }
      setError(
        caught instanceof ApiError
          ? "We could not delete the data right now. Please try again."
          : "Something went wrong. Please try again.",
      );
      setDeleting(false);
    }
  }

  return (
    <div ref={menuRef} className="relative flex shrink-0 items-center">
      {/* Gear trigger button */}
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Settings"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="cursor-pointer inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/60 text-muted-foreground shadow-2xs transition-all hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Settings className="size-4.5 transition-transform duration-300 ease-in-out" style={{ transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)" }} />
      </button>

      {/* Dropdown panel */}
      {menuOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[13rem] rounded-2xl border border-border/80 bg-white dark:bg-card shadow-xl ring-1 ring-black/5 dark:ring-white/5 p-1.5 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150"
        >
          {/* Settings label */}
          <p className="px-3 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 select-none">
            Settings
          </p>

          {/* Delete my data item — opens dialog */}
          <Dialog
            open={dialogOpen}
            onOpenChange={(next) => {
              setDialogOpen(next);
              if (next) {
                setError(null);
                setMenuOpen(false);
              }
            }}
          >
            <DialogTrigger
              render={
                <button
                  type="button"
                  role="menuitem"
                  className="cursor-pointer group flex w-full min-h-10 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:bg-destructive/10 focus-visible:text-destructive"
                />
              }
            >
              <Trash2 className="size-4 shrink-0 transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100" />
              <span>Delete my data</span>
            </DialogTrigger>

            <DialogContent className="max-w-md rounded-3xl border-2 border-border/80 p-6 shadow-xl">
              <DialogHeader className="gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                  <Trash2 className="size-6" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <DialogTitle className="font-heading text-xl font-bold text-foreground">
                    Delete my data?
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                    This immediately removes your child&apos;s session token,
                    nickname, learning progress, and chat history from both your
                    device and our server.
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="rounded-2xl border border-border/60 bg-muted/40 p-3.5 text-xs leading-relaxed text-muted-foreground">
                🛡️{" "}
                <strong className="text-foreground">Peace of mind:</strong> This
                completely resets Bloom&apos;s memory so your family can start
                fresh anytime. This cannot be undone.
              </div>

              {error ? (
                <p
                  role="alert"
                  className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs font-medium text-destructive"
                >
                  {error}
                </p>
              ) : null}

              <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <DialogClose
                  render={
                    <Button
                      variant="outline"
                      disabled={deleting}
                      className="cursor-pointer min-h-11 rounded-full px-5 text-sm font-semibold"
                    />
                  }
                >
                  Cancel
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={() => void handleConfirm()}
                  disabled={deleting}
                  className="cursor-pointer min-h-11 rounded-full px-6 text-sm font-bold shadow-md hover:shadow-lg active:scale-95 motion-reduce:hover:scale-100"
                >
                  {deleting ? "Deleting…" : "Yes, delete everything"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
}
