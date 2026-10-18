"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ChoiceGrid } from "@/components/chat/ChoiceGrid";
import { Composer } from "@/components/chat/Composer";
import { MessageList } from "@/components/chat/MessageList";
import { DataLoadFailed } from "@/components/feedback/DataLoadFailed";
import { LoadingGarden } from "@/components/feedback/LoadingGarden";
import { getSession } from "@/lib/api/getSession";
import { sendTurn } from "@/lib/actions/sendTurn";
import { ApiError } from "@/lib/core/errors";
import { clearToken } from "@/lib/session/token";
import type {
  ActivityPayload,
  GetSessionResponse,
  Message,
  Progress,
  Session,
  TurnInput,
  TurnResponse,
} from "@/lib/types";

type ChatState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      session: Session;
      messages: Message[];
      activity: ActivityPayload | null;
      progress: Progress;
      typing: boolean;
    };

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

export default function ChatPage() {
  const router = useRouter();
  const [state, setState] = useState<ChatState>({ status: "loading" });
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const applySession = useCallback((data: GetSessionResponse) => {
    setState({
      status: "ready",
      session: data.session,
      messages: data.messages,
      activity: data.activity,
      progress: data.progress,
      typing: false,
    });
  }, []);

  const handleFailure = useCallback(
    (error: unknown) => {
      if (error instanceof ApiError && error.status === 401) {
        clearToken();
        router.replace("/start");
        return;
      }
      setState({ status: "error" });
    },
    [router],
  );

  useEffect(() => {
    let cancelled = false;
    getSession()
      .then((data) => {
        if (!cancelled) {
          applySession(data);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          handleFailure(error);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [applySession, handleFailure]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    getSession().then(applySession).catch(handleFailure);
  }, [applySession, handleFailure]);

  const submitTurn = useCallback(
    async (input: TurnInput) => {
      if (state.status !== "ready" || pending) {
        return;
      }
      setPending(true);
      setSendError(null);
      setState({ ...state, typing: true });
      try {
        const response: TurnResponse = await sendTurn(input);
        setState((current) => {
          if (current.status !== "ready") {
            return current;
          }
          return {
            ...current,
            messages: [...current.messages, ...response.messages],
            activity: response.activity,
            progress: response.progress,
            typing: false,
          };
        });
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clearToken();
          router.replace("/start");
          return;
        }
        setState((current) =>
          current.status === "ready" ? { ...current, typing: false } : current,
        );
        setSendError("I could not hear that. Please try again.");
      } finally {
        setPending(false);
      }
    },
    [pending, router, state],
  );

  function handleSend() {
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      return;
    }
    setDraft("");
    void submitTurn({ text: trimmed });
  }

  function handleChoice(choiceId: string) {
    void submitTurn({ choice_id: choiceId });
  }

  if (state.status === "loading") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <LoadingGarden />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <DataLoadFailed onRetry={retry} />
      </div>
    );
  }

  const choices = pending ? null : activityChoices(state.activity);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-1 flex-col px-4 py-4">
      <h1 className="rounded-2xl border border-border bg-card px-4 py-3 text-center font-heading text-lg font-bold text-foreground">
        Chat with Bloom
        {state.session.nickname ? ` — hi, ${state.session.nickname}!` : ""}
      </h1>
      <MessageList messages={state.messages} typing={state.typing} />
      {choices && choices.length > 0 ? (
        <div className="border-t border-border py-3">
          <ChoiceGrid
            choices={choices}
            onSelect={handleChoice}
            disabled={pending}
            label="Pick an answer"
          />
        </div>
      ) : null}
      {sendError ? (
        <p role="alert" className="pb-2 text-sm text-destructive">
          {sendError}
        </p>
      ) : null}
      <Composer
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        pending={pending}
      />
    </div>
  );
}
