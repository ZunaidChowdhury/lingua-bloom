import { ReadAloudButton } from "@/components/chat/ReadAloudButton";
import { SproutAvatar } from "@/components/chat/SproutAvatar";
import type { Message } from "@/lib/types";

export function MessageBubble({
  message,
}: {
  message: Pick<Message, "role" | "content">;
}) {
  if (message.role === "child") {
    return (
      <li className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-sky px-4 py-2.5 text-foreground">
          {message.content}
        </p>
      </li>
    );
  }

  return (
    <li className="flex items-end justify-start gap-2">
      <SproutAvatar />
      <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-secondary px-4 py-2.5 text-foreground">
        {message.content}
      </p>
      <ReadAloudButton text={message.content} />
    </li>
  );
}
