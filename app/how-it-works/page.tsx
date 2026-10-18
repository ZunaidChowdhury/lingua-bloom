import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, MessageCircle, Sparkles, Volume2, ShieldCheck, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — LinguaBloom",
  description:
    "Discover how LinguaBloom guides young children through learning English: interactive quizzes, 4 smart modes, 3 growing levels, and social-emotional safety.",
};

const STEPS = [
  {
    step: "1",
    title: "Pick an Avatar & Nickname",
    subtitle: "No passwords or emails required",
    description:
      "Start in seconds! Choose a cute mascot avatar and an optional nickname. No login, no personal details, and zero tracking — completely safe for young children.",
    badge: "Quick & Anonymous",
    emoji: "🌱",
    bg: "bg-mint/40 border-primary/20",
  },
  {
    step: "2",
    title: "Chat Freely with Bloom",
    subtitle: "Warm, short, child-friendly sentences",
    description:
      "Say 'hello', 'i like puppies', or ask 'what color is the sky?'. Bloom responds with friendly 1–2 sentence replies calibrated to your child's age limit.",
    badge: "Natural Conversation",
    emoji: "💬",
    bg: "bg-sky/30 border-sky/40",
  },
  {
    step: "3",
    title: "Play Quizzes with 4 Big Buttons",
    subtitle: "Say 'lets learn' or 'quiz me' anytime",
    description:
      "When it's time to learn, 4 large, colorful option buttons appear (A, B, C, D) with pictures and clear words. Tapping an answer checks it instantly with joyful praise!",
    badge: "Interactive Learning",
    emoji: "🎯",
    bg: "bg-sun/30 border-sun/50",
  },
  {
    step: "4",
    title: "Grow Your Plant & Level Up",
    subtitle: "Celebrate progress across 3 levels",
    description:
      "Each correct answer waters your garden plant. Reach 5 correct answers in a window to celebrate a delightful Level-Up from Seedling to Growing to Blooming!",
    badge: "Rewarding Growth",
    emoji: "🌸",
    bg: "bg-lavender/30 border-lavender/50",
  },
] as const;

const MODES = [
  {
    name: "Learning Mode",
    accent: "border-primary/40 bg-mint/30 dark:bg-mint/15",
    tag: "bg-primary text-white",
    icon: BookOpen,
    tagline: "Vocabulary, Opposites & Phonics",
    description:
      "Interactive 4-choice quizzes and spelling games. Designed with smart pacing — Bloom never quizzes more than 3 times in a row without a friendly break.",
    example: "What is the opposite of happy? [Sad] [Angry] [Silly] [Cold]",
  },
  {
    name: "Conversation Mode",
    accent: "border-sky/50 bg-sky/30 dark:bg-sky/15",
    tag: "bg-[#2587B8] text-white",
    icon: MessageCircle,
    tagline: "Friendly Everyday English",
    description:
      "Free-flowing, warm conversation about pets, food, family, and curiosity. Helps children build confidence speaking English without test pressure.",
    example: "Dogs love to run! 🐶 What is your favorite animal?",
  },
  {
    name: "Engagement Mode",
    accent: "border-sun/60 bg-sun/30 dark:bg-sun/15",
    tag: "bg-amber-600 text-white",
    icon: Sparkles,
    tagline: "Mini Stories, Riddles & Pretend Play",
    description:
      "Triggered when the child asks for a story or game. Bloom tells adorable 2-sentence stories or invites simple pretend-play adventures.",
    example: "Once, a small seed slept. 🌱 The sun said hello and it grew!",
  },
  {
    name: "Support Mode (SEL)",
    accent: "border-lavender/60 bg-lavender/30 dark:bg-lavender/15",
    tag: "bg-purple-600 text-white",
    icon: Heart,
    tagline: "Feelings, Calmness & Care",
    description:
      "When a child says 'i am sad' or 'i don't want to', learning pauses immediately. Bloom validates feelings, offers a slow breath, and suggests gentle choices.",
    example: "I am here with you. 💛 Let us take one slow breath together.",
  },
] as const;

const LEVELS = [
  {
    level: "Level 1 — Seedling",
    target: "Ages 3–4",
    limit: "Strictly up to 6 words per sentence",
    focus: "Concrete nouns, colors, animals, basic choices, high visual support.",
    color: "border-mint bg-mint/30 text-primary dark:bg-mint/10",
  },
  {
    level: "Level 2 — Growing",
    target: "Ages 5–6",
    limit: "Strictly up to 8 words per sentence",
    focus: "Simple action verbs, opposite pairs, phonics rhymes, short sentence building.",
    color: "border-sky bg-sky/30 text-sky-900 dark:bg-sky/10 dark:text-sky",
  },
  {
    level: "Level 3 — Blooming",
    target: "Ages 6–7",
    limit: "Strictly up to 12 words per sentence",
    focus: "Short story comprehension, creative answers, conversational fluency.",
    color: "border-lavender bg-lavender/30 text-purple-900 dark:bg-lavender/10 dark:text-lavender",
  },
] as const;

