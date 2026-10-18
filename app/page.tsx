"use client";

import Link from "next/link";

import { BotanicalHero } from "@/components/marketing/BotanicalHero";
import { useWarmup } from "@/hooks/useWarmup";

const LEVELS = [
  {
    level: "Level 1",
    name: "Seedling",
    emoji: "🌱",
    desc: "First words, fun sounds & friendly emojis",
    color: "border-mint/80 bg-mint/30 dark:bg-mint/10",
  },
  {
    level: "Level 2",
    name: "Growing",
    emoji: "🌿",
    desc: "Short sentences, easy choices & happy discoveries",
    color: "border-sky/80 bg-sky/30 dark:bg-sky/10",
  },
  {
    level: "Level 3",
    name: "Blooming",
    emoji: "🌸",
    desc: "Little stories, expressing feelings & blooming confidence",
    color: "border-lavender/80 bg-lavender/30 dark:bg-lavender/10",
  },
] as const;

const BENEFITS = [
  {
    title: "Three growing levels",
    body: "Start with first words, grow into short sentences, and bloom into little stories.",
    emoji: "🌱",
    accent: "bg-mint/40 dark:bg-mint/10 border-mint/70",
  },
  {
    title: "Safe and private",
    body: "No names, emails, or locations stored. Grown-ups can delete everything anytime.",
    emoji: "🔒",
    accent: "bg-sky/40 dark:bg-sky/10 border-sky/70",
  },
  {
    title: "Play and feelings",
    body: "Quizzes feel like games, and Bloom checks in on how your child is feeling.",
    emoji: "💛",
    accent: "bg-sun/40 dark:bg-sun/10 border-sun/70",
  },
] as const;

export default function Home() {
  useWarmup();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-14 px-4 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-mint/50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-xs">
          <span>🌱</span>
          <span>Gentle English Learning for Children Under 7</span>
        </div>

        <BotanicalHero className="w-full max-w-sm" />

        <div className="flex flex-col items-center gap-3">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Little words. Big worlds.
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground sm:text-xl">
            A gentle English-learning friend who listens, plays, and celebrates every little step — one word at a time.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          <Link
            href="/start"
            className="group inline-flex min-h-16 items-center justify-center gap-3 rounded-full bg-primary px-10 py-4 font-heading text-xl font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
          >
            <span>Start Learning</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
              🌱
            </span>
          </Link>
          <p className="text-xs text-muted-foreground">
            No signup needed · 100% kid-safe & private
          </p>
        </div>

        <Link
          href="/grown-ups"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span>For grown-ups</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 3 Step Learning Journey */}
      <section aria-label="Learning stages" className="w-full">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Step-by-Step Learning
          </span>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Watch your child bloom
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {LEVELS.map((item) => (
            <div
              key={item.level}
              className={`flex flex-col gap-2 rounded-3xl border-2 p-5 shadow-xs transition-transform hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${item.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className="rounded-full bg-card/80 px-2.5 py-0.5 text-xs font-bold text-foreground">
                  {item.level}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why families choose LinguaBloom */}
      <section
        aria-label="Why families choose LinguaBloom"
        className="grid w-full gap-5 sm:grid-cols-3"
      >
        {BENEFITS.map((benefit) => (
          <article
            key={benefit.title}
            className={`flex flex-col gap-3 rounded-3xl border-2 bg-card p-6 shadow-xs transition-all hover:shadow-md ${benefit.accent}`}
          >
            <span aria-hidden="true" className="text-3xl">
              {benefit.emoji}
            </span>
            <h2 className="font-heading text-xl font-bold text-foreground">
              {benefit.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
          </article>
        ))}
      </section>

      {/* Reassurance banner */}
      <section className="flex w-full flex-col items-center justify-between gap-4 rounded-3xl border-2 border-border/80 bg-card p-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-mint text-2xl">
            🛡️
          </span>
          <div className="flex flex-col">
            <h3 className="font-heading text-base font-bold text-foreground">
              Built with care for young learners
            </h3>
            <p className="text-xs text-muted-foreground">
              Never displays ads, never asks for personal info, and grown-ups stay in control.
            </p>
          </div>
        </div>
        <Link
          href="/grown-ups"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground hover:bg-card"
        >
          Learn more
        </Link>
      </section>
    </div>
  );
}
