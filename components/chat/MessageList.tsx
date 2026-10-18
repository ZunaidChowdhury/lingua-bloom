"use client";

import { useEffect, useRef } from "react";

import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import type { Message } from "@/lib/types";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MessageList({
  messages,
  typing,
}: {
  messages: Message[];
  typing: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, typing]);

  return (
    <div
      className="flex flex-1 flex-col overflow-y-auto px-1 py-2"
      role="log"
      aria-label="Conversation with Bloom"
    >
      <ul className="flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ul>
      {typing ? (
        <div className="flex items-end justify-start pt-3 pl-11">
          <TypingIndicator />
        </div>
      ) : null}
      <div ref={endRef} />
    </div>
  );
}
