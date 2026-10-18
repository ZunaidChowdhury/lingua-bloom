"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MessageList } from "@/components/chat/MessageList";
import { DataLoadFailed } from "@/components/feedback/DataLoadFailed";
import { LoadingGarden } from "@/components/feedback/LoadingGarden";
import { getSession } from "@/lib/api/getSession";
import { ApiError } from "@/lib/core/errors";
import { clearToken } from "@/lib/session/token";
import type {
  ActivityPayload,
  GetSessionResponse,
  Message,
  Progress,
  Session,
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

export default function ChatPage() {
  const router = useRouter();
  const [state, setState] = useState<ChatState>({ status: "loading" });

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

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-1 flex-col px-4 py-4">
      <h1 className="rounded-2xl border border-border bg-card px-4 py-3 text-center font-heading text-lg font-bold text-foreground">
        Chat with Bloom
        {state.session.nickname ? ` — hi, ${state.session.nickname}!` : ""}
      </h1>
      <MessageList messages={state.messages} typing={state.typing} />
    </div>
  );
}
