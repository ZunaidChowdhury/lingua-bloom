import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ApiError,
  ForbiddenError,
  NotFoundError,
  NetworkError,
  RateLimitedError,
  ServiceUnavailableError,
  TimeoutError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/core/errors";

import { apiGet, apiMutate } from "./api-client";

function errorResponse(status: number, retryAfter?: string): Response {
  return new Response(
    JSON.stringify({
      error: { code: "test_code", message: "server says no" },
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        ...(retryAfter ? { "Retry-After": retryAfter } : {}),
      },
    },
  );
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function mockFetch(impl: (url: string, init: RequestInit) => Promise<Response>) {
  const spy = vi.fn(impl);
  vi.stubGlobal("fetch", spy);
  return spy;
}

function unsetWindow(): void {
  Reflect.deleteProperty(globalThis, "window");
}

function setWindowWithToken(token: string): void {
  const store = new Map<string, string>([["lingua-bloom-token", token]]);
  Reflect.set(globalThis, "window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  unsetWindow();
});

describe("api-client success path", () => {
  it("returns parsed JSON from a GET", async () => {
    mockFetch(async () => jsonResponse({ id: "abc" }));
    await expect(apiGet<{ id: string }>("/v1/sessions/me")).resolves.toEqual({
      id: "abc",
    });
  });

  it("sends method and JSON body for a mutation", async () => {
    const spy = mockFetch(async () => jsonResponse({ token: "t" }));
    await apiMutate("POST", "/v1/sessions", { nickname: "Bee", avatar: "seedling" });
    const [url, init] = spy.mock.calls[0]!;
    expect(url).toContain("/v1/sessions");
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ nickname: "Bee", avatar: "seedling" }));
  });

  it("adds the Bearer token from storage automatically", async () => {
    setWindowWithToken("secret-token");
    const spy = mockFetch(async () => jsonResponse({}));
    await apiGet("/v1/sessions/me");
    const headers = spy.mock.calls[0]![1].headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer secret-token");
  });

  it("omits the Authorization header when no token exists", async () => {
    const spy = mockFetch(async () => jsonResponse({}));
    await apiGet("/v1/sessions/me");
    const headers = spy.mock.calls[0]![1].headers as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
  });
});

describe("api-client typed errors", () => {
  it("throws UnauthorizedError on 401 with the server message", async () => {
    mockFetch(async () => errorResponse(401));
    await expect(apiGet("/v1/sessions/me")).rejects.toSatisfy((error: unknown) => {
      return error instanceof UnauthorizedError && error.message === "server says no";
    });
  });

  it("throws ForbiddenError on 403", async () => {
    mockFetch(async () => errorResponse(403));
    await expect(apiGet("/v1/sessions/me")).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("throws NotFoundError on 404", async () => {
    mockFetch(async () => errorResponse(404));
    await expect(apiGet("/nope")).rejects.toBeInstanceOf(NotFoundError);
  });

  it("throws ValidationError on 422", async () => {
    mockFetch(async () => errorResponse(422));
    await expect(apiMutate("POST", "/v1/chat/turns", {})).rejects.toBeInstanceOf(
      ValidationError,
    );
  });

  it("throws RateLimitedError on 429 with parsed retryAfter seconds", async () => {
    mockFetch(async () => errorResponse(429, "30"));
    const result = apiGet("/v1/chat/turns");
    await expect(result).rejects.toBeInstanceOf(RateLimitedError);
    await result.catch((error: unknown) => {
      expect(error).toBeInstanceOf(RateLimitedError);
      expect((error as RateLimitedError).retryAfter).toBe(30);
    });
  });

  it("throws ServiceUnavailableError on 503", async () => {
    mockFetch(async () => errorResponse(503));
    await expect(apiGet("/v1/sessions/me")).rejects.toBeInstanceOf(
      ServiceUnavailableError,
    );
  });

  it("throws base ApiError on 500 with a child-safe fallback message", async () => {
    mockFetch(
      async () =>
        new Response(JSON.stringify({ error: { code: "internal_error" } }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }),
    );
    const result = apiGet("/v1/sessions/me");
    await expect(result).rejects.toBeInstanceOf(ApiError);
    await result.catch((error: unknown) => {
      const apiError = error as ApiError;
      expect(apiError.status).toBe(500);
      expect(apiError.message).toBe("Something went wrong. Please try again.");
    });
  });

  it("uses a default message when the error body is not JSON", async () => {
    mockFetch(async () => new Response("<html>gateway</html>", { status: 401 }));
    const result = apiGet("/v1/sessions/me");
    await expect(result).rejects.toBeInstanceOf(UnauthorizedError);
    await result.catch((error: unknown) => {
      expect((error as UnauthorizedError).message).toBe(
        "Your session ended. Let us start fresh.",
      );
    });
  });

  it("throws TimeoutError when the request is aborted", async () => {
    mockFetch(async () => {
      throw new DOMException("The operation was aborted.", "AbortError");
    });
    await expect(apiGet("/v1/sessions/me")).rejects.toBeInstanceOf(TimeoutError);
  });

  it("throws NetworkError when fetch fails", async () => {
    mockFetch(async () => {
      throw new TypeError("fetch failed");
    });
    await expect(apiGet("/v1/sessions/me")).rejects.toBeInstanceOf(NetworkError);
  });
});
