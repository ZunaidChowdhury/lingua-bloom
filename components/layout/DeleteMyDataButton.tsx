"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { ApiError } from "@/lib/core/errors";
import { clearToken } from "@/lib/session/token";

export function DeleteMyDataButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    try {
      await deleteSession();
      clearToken();
      setOpen(false);
      router.replace("/start");
    } catch (caught) {
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
            className="text-muted-foreground hover:text-destructive"
          />
        }
      >
        Delete my data
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete my data?</DialogTitle>
          <DialogDescription>
            This removes the session token, nickname, answers, and chat text
            right away. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <DialogFooter>
          <DialogClose
            render={<Button variant="outline" disabled={deleting} />}
          >
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => void handleConfirm()}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
