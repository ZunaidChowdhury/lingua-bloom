"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Heart, MessageCircle, Sparkles } from "lucide-react";

import { AnimatedHeroTitle } from "@/components/marketing/AnimatedHeroTitle";
import { BotanicalHero } from "@/components/marketing/BotanicalHero";
import { ChatDemoCard } from "@/components/marketing/ChatDemoCard";
import { useWarmup } from "@/hooks/useWarmup";

const LEVELS = [
  {
    level: "Level 1",
    name: "Seedling",
    age: "Ages 3–4",
    emoji: "🌱",
    desc: "First words, cheerful sounds, and simple picture matching.",
    examples: ["Cat 🐱", "Sun ☀️", "Apple 🍎", "Happy 😊"],
    cardBg: "from-mint/50 via-mint/20 to-card dark:from-mint/20 dark:to-card",
    badgeBg: "bg-mint text-primary border-mint/80",
    border: "border-mint/90 dark:border-mint/50",
  },
  {
    level: "Level 2",
    name: "Growing",
    age: "Ages 4–5",
    emoji: "🌿",
    desc: "Short sentences, easy choices, and exploring the world together.",
    examples: ["The dog runs 🐶", "Blue bird 🐦", "Big tree 🌳", "I like toys 🧸"],
    cardBg: "from-sky/40 via-sky/15 to-card dark:from-sky/20 dark:to-card",
    badgeBg: "bg-sky text-sky-950 dark:text-sky-200 border-sky/80",
    border: "border-sky/90 dark:border-sky/50",
  },
  {
    level: "Level 3",
    name: "Blooming",
    age: "Ages 5–7",
    emoji: "🌸",
    desc: "Little stories, expressing feelings, and blooming with confidence.",
    examples: ["I feel brave! ⭐", "Story time 📖", "My family 🏡", "Green garden 🌻"],
    cardBg: "from-lavender/40 via-lavender/15 to-card dark:from-lavender/20 dark:to-card",
    badgeBg: "bg-lavender text-purple-950 dark:text-purple-200 border-lavender/80",
    border: "border-lavender/90 dark:border-lavender/50",
  },
] as const;

const MODES = [
  {
    title: "Learning",
    icon: BookOpen,
    emoji: "🎓",
    badge: "Bite-Sized Quizzes",
    accent: "bg-mint/40 dark:bg-mint/15 border-mint/70 text-primary",
    desc: "Gentle picture-and-word puzzles. Every answer is met with cheerful praise — never 'wrong'.",
  },
  {
    title: "Conversation",
    icon: MessageCircle,
    emoji: "💬",
    badge: "Friendly Chat",
    accent: "bg-sky/40 dark:bg-sky/15 border-sky/70 text-sky-800 dark:text-sky-300",
    desc: "Free-flowing friendly chats about pets, favorite colors, snack time, and tomorrow's adventures.",
  },
  {
    title: "Play & Stories",
    icon: Sparkles,
    emoji: "🎈",
    badge: "Imagination & Fun",
    accent: "bg-sun/40 dark:bg-sun/15 border-sun/70 text-amber-900 dark:text-sun",
    desc: "Silly animal sounds, nursery rhymes, and mini bedtime stories that spark a love of language.",
  },
  {
    title: "Care & Support",
    icon: Heart,
    emoji: "💛",
    badge: "Feelings & Comfort",
    accent: "bg-lavender/40 dark:bg-lavender/15 border-lavender/70 text-purple-900 dark:text-lavender",
    desc: "A warm listening ear when feeling shy, sleepy, or sad. Calming words and gentle encouragement.",
  },
] as const;

const PARENT_PROMISES = [
  {
    title: "Zero Personal Data",
    desc: "No names, emails, passwords, or locations. Totally anonymous sessions.",
    emoji: "🔒",
    accent: "bg-mint/30 dark:bg-mint/10 border-mint/60",
  },
  {
    title: "Effort-Based Praise",
    desc: "Bloom never says a child is 'wrong' — every attempt is praised to build confidence.",
    emoji: "🌟",
    accent: "bg-sun/30 dark:bg-sun/10 border-sun/60",
  },
  {
    title: "Instant Reset Control",
    desc: "Delete your child's chat history and progress anytime with 1 click in settings.",
    emoji: "🛡️",
    accent: "bg-sky/30 dark:bg-sky/10 border-sky/60",
  },
] as const;

