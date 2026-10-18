"use client";

import Image from "next/image";
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
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-4 py-8 sm:py-12">
      <section className="flex flex-col items-center gap-3 text-center">
        <div className="bloom-float relative size-20 rounded-3xl bg-card p-2 shadow-md ring-4 ring-mint/60">
          <Image
            src="/lingua-bloom-bot.png"
            alt="Bloom"
            width={72}
            height={72}
            priority
            className="size-full rounded-2xl object-contain drop-shadow-xs"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
            Ready to grow? 🌱
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Pick a garden buddy and an optional nickname. No real names needed!
          </p>
        </div>
      </section>

      {hasToken ? (
        <section className="flex flex-col gap-4 rounded-3xl border-2 border-border/80 bg-card p-6 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🌱</span>
            <p className="font-heading text-base font-bold text-foreground">
              Your garden is already blooming!
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/chat")}
            className="inline-flex min-h-16 items-center justify-center gap-2 rounded-full bg-primary px-8 font-heading text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-102 hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
          >
            <span>Continue Gardening</span>
            <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            onClick={handleStartFresh}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Start fresh with a new buddy
          </button>
        </section>
      ) : (
        <form onSubmit={handleStart} className="flex flex-col gap-6 rounded-3xl border-2 border-border/80 bg-card p-6 shadow-md">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname"
              className="text-sm font-bold text-foreground"
            >
              Nickname (optional) 🏷️
            </label>
            <input
              id="nickname"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              maxLength={NICKNAME_MAX}
              autoComplete="off"
              placeholder="e.g. Pip, Sunny, Bunny…"
              className="min-h-14 rounded-2xl border-2 border-border/80 bg-background px-4 text-base font-medium text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-foreground">
              Choose your buddy 🐾
            </legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AVATARS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={avatar === option.id}
                  onClick={() => setAvatar(option.id)}
                  className={`group flex min-h-24 flex-col items-center justify-center gap-1.5 rounded-3xl border-2 text-sm font-bold shadow-xs transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    avatar === option.id
                      ? "border-primary bg-secondary/80 text-foreground ring-4 ring-primary/20 scale-102"
                      : "border-border/80 bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="text-3xl transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100"
                  >
                    {option.emoji}
                  </span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {error ? (
            <p role="alert" className="rounded-2xl border border-destructive/20 bg-destructive/10 p-3.5 text-sm font-medium text-destructive">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-16 items-center justify-center gap-2 rounded-full bg-primary px-8 font-heading text-xl font-bold text-primary-foreground shadow-lg transition-all hover:scale-102 hover:shadow-xl active:scale-95 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
          >
            {submitting ? (
              <span>Growing garden…</span>
            ) : (
              <>
                <span>Let’s Bloom!</span>
                <span aria-hidden="true">🌸</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
