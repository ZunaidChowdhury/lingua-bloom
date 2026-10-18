"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

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

export function DeleteMyDataButton({
  fullLabel = false,
}: {
  fullLabel?: boolean;
} = {}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    try {
      const token = getToken();
      if (token) {
        await deleteSession();
      }
      clearToken();
      setOpen(false);
      router.replace("/start");
    } catch (caught) {
      if (caught instanceof UnauthorizedError || caught instanceof NotFoundError) {
        clearToken();
        setOpen(false);
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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          setError(null);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete my data"
            className={
              fullLabel
                ? "cursor-pointer group inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 text-xs font-semibold text-muted-foreground shadow-2xs transition-all hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive active:scale-95"
                : "cursor-pointer group inline-flex size-9 min-[867px]:size-auto min-[867px]:min-h-9 items-center justify-center gap-1.5 rounded-full border border-border/70 bg-card/60 p-0 min-[867px]:px-3 text-xs font-semibold text-muted-foreground shadow-2xs transition-all hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive active:scale-95"
            }
          />
        }
      >
        <Trash2 className="size-4 min-[867px]:size-3.5 transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100" />
        <span className={fullLabel ? "inline" : "hidden min-[867px]:inline"}>
          Delete my data
        </span>
        {!fullLabel ? (
          <span className="sr-only min-[867px]:hidden">Delete my data</span>
        ) : null}
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
              This immediately removes your child’s session token, nickname, learning progress, and chat history from both your device and our server.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="rounded-2xl border border-border/60 bg-muted/40 p-3.5 text-xs leading-relaxed text-muted-foreground">
          🛡️ <strong className="text-foreground">Peace of mind:</strong> This completely resets Bloom’s memory so your family can start fresh anytime. This cannot be undone.
        </div>

        {error ? (
          <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs font-medium text-destructive">
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
  );
}
