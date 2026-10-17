const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type HttpMethod = "GET" | "POST" | "DELETE";

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  token?: string,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function apiGet<T>(path: string, token?: string): Promise<T> {
  return request<T>("GET", path, undefined, token);
}

export function apiMutate<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  token?: string,
): Promise<T> {
  return request<T>(method, path, body, token);
}
