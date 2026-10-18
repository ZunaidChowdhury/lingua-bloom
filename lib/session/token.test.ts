import { afterEach, describe, expect, it } from "vitest";

import { clearToken, getToken, setToken } from "./token";

function unsetWindow(): void {
  Reflect.deleteProperty(globalThis, "window");
}

function setWindow(value: unknown): void {
  Reflect.set(globalThis, "window", value);
}

describe("token storage", () => {
  afterEach(() => {
    unsetWindow();
  });

  it("returns null and never throws during server rendering", () => {
    unsetWindow();
    expect(getToken()).toBeNull();
    expect(() => setToken("server")).not.toThrow();
    expect(() => clearToken()).not.toThrow();
  });

  it("round-trips a token through localStorage", () => {
    const store = new Map<string, string>();
    setWindow({
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
    setToken("abc");
    expect(getToken()).toBe("abc");
    expect(store.get("lingua-bloom-token")).toBe("abc");
    clearToken();
    expect(getToken()).toBeNull();
    expect(store.has("lingua-bloom-token")).toBe(false);
  });

  it("falls back to memory when accessing localStorage throws", () => {
    setWindow({
      get localStorage(): Storage {
        throw new Error("SecurityError");
      },
    });
    setToken("in-memory");
    expect(getToken()).toBe("in-memory");
    clearToken();
    expect(getToken()).toBeNull();
  });

  it("falls back to memory when storage methods throw", () => {
    setWindow({
      localStorage: {
        getItem(): string | null {
          throw new Error("QuotaExceededError");
        },
        setItem(): void {
          throw new Error("QuotaExceededError");
        },
        removeItem(): void {
          throw new Error("QuotaExceededError");
        },
      },
    });
    setToken("kept");
    expect(getToken()).toBe("kept");
    clearToken();
    expect(getToken()).toBeNull();
  });
});
