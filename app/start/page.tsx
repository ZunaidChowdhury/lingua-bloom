"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useSyncExternalStore, useState } from "react";

import { createSession } from "@/lib/actions/createSession";
import { ApiError } from "@/lib/core/errors";
import { clearToken, getToken, setToken } from "@/lib/session/token";
import type { Avatar } from "@/lib/types";

const AVATARS: { id: Avatar; emoji: string; label: string }[] = [
  { id: "sprout", emoji: "🌱", label: "Sprout" },
  { id: "sun", emoji: "☀️", label: "Sun" },
  { id: "cloud", emoji: "☁️", label: "Cloud" },
  { id: "butterfly", emoji: "🦋", label: "Butterfly" },
];

const NICKNAME_MAX = 20;

const emptySubscribe = () => () => {};

function useHasToken(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => getToken() !== null,
    () => false,
  );
}

export default function StartPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<Avatar>("sprout");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const hasToken = useHasToken();

  async function handleStart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = nickname.trim();
    if (trimmed.length > NICKNAME_MAX) {
      setError("That nickname is a little long. Please use 20 letters or fewer.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await createSession({
        nickname: trimmed === "" ? null : trimmed,
        avatar,
      });
      setToken(result.session_token);
      router.push("/chat");
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : "We could not start the garden. Please try again.",
      );
      setSubmitting(false);
    }
  }

  function handleStartFresh() {
    clearToken();
    window.location.reload();
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-4 py-12">
      <section className="flex flex-col gap-2 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Ready to grow?
        </h1>
        <p className="text-muted-foreground">
          Pick a buddy and optionally a nickname. No real names needed — a silly
          nickname is perfect.
        </p>
      </section>

      {hasToken ? (
        <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Your garden is still here.
          </p>
          <button
            type="button"
            onClick={() => router.push("/chat")}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 font-heading text-lg font-bold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleStartFresh}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-8 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Start fresh
          </button>
        </section>
      ) : (
        <form onSubmit={handleStart} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname"
              className="text-sm font-semibold text-foreground"
            >
              Nickname (optional)
            </label>
            <input
              id="nickname"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              maxLength={NICKNAME_MAX}
              autoComplete="off"
              placeholder="Bee"
              className="min-h-12 rounded-xl border border-border bg-card px-4 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-semibold text-foreground">
              Choose your buddy
            </legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AVATARS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={avatar === option.id}
                  onClick={() => setAvatar(option.id)}
                  className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    avatar === option.id
                      ? "border-primary bg-secondary text-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span aria-hidden="true" className="text-3xl">
                    {option.emoji}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          {error ? (
            <p role="alert" className="rounded-xl bg-card p-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 font-heading text-lg font-bold text-primary-foreground disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {submitting ? "Starting…" : "Start"}
          </button>
        </form>
      )}
    </div>
  );
}