export default function Home() {
  useWarmup();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 sm:gap-20 px-4 py-8 sm:py-12">
      {/* 1. Hero Section */}
      <section className="flex flex-col items-center gap-6 text-center">
        {/* Subtle top chip */}
        <div className="inline-flex items-center rounded-full border-2 border-primary/25 bg-gradient-to-r from-mint/60 via-mint/40 to-sky/30 dark:from-mint/20 dark:to-sky/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary shadow-2xs backdrop-blur-xs">
          <span>AI-Powered English Learning Chatbot</span>
        </div>

        {/* Mascot Bot with friendly speech bubble */}
        <BotanicalHero className="w-full max-w-sm" />

        {/* Hero Title & Description */}
        <div className="flex flex-col items-center gap-3">
          <AnimatedHeroTitle />
          <p className="max-w-lg text-lg text-muted-foreground sm:text-xl font-medium leading-relaxed">
            A gentle English-learning friend who listens, plays, and celebrates every little step — one word at a time.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <Link
            href="/start"
            className="group relative inline-flex min-h-16 items-center justify-center gap-3 rounded-full bg-primary px-10 py-4 font-heading text-xl font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
          >
            <span>Start Learning</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            >
              🌱
            </span>
          </Link>
          <p className="text-xs font-medium text-muted-foreground">
            No signup needed · 100% kid-safe & private
          </p>
        </div>

        <Link
          href="/grown-ups"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span>For grown-ups & safety</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>

      {/* 2. Interactive Chat Demo Preview */}
      <section aria-label="Live preview of Bloom" className="w-full">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          <span className="rounded-full bg-mint/50 dark:bg-mint/20 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            🌸 Live Look at Bloom
          </span>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Gentle conversations kids love
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            No timers, no penalties, and no stress. Just warm words, big smiles, and playful tap-to-answer choices!
          </p>
        </div>
        <ChatDemoCard />
      </section>

      {/* 3. Three Step Learning Journey */}
      <section aria-label="Learning stages" className="w-full">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          <span className="rounded-full bg-sky/40 dark:bg-sky/20 border border-sky/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
            🌱 Growing Together
          </span>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Watch your child bloom step by step
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Bloom automatically adapts difficulty as your child learns, never pushing beyond their comfort zone.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {LEVELS.map((item) => (
            <div
              key={item.level}
              className={`flex flex-col justify-between gap-4 rounded-4xl border-3 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md bg-gradient-to-b ${item.cardBg} ${item.border}`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-card/90 border border-border/60 px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
                      {item.age}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border shadow-2xs ${item.badgeBg}`}>
                      {item.level}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Sample vocabulary pill chips */}
              <div className="border-t border-border/50 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Words they learn:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full bg-card/90 dark:bg-card/70 border border-border/70 px-2.5 py-1 text-xs font-semibold text-foreground shadow-2xs"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The 4 Modes of Bloom (Learning, Conversation, Play, Support) */}
      <section aria-label="Bloom's 4 Modes" className="w-full">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          <span className="rounded-full bg-sun/40 dark:bg-sun/20 border border-sun/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-sun">
            ⭐ 4 Gentle Modes
          </span>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Bloom is more than just a teacher
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Bloom senses when a child wants to play, learn, or simply needs a kind friend.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map((mode) => (
            <div
              key={mode.title}
              className={`flex flex-col justify-between gap-3 rounded-3xl border-2 p-5 shadow-2xs transition-all hover:scale-[1.02] ${mode.accent}`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl" aria-hidden="true">
                    {mode.emoji}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-card/80 rounded-full px-2 py-0.5 text-foreground border border-border/50">
                    {mode.badge}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {mode.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {mode.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Reassurance & Safety Promises */}
      <section aria-label="Safety & Privacy Promises" className="w-full">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          <span className="rounded-full bg-lavender/40 dark:bg-lavender/20 border border-lavender/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-lavender">
            🛡️ Safe for Young Minds
          </span>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Built with care for young learners
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Strict safety, no ads, and complete privacy built into every single turn.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {PARENT_PROMISES.map((item) => (
            <article
              key={item.title}
              className={`flex flex-col gap-3 rounded-3xl border-2 bg-card p-6 shadow-xs transition-all hover:shadow-md ${item.accent}`}
            >
              <span aria-hidden="true" className="text-3xl">
                {item.emoji}
              </span>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Bottom Storybook Call to Action */}
      <section className="relative w-full overflow-hidden rounded-4xl border-3 border-primary/30 bg-gradient-to-r from-mint/50 via-card to-sky/40 dark:from-mint/15 dark:via-card dark:to-sky/15 p-8 sm:p-10 text-center shadow-lg">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
          <span className="text-4xl" aria-hidden="true">
            🌸🌱✨
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Ready to watch your little one bloom?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            No registration, no credit cards, no passwords. Just choose a friendly nickname and start exploring together in seconds.
          </p>
          <div className="pt-2">
            <Link
              href="/start"
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-heading text-lg font-bold text-primary-foreground shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:hover:scale-100"
            >
              <span>Meet Bloom Today</span>
              <span aria-hidden="true">🌱</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
