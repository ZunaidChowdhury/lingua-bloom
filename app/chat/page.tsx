"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChoiceGrid } from "@/components/chat/ChoiceGrid";
import { Composer } from "@/components/chat/Composer";
import { LevelBadge } from "@/components/chat/LevelBadge";
import { LevelUpCelebration } from "@/components/chat/LevelUpCelebration";
import { MessageList } from "@/components/chat/MessageList";
import { ModeChip } from "@/components/chat/ModeChip";
import { ProgressPlant } from "@/components/chat/ProgressPlant";
import { DataLoadFailed } from "@/components/feedback/DataLoadFailed";
import { LoadingGarden } from "@/components/feedback/LoadingGarden";
import { WakingUp } from "@/components/feedback/WakingUp";
import { childMessage, isBusy, useChat } from "@/hooks/useChat";
import { getSession } from "@/lib/api/getSession";
import { ApiError } from "@/lib/core/errors";
import { clearToken } from "@/lib/session/token";
import type { ActivityPayload, Message, Session } from "@/lib/types";

type Phase = "loading" | "error" | "ready";

function activityChoices(
  activity: ActivityPayload | null,
): { id: string; label: string; emoji: string | null }[] | null {
  if (!activity) {
    return null;
  }
  if (activity.type === "feeling_checkin") {
    return activity.choices.map((choice) => ({
      id: choice.id,
      label: choice.label,
      emoji: choice.emoji,
    }));
  }
  if (activity.type === "choice") {
    return activity.choices;
  }
  return null;
}

function lastMode(messages: Message[]) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const mode = messages[index].mode;
    if (mode !== null) {
      return mode;
    }
  }
  return null;
}

