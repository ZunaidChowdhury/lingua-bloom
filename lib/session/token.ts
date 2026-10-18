const TOKEN_KEY = "lingua-bloom-token";

let memoryFallback: string | null = null;

function getStorage(): Storage | null {
  try {
    if (typeof window === "undefined") {
      return null;
    }
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const store = getStorage();
  if (!store) {
    return memoryFallback;
  }
  try {
    return store.getItem(TOKEN_KEY);
  } catch {
    return memoryFallback;
  }
}

export function setToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }
  memoryFallback = token;
  const store = getStorage();
  if (!store) {
    return;
  }
  try {
    store.setItem(TOKEN_KEY, token);
  } catch {
    /* keep the in-memory value */
  }
}

export function clearToken(): void {
  if (typeof window === "undefined") {
    return;
  }
  memoryFallback = null;
  const store = getStorage();
  if (!store) {
    return;
  }
  try {
    store.removeItem(TOKEN_KEY);
  } catch {
    /* already cleared in memory */
  }
}