const FEATURES = [
  {
    icon: Volume2,
    title: "Audio Read-Aloud",
    description:
      "Every bot reply features a 1-tap speaker button. Bloom speaks aloud in clear, gentle English so pre-readers can follow along easily.",
  },
  {
    icon: ShieldCheck,
    title: "100% Kid Safety & Privacy",
    description:
      "Strict in-and-out filters block unsafe content. Personal details (names, emails, phones) are never logged, stored, or sent to third parties.",
  },
  {
    icon: Trash2,
    title: "Instant 'Delete My Data'",
    description:
      "Grown-ups have complete control. Tap 'Delete my data' in the navigation bar to immediately wipe all chat history, token, and progress.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-10 sm:py-16">
      {/* Hero Header */}
      <section className="flex flex-col items-center text-center gap-6">
        <div className="relative size-20 sm:size-24 rounded-full ring-4 ring-primary/30 p-1 bg-mint/40 shadow-md">
          <Image
            src="/lingua-bloom-bot.png"
            alt="Bloom mascot"
            width={96}
            height={96}
            className="size-full rounded-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center justify-center gap-2 mx-auto rounded-full border border-primary/30 bg-mint/40 px-4 py-1 text-xs sm:text-sm font-bold text-primary">
            <span>🌸</span>
            <span>Little words. Big worlds.</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            How LinguaBloom Works
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            LinguaBloom is an AI-powered English learning companion for children under 7. 
            Here is everything you need to know about how chatting, learning, and safety work together.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/start"
            className="cursor-pointer inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-heading text-base font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-102 hover:shadow-lg active:scale-95"
          >
            <span>Start Chatting Now</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/grown-ups"
            className="cursor-pointer inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-border/80 bg-card px-6 font-heading text-base font-semibold text-foreground transition-all hover:bg-muted"
          >
            <span>For Grown-ups</span>
          </Link>
        </div>
      </section>

      {/* 4-Step Walkthrough */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Step-by-Step Walkthrough
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            How a Learning Session Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Four simple steps from opening the app to celebrating your child&apos;s first words.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className={`relative flex flex-col gap-3 rounded-3xl border-2 p-6 shadow-xs transition-all hover:shadow-md ${item.bg}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-white dark:bg-card font-heading text-base font-extrabold text-foreground shadow-2xs">
                  #{item.step}
                </span>
                <span className="text-2xl" aria-hidden="true">
                  {item.emoji}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-primary">
                  {item.badge}
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Child Modes */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Child Mode Detection
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            4 Smart Modes: The Bot Does Not Only Teach
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            LinguaBloom dynamically adapts its response based on what your child says.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.name}
                className={`flex flex-col gap-3.5 rounded-3xl border-2 p-6 shadow-xs ${mode.accent}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-2xl bg-white dark:bg-card shadow-2xs">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {mode.name}
                    </h3>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${mode.tag}`}>
                    {mode.name.split(" ")[0]}
                  </span>
                </div>

                <p className="text-xs font-semibold text-primary">
                  {mode.tagline}
                </p>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {mode.description}
                </p>

                <div className="mt-auto rounded-2xl border border-border/80 bg-white/80 dark:bg-card/80 p-3 text-xs">
                  <span className="font-bold text-foreground">Bloom example: </span>
                  <span className="text-muted-foreground italic">&ldquo;{mode.example}&rdquo;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Progressive Levels */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Curriculum Structure
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            3 Progressive Levels of Learning
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Sentences strictly expand as children advance, keeping lessons clear and never overwhelming.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LEVELS.map((lvl) => (
            <div
              key={lvl.level}
              className={`flex flex-col gap-3 rounded-3xl border-2 p-6 shadow-xs ${lvl.color}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-heading text-lg font-bold">
                  {lvl.level}
                </h3>
                <span className="text-xs font-extrabold rounded-full bg-white/90 dark:bg-card/90 px-2.5 py-1 text-foreground shadow-2xs">
                  {lvl.target}
                </span>
              </div>
              <div className="rounded-xl bg-white/60 dark:bg-card/60 p-2 text-xs font-bold text-foreground">
                📏 {lvl.limit}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                {lvl.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Built-in Features */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Built-In Superpowers
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Accessibility & Privacy by Design
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex flex-col gap-3 rounded-3xl border-2 border-border/80 bg-card p-6 shadow-xs"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary/60 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="flex flex-col items-center text-center gap-5 rounded-3xl sm:rounded-[2.5rem] border-2 border-primary/30 bg-[#EBF7F0] p-8 sm:p-12 shadow-xl shadow-primary/10 dark:border-primary/40 dark:bg-[#152720]">
        <span className="text-4xl" aria-hidden="true">
          🌱
        </span>
        <div className="flex flex-col gap-2 max-w-xl">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-foreground">
            Ready to explore English with Bloom?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Start a cheerful session now. No registration, completely free, and built with love for young minds.
          </p>
        </div>
        <Link
          href="/start"
          className="cursor-pointer inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 font-heading text-base font-bold text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          <span>Get Started Free</span>
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
