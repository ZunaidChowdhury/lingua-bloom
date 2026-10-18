import { describe, expect, it } from "vitest";

import {
  chatReducer,
  childMessage,
  initialChatState,
  type ChatState,
} from "@/hooks/useChat";
import type { Message, TurnResponse } from "@/lib/types";

function botMessage(id: number, content: string): Message {
  return { id, role: "bot", content, mode: "learning" };
}

function turnResponse(overrides: Partial<TurnResponse> = {}): TurnResponse {
  return {
    messages: [
      { id: 1, role: "child", content: "hello", mode: null },
      botMessage(2, "Nice try!"),
    ],
    mode: "learning",
    level: 2,
    level_up: null,
    feedback: { result: null, hint: null },
    activity: null,
    progress: { level: 2, correct_in_window: 3, window: 5, required: 5 },
    meta: { fallback: false, llm_ms: 10, total_ms: 20, request_id: "r1" },
    ...overrides,
  };
}

function sendingState(): ChatState {
  return chatReducer(initialChatState(), {
    type: "send",
    message: childMessage("hello"),
  });
}

describe("chatReducer", () => {
  it("hydrates data and resets to idle", () => {
    const state = chatReducer(initialChatState(), {
      type: "hydrate",
      data: {
        messages: [botMessage(1, "hi")],
        activity: null,
        progress: { level: 1, correct_in_window: 2, window: 5, required: 5 },
        mode: "conversation",
      },
    });
    expect(state.status).toBe("idle");
    expect(state.messages).toHaveLength(1);
    expect(state.mode).toBe("conversation");
    expect(state.progress.correct_in_window).toBe(2);
  });

  it("send from idle appends the optimistic message and sets sending", () => {
    const state = sendingState();
    expect(state.status).toBe("sending");
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].role).toBe("child");
  });

  it("send while sending is ignored", () => {
    const before = sendingState();
    const after = chatReducer(before, {
      type: "send",
      message: childMessage("second"),
    });
    expect(after).toBe(before);
  });

  it("send while waking is ignored", () => {
    const waking = chatReducer(sendingState(), { type: "wake" });
    const after = chatReducer(waking, {
      type: "send",
      message: childMessage("second"),
    });
    expect(after).toBe(waking);
  });

  it("send while rate-limited error is ignored", () => {
    const limited = chatReducer(sendingState(), {
      type: "fail",
      message: "slow down",
      retryAfter: 30,
    });
    const after = chatReducer(limited, {
      type: "send",
      message: childMessage("again"),
    });
    expect(after).toBe(limited);
  });

  it("send after a plain error is allowed and clears the error", () => {
    const errored = chatReducer(sendingState(), {
      type: "fail",
      message: "oops",
      retryAfter: null,
    });
    const after = chatReducer(errored, {
      type: "send",
      message: childMessage("retry"),
    });
    expect(after.status).toBe("sending");
    expect(after.sendError).toBeNull();
    expect(after.messages).toHaveLength(2);
  });

  it("wake moves sending to waking", () => {
    const state = chatReducer(sendingState(), { type: "wake" });
    expect(state.status).toBe("waking");
  });

  it("wake while idle is ignored", () => {
    const before = initialChatState();
    expect(chatReducer(before, { type: "wake" })).toBe(before);
  });

  it("receive from sending replaces optimistic message with server messages", () => {
    const response = turnResponse();
    const state = chatReducer(sendingState(), {
      type: "receive",
      response,
    });
    expect(state.status).toBe("idle");
    expect(state.messages).toHaveLength(2);
    expect(
      state.messages.filter((m) => m.role === "child"),
    ).toHaveLength(1);
    expect(state.mode).toBe("learning");
    expect(state.progress.level).toBe(2);
    expect(state.progress.correct_in_window).toBe(3);
  });

  it("receive from waking returns to idle", () => {
    const waking = chatReducer(sendingState(), { type: "wake" });
    const state = chatReducer(waking, {
      type: "receive",
      response: turnResponse(),
    });
    expect(state.status).toBe("idle");
  });

  it("receive with level_up enters levelUp", () => {
    const state = chatReducer(sendingState(), {
      type: "receive",
      response: turnResponse({ level_up: true }),
    });
    expect(state.status).toBe("levelUp");
  });

  it("receive while idle is ignored", () => {
    const before = initialChatState();
    const after = chatReducer(before, {
      type: "receive",
      response: turnResponse(),
    });
    expect(after).toBe(before);
  });

  it("fail from sending stores the error and retryAfter", () => {
    const state = chatReducer(sendingState(), {
      type: "fail",
      message: "Too many tries.",
      retryAfter: 20,
    });
    expect(state.status).toBe("error");
    expect(state.sendError).toBe("Too many tries.");
    expect(state.retryAfter).toBe(20);
  });

  it("enable clears a rate-limited error", () => {
    const limited = chatReducer(sendingState(), {
      type: "fail",
      message: "pause",
      retryAfter: 10,
    });
    const state = chatReducer(limited, { type: "enable" });
    expect(state.status).toBe("idle");
    expect(state.sendError).toBeNull();
    expect(state.retryAfter).toBeNull();
  });

  it("enable while idle is ignored", () => {
    const before = initialChatState();
    expect(chatReducer(before, { type: "enable" })).toBe(before);
  });

  it("dismissLevelUp returns to idle", () => {
    const levelUp = chatReducer(sendingState(), {
      type: "receive",
      response: turnResponse({ level_up: true }),
    });
    const state = chatReducer(levelUp, { type: "dismissLevelUp" });
    expect(state.status).toBe("idle");
  });

  it("dismissLevelUp while idle is ignored", () => {
    const before = initialChatState();
    expect(chatReducer(before, { type: "dismissLevelUp" })).toBe(before);
  });
});
