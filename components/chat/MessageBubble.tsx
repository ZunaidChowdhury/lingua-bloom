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
      <li className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-200">
        <p className="max-w-[85%] sm:max-w-[78%] rounded-3xl rounded-br-xs sm:rounded-br-sm bg-sky px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-[#0A1F16] dark:text-[#06140E] shadow-xs border border-sky-400/40">
          {message.content}
        </p>
      </li>
    );
  }

  return (
    <li className="flex items-end justify-start gap-2 sm:gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <SproutAvatar />
      <p className="max-w-[85%] sm:max-w-[78%] rounded-3xl rounded-bl-xs sm:rounded-bl-sm border-2 border-primary/20 dark:border-primary/30 bg-white dark:bg-[#1C2F27] px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-medium leading-relaxed text-foreground shadow-xs">
        {message.content}
      </p>
      <ReadAloudButton text={message.content} />
    </li>
  );
}
