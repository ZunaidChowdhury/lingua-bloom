"use client";

import { useCallback, useEffect, useState } from "react";
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
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <LoadingGarden />
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6">
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
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-1 flex-col px-4 py-4">
      <div
        className={`flex flex-wrap items-center justify-center gap-2 rounded-2xl border px-4 py-3 ${
          state.mode === "support"
            ? "border-lavender bg-lavender/30"
            : "border-border bg-card"
        }`}
      >
        <h1 className="font-heading text-lg font-bold text-foreground">
          Chat with Bloom
          {session?.nickname ? ` — hi, ${session.nickname}!` : ""}
        </h1>
        {state.mode ? <ModeChip mode={state.mode} /> : null}
        <LevelBadge level={state.progress.level} />
        <ProgressPlant progress={state.progress} />
      </div>

      {state.status === "levelUp" ? (
        <LevelUpCelebration
          level={state.progress.level}
          onDismiss={dismissLevelUp}
        />
      ) : null}

      <MessageList messages={state.messages} typing={pending} />

      {choices && choices.length > 0 ? (
        <div className="border-t border-border py-3">
          <ChoiceGrid
            choices={choices}
            onSelect={handleChoice}
            disabled={sendDisabled}
            label="Pick an answer"
          />
        </div>
      ) : null}

      {state.status === "waking" ? (
        <div className="border-t border-border pt-3">
          <WakingUp />
        </div>
      ) : null}

      {state.sendError ? (
        <p role="alert" className="pb-2 text-sm text-destructive">
          {state.sendError}
        </p>
      ) : null}

      <Composer
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        pending={sendDisabled}
      />
    </div>
  );
}
