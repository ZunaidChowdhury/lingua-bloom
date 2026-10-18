"use client";

import Link from "next/link";

import { BotanicalHero } from "@/components/marketing/BotanicalHero";
import { useWarmup } from "@/hooks/useWarmup";

const BENEFITS = [
  {
    title: "Three growing levels",
    body: "Start with first words, grow into short sentences, and bloom into little stories.",
    emoji: "🌱",
  },
  {
    title: "Safe and private",
    body: "No names, emails, or locations stored. Grown-ups can delete everything anytime.",
    emoji: "🔒",
  },
  {
    title: "Play and feelings",
    body: "Quizzes feel like games, and Bloom checks in on how your child is feeling.",
    emoji: "💛",
  },
] as const;

export default function Home() {
  useWarmup();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-12">
      <section className="flex flex-col items-center gap-6 text-center">
        <BotanicalHero className="w-full max-w-sm" />
        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
          Little words. Big worlds.
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          A gentle English-learning friend for children under 7. Bloom plays,
          teaches, and listens — one small step at a time.
        </p>
        <Link
          href="/start"
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-10 py-4 font-heading text-xl font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
        >
          Start
        </Link>
        <Link
          href="/grown-ups"
          className="inline-flex min-h-11 items-center rounded-lg text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          For grown-ups
        </Link>
      </section>

      <section
        aria-label="Why families choose LinguaBloom"
        className="grid w-full gap-4 sm:grid-cols-3"
      >
        {BENEFITS.map((benefit) => (
          <article
            key={benefit.title}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6"
          >
            <span aria-hidden="true" className="text-3xl">
              {benefit.emoji}
            </span>
            <h2 className="font-heading text-lg font-bold text-foreground">
              {benefit.title}
            </h2>
            <p className="text-sm text-muted-foreground">{benefit.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