export default function ChatPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const [draft, setDraft] = useState("");

  const handleUnauthorized = useCallback(() => {
    clearToken();
    router.replace("/start");
  }, [router]);

  const { state, send, hydrate, dismissLevelUp } = useChat(handleUnauthorized);

  const load = useCallback(async () => {
    try {
      const data = await getSession();
      setSession(data.session);
      hydrate({
        messages: data.messages,
        activity: data.activity,
        progress: data.progress,
        mode: lastMode(data.messages),
      });
      setPhase("ready");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        handleUnauthorized();
        return;
      }
      setPhase("error");
    }
  }, [hydrate, handleUnauthorized]);

  useEffect(() => {
    let cancelled = false;
    getSession()
      .then((data) => {
        if (cancelled) {
          return;
        }
        setSession(data.session);
        hydrate({
          messages: data.messages,
          activity: data.activity,
          progress: data.progress,
          mode: lastMode(data.messages),
        });
        setPhase("ready");
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }
        if (error instanceof ApiError && error.status === 401) {
          handleUnauthorized();
          return;
        }
        setPhase("error");
      });
    return () => {
      cancelled = true;
    };
  }, [hydrate, handleUnauthorized]);

  function handleSend() {
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      return;
    }
    setDraft("");
    void send({ text: trimmed }, childMessage(trimmed));
  }

  function handleChoice(choiceId: string) {
    if (state.activity?.type === "feeling_checkin") {
      const feeling = state.activity.choices.find(
        (item) => item.id === choiceId,
      );
      void send(
        { feeling: choiceId },
        childMessage(feeling?.label ?? choiceId),
      );
      return;
    }
    const choice = activityChoices(state.activity)?.find(
      (item) => item.id === choiceId,
    );
    void send({ choice_id: choiceId }, childMessage(choice?.label ?? choiceId));
  }

  if (phase === "loading") {
    return (
      <div className="flex h-[calc(100dvh-3.85rem)] sm:h-[calc(100dvh-4.25rem)] flex-col items-center justify-center p-6">
        <LoadingGarden />
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="flex h-[calc(100dvh-3.85rem)] sm:h-[calc(100dvh-4.25rem)] flex-col items-center justify-center p-6">
        <DataLoadFailed onRetry={() => void load()} />
      </div>
    );
  }

  const pending = isBusy(state.status);
  const rateLimited = state.status === "error" && state.retryAfter !== null;
  const sendDisabled = pending || rateLimited;
  const choices =
    state.status === "idle" ? activityChoices(state.activity) : null;

  return (
    <div className="flex h-[calc(100dvh-3.85rem)] sm:h-[calc(100dvh-4.25rem)] max-h-[calc(100dvh-3.85rem)] sm:max-h-[calc(100dvh-4.25rem)] w-full flex-col items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden">
      {/* Framed Chat Box Container */}
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2.25rem] border-2 sm:border-3 border-primary/30 bg-[#EBF7F0] shadow-xl sm:shadow-2xl shadow-primary/10 dark:border-primary/40 dark:bg-[#152720]">
        {/* Fixed Chat Header */}
        <div
          className={`shrink-0 z-10 border-b-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 shadow-2xs backdrop-blur-md transition-colors ${
            state.mode === "support"
              ? "border-lavender/60 bg-lavender/25 dark:bg-lavender/15"
              : "border-primary/20 bg-white/95 dark:bg-[#1A2E26]/95"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative size-10 shrink-0">
                <Image
                  src="/lingua-bloom-bot.png"
                  alt="Bloom mascot"
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover shadow-xs ring-2 ring-primary/40 bg-secondary/50"
                  priority
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-primary dark:border-[#1A2E26]"
                  title="Bloom is active"
                  aria-hidden="true"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <h1 className="truncate font-heading text-base sm:text-lg font-extrabold tracking-tight text-foreground">
                  Chat with Bloom
                </h1>
                <span className="truncate text-xs font-semibold text-primary">
                  {session?.nickname ? `Hi, ${session.nickname}! 🌸` : "Little words. Big worlds. 🌱"}
                </span>
              </div>
            </div>

            {/* Badges on right side */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {state.mode ? <ModeChip mode={state.mode} /> : null}
              <LevelBadge level={state.progress.level} />
              <ProgressPlant progress={state.progress} />
            </div>
          </div>
        </div>

        {state.status === "levelUp" ? (
          <LevelUpCelebration
            level={state.progress.level}
            onDismiss={dismissLevelUp}
          />
        ) : null}

        {/* Scrollable Message List with Soft Botanical Gradient */}
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-[#F2FBF5]/90 via-[#EAF7F0]/80 to-[#F2FBF5]/90 dark:from-[#13221C] dark:via-[#162720] dark:to-[#13221C]">
          <MessageList messages={state.messages} typing={pending} />
        </div>

        {/* Fixed Activity / Quiz Options Dock (when active) */}
        {choices && choices.length > 0 ? (
          <div className="chat-scrollbar shrink-0 z-10 max-h-[40vh] overflow-y-auto border-t-2 border-primary/20 bg-white/95 px-3.5 sm:px-5 py-3 backdrop-blur-md dark:bg-[#1A2E26]/95">
            {state.activity && state.activity.type !== "feeling_checkin" ? (
              <div className="mb-2.5 rounded-2xl border-2 border-primary/25 bg-secondary/60 p-2.5 sm:p-3 text-center shadow-2xs">
                <p className="font-heading text-base sm:text-lg font-bold text-foreground">
                  {state.activity.emoji ? (
                    <span aria-hidden="true" className="mr-2 text-2xl align-middle">
                      {state.activity.emoji}
                    </span>
                  ) : null}
                  {state.activity.prompt}
                </p>
              </div>
            ) : null}
            <ChoiceGrid
              choices={choices}
              onSelect={handleChoice}
              disabled={sendDisabled}
              label="Pick an answer"
            />
          </div>
        ) : null}

        {/* Status / Waking / Send Error Banners */}
        {state.status === "waking" ? (
          <div className="shrink-0 border-t border-primary/20 bg-white px-4 py-2 dark:bg-[#1A2E26]">
            <WakingUp />
          </div>
        ) : null}

        {state.sendError ? (
          <div className="shrink-0 border-t border-destructive/20 bg-destructive/10 px-4 py-2">
            <p role="alert" className="text-xs sm:text-sm font-semibold text-destructive">
              {state.sendError}
            </p>
          </div>
        ) : null}

        {/* Fixed Bottom Input Box (Composer) */}
        <div className="shrink-0 z-10 border-t-2 border-primary/20 bg-white/95 px-3.5 sm:px-5 py-2.5 sm:py-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur-md dark:bg-[#1A2E26]/95">
          <Composer
            value={draft}
            onChange={setDraft}
            onSend={handleSend}
            pending={sendDisabled}
          />
        </div>
      </div>
    </div>
  );
}
