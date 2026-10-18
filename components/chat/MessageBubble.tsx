import { ReadAloudButton } from "@/components/chat/ReadAloudButton";
import { SproutAvatar } from "@/components/chat/SproutAvatar";
import type { Message } from "@/lib/types";

export function MessageBubble({
  message,
}: {
  message: Pick<Message, "role" | "content">;
}) {
  if (!message.content || !message.content.trim()) {
    return null;
  }

  if (message.role === "child") {
    return (
      <li className="flex justify-end">
        <p className="max-w-[85%] rounded-3xl rounded-br-sm bg-sky px-4.5 py-3 text-base font-semibold text-foreground shadow-xs">
          {message.content}
        </p>
      </li>
    );
  }

  return (
    <li className="flex items-end justify-start gap-2.5">
      <SproutAvatar />
      <p className="max-w-[85%] rounded-3xl rounded-bl-sm border-2 border-border/70 bg-card px-4.5 py-3 text-base font-medium leading-relaxed text-foreground shadow-xs">
        {message.content}
      </p>
      <ReadAloudButton text={message.content} />
    </li>
  );
}
