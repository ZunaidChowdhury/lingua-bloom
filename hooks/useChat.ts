"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

import { sendTurn } from "@/lib/actions/sendTurn";
import {
  ApiError,
  NetworkError,
  RateLimitedError,
  TimeoutError,
} from "@/lib/core/errors";
import type {
  ActivityPayload,
  Message,
  Mode,
  Progress,
  TurnInput,
  TurnResponse,
} from "@/lib/types";

const WAKE_AFTER_MS = 3_000;
const DEFAULT_RETRY_AFTER_S = 5;

export type ChatStatus = "idle" | "sending" | "waking" | "error" | "levelUp";

export type ChatData = {
  messages: Message[];
  activity: ActivityPayload | null;
  progress: Progress;
  mode: Mode | null;
};

export type ChatState = ChatData & {
  status: ChatStatus;
  sendError: string | null;
  retryAfter: number | null;
};

export type ChatAction =
  | { type: "hydrate"; data: ChatData }
  | { type: "send"; message: Message }
  | { type: "wake" }
  | { type: "receive"; response: TurnResponse }
  | { type: "fail"; message: string; retryAfter: number | null }
  | { type: "enable" }
  | { type: "dismissLevelUp" };

export function initialChatState(): ChatState {
  return {
    status: "idle",
    messages: [],
    activity: null,
    progress: { level: 1, correct_in_window: 0, window: 5, required: 5 },
    mode: null,
    sendError: null,
    retryAfter: null,
  };
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        ...action.data,
        status: "idle",
        sendError: null,
        retryAfter: null,
      };
    case "send": {
      if (
        state.status === "sending" ||
        state.status === "waking" ||
        (state.status === "error" && state.retryAfter !== null)
      ) {
        return state;
      }
      return {
        ...state,
        status: "sending",
        messages: [...state.messages, action.message],
        sendError: null,
        retryAfter: null,
      };
    }
    case "wake":
      if (state.status !== "sending") {
        return state;
      }
      return { ...state, status: "waking" };
    case "receive": {
      if (state.status !== "sending" && state.status !== "waking") {
        return state;
      }
      const levelUp = action.response.level_up === true;
      return {
        ...state,
        status: levelUp ? "levelUp" : "idle",
        messages: [...state.messages, ...action.response.messages],
        activity: action.response.activity,
        progress: action.response.progress,
        mode: action.response.mode,
        sendError: null,
        retryAfter: null,
      };
    }
    case "fail":
      if (state.status !== "sending" && state.status !== "waking") {
        return state;
      }
      return {
        ...state,
        status: "error",
        sendError: action.message,
        retryAfter: action.retryAfter,
      };
    case "enable":
      if (state.status !== "error") {
        return state;
      }
      return { ...state, status: "idle", sendError: null, retryAfter: null };
    case "dismissLevelUp":
      if (state.status !== "levelUp") {
        return state;
      }
      return { ...state, status: "idle" };
    default:
      return state;
  }
}

let optimisticId = 0;

function nextOptimisticId(): number {
  optimisticId -= 1;
  return optimisticId;
}

export function childMessage(content: string): Message {
  return { id: nextOptimisticId(), role: "child", content, mode: null };
}

export function isBusy(status: ChatStatus): boolean {
  return status === "sending" || status === "waking" || status === "levelUp";
}

export function useChat(onUnauthorized: () => void) {
  const [state, dispatch] = useReducer(
    chatReducer,
    undefined,
    initialChatState,
  );
  const retriedRef = useRef(false);
  const busyRef = useRef(false);
  const authCallbackRef = useRef(onUnauthorized);
  const stateRef = useRef(state);

  useEffect(() => {
    authCallbackRef.current = onUnauthorized;
  }, [onUnauthorized]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (state.status !== "sending") {
      return;
    }
    const timer = window.setTimeout(
      () => dispatch({ type: "wake" }),
      WAKE_AFTER_MS,
    );
    return () => window.clearTimeout(timer);
  }, [state.status]);

  useEffect(() => {
    if (state.status !== "error" || state.retryAfter === null) {
      return;
    }
    const timer = window.setTimeout(
      () => dispatch({ type: "enable" }),
      state.retryAfter * 1_000,
    );
    return () => window.clearTimeout(timer);
  }, [state.status, state.retryAfter]);

  const hydrate = useCallback((data: ChatData) => {
    dispatch({ type: "hydrate", data });
  }, []);

  const dismissLevelUp = useCallback(() => {
    dispatch({ type: "dismissLevelUp" });
  }, []);

  const send = useCallback(
    async (input: TurnInput, optimistic: Message) => {
      const current = stateRef.current;
      if (
        busyRef.current ||
        isBusy(current.status) ||
        (current.status === "error" && current.retryAfter !== null)
      ) {
        return;
      }
      busyRef.current = true;
      dispatch({ type: "send", message: optimistic });
      retriedRef.current = false;

      async function attempt(allowRetry: boolean): Promise<void> {
        try {
          const response = await sendTurn(input);
          dispatch({ type: "receive", response });
        } catch (error) {
          if (
            allowRetry &&
            !retriedRef.current &&
            (error instanceof NetworkError || error instanceof TimeoutError)
          ) {
            retriedRef.current = true;
            await attempt(false);
            return;
          }
          if (error instanceof ApiError && error.status === 401) {
            authCallbackRef.current();
            return;
          }
          if (error instanceof RateLimitedError) {
            dispatch({
              type: "fail",
              message:
                error.message || "Too many tries. Let us pause for a moment.",
              retryAfter: error.retryAfter ?? DEFAULT_RETRY_AFTER_S,
            });
            return;
          }
          dispatch({
            type: "fail",
            message: "I could not hear that. Please try again.",
            retryAfter: null,
          });
        }
      }

      try {
        await attempt(true);
      } finally {
        busyRef.current = false;
      }
    },
    [],
  );

  return { state, send, hydrate, dismissLevelUp };
}
