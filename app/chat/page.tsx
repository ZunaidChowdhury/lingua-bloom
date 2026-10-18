"use client";

import { useState } from "react";

import { apiMutate } from "@/lib/core/api-client";

type ChatRole = "child" | "bot";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type SliceTurnResponse = {
  messages: { role: "bot"; content: string }[];
  meta: { llm_ms: number; total_ms: number; fallback: boolean };
};

const GREETING: ChatMessage = {
  role: "bot",
  content: "Hi! I am Bloom. What would you like to talk about?",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) {
      return;
    }

    setMessages((current) => [...current, { role: "child", content: trimmed }]);
    setText("");
    setSending(true);
    setError(null);

    try {
      const data = await apiMutate<SliceTurnResponse>(
        "POST",
        "/v1/chat/turns",
        { text: trimmed },
      );
      const replies: ChatMessage[] = data.messages.map((message) => ({
        role: "bot",
        content: message.content,
      }));
      setMessages((current) => [...current, ...replies]);
    } catch {
      setError("I could not hear that. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold">Chat with Bloom</h1>

      <ul className="flex flex-1 flex-col gap-2" aria-live="polite">
        {messages.map((message, index) => (
          <li
            key={index}
            className={
              message.role === "child"
                ? "self-end rounded-2xl bg-sky-100 px-4 py-2"
                : "self-start rounded-2xl bg-emerald-100 px-4 py-2"
            }
          >
            {message.content}
          </li>
        ))}
      </ul>

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <form onSubmit={handleSend} className="flex gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Your message
        </label>
        <input
          id="chat-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={200}
          autoComplete="off"
          placeholder="Type a message"
          className="flex-1 rounded-xl border px-4 py-3"
        />
        <button
          type="submit"
          disabled={sending || text.trim().length === 0}
          className="min-h-11 rounded-xl bg-emerald-600 px-5 py-3 text-white disabled:opacity-50"
        >
          {sending ? "Sending" : "Send"}
        </button>
      </form>
    </div>
  );
}
