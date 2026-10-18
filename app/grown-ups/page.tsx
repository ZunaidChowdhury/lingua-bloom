import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For grown-ups — LinguaBloom",
  description:
    "What LinguaBloom stores, what it never collects, how safety works, and how to delete your child's data.",
};

const STORED = [
  {
    title: "A random session token",
    body: "Each chat gets an anonymous, random token. It is stored as a secure hash, not as readable text, and it expires after 30 days.",
  },
  {
    title: "An optional nickname",
    body: "You can skip it, or pick a silly one. It is limited to 20 characters, checked by the same safety rules, and never has to be a real name.",
  },
  {
    title: "Learning answers and chat text",
    body: "We keep what your child says and answers so Bloom can remember progress and carry on the conversation. Everything is deleted after 30 days.",
  },
] as const;

const NOT_STORED = [
  "Real names",
  "Email addresses",
  "Locations",
  "Photos",
] as const;

const SAFETY = [
  {
    title: "Gentle limits",
    body: "Messages are capped at 200 characters, replies are short and age-appropriate, and rate limits keep chat calm and steady.",
  },
  {
    title: "Filters on the way in and out",
    body: "Every message is cleaned and checked before it reaches the AI, and every reply is filtered before your child sees it. Unsafe content, links, and requests for personal details are blocked.",
  },
  {
    title: "Safe fallbacks",
    body: "If the AI is slow or unsure, Bloom answers with a friendly built-in message instead. The bot never asks for personal information, and it gently redirects if any is shared.",
  },
] as const;

function SectionHeading({
  id,
  emoji,
  title,
  intro,
}: {
  id: string;
  emoji: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2
        id={id}
        className="flex items-center gap-3 font-heading text-2xl font-bold text-foreground"
      >
        <span aria-hidden="true" className="text-3xl">
          {emoji}
        </span>
        {title}
      </h2>
      <p className="max-w-2xl text-muted-foreground">{intro}</p>
    </div>
  );
}

export default function GrownUpsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12">
      <section className="flex max-w-2xl flex-col gap-4">
        <h1 className="font-heading text-4xl font-bold text-foreground">
          For grown-ups
        </h1>
        <p className="text-lg text-muted-foreground">
          LinguaBloom is built for children under 7. Here is exactly what it
          stores, what it never collects, how safety works, and how to remove
          your child&apos;s data.
        </p>
      </section>

      <section aria-labelledby="stored-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="stored-heading"
          emoji="📦"
          title="What is stored"
          intro="Only what is needed to keep a conversation going and remember progress."
        />
        <ul className="grid w-full gap-4 sm:grid-cols-3">
          {STORED.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-heading text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Chat content is never written to logs, and nothing is shared with
          advertisers or other third parties.
        </p>
      </section>

      <section
        aria-labelledby="not-stored-heading"
        className="flex flex-col gap-4"
      >
        <SectionHeading
          id="not-stored-heading"
          emoji="🚫"
          title="What is never stored"
          intro="LinguaBloom does not collect personal identifiers from children."
        />
        <ul className="flex flex-wrap gap-3">
          {NOT_STORED.map((item) => (
            <li
              key={item}
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-secondary px-5 py-2 font-semibold text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          If a child shares something personal in chat, Bloom gently redirects
          and the text is redacted before it is stored.
        </p>
      </section>

      <section aria-labelledby="safety-heading" className="flex flex-col gap-4">
        <SectionHeading
          id="safety-heading"
          emoji="🛡️"
          title="How safety works"
          intro="Safety rules run in Python around the AI, so the experience stays kind and predictable."
        />
        <ul className="grid w-full gap-4 sm:grid-cols-3">
          {SAFETY.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-heading text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="delete-heading"
        className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
      >
        <SectionHeading
          id="delete-heading"
          emoji="🗑️"
          title="How to delete data"
          intro="Everything tied to a chat session can be removed in one tap."
        />
        <ol className="flex list-decimal flex-col gap-3 pl-5 text-muted-foreground">
          <li>Open the chat on the device your child used.</li>
          <li>
            Tap <strong className="text-foreground">Delete my data</strong>.
          </li>
          <li>
            The session token, nickname, answers, and chat text are erased
            right away and stop being retained.
          </li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Sessions also expire on their own after 30 days, so anything left
          behind is removed automatically.
        </p>
      </section>
    </div>
  );
}
