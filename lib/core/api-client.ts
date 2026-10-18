import { API_URL } from "@/lib/config";
import { getToken } from "@/lib/session/token";
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

const DEFAULT_TIMEOUT_MS = 15_000;
const FIRST_REQUEST_TIMEOUT_MS = 60_000;

type HttpMethod = "GET" | "POST" | "DELETE";

type ErrorBody = {
  error?: { code?: string; message?: string };
};

let firstRequestPending = true;

function parseRetryAfter(header: string | null): number | null {
  if (!header) {
    return null;
  }
  const seconds = Number.parseInt(header, 10);
  return Number.isFinite(seconds) ? seconds : null;
}

async function toApiError(response: Response): Promise<ApiError> {
  let code = "";
  let message = "";
  try {
    const body = (await response.json()) as ErrorBody;
    code = body.error?.code ?? "";
    message = body.error?.message ?? "";
  } catch {
    /* empty or non-JSON error body */
  }

  switch (response.status) {
    case 401:
      return new UnauthorizedError(message);
    case 403:
      return new ForbiddenError(message);
    case 404:
      return new NotFoundError(message);
    case 422:
      return new ValidationError(message);
    case 429:
      return new RateLimitedError(
        message,
        parseRetryAfter(response.headers.get("Retry-After")),
      );
    case 503:
      return new ServiceUnavailableError(message);
    default:
      return new ApiError(
        response.status,
        code || "internal_error",
        message || "Something went wrong. Please try again.",
      );
  }
}

async function request<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
): Promise<T> {
  const timeoutMs = firstRequestPending
    ? FIRST_REQUEST_TIMEOUT_MS
    : DEFAULT_TIMEOUT_MS;
  firstRequestPending = false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const token = getToken();

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === "AbortError") {
      throw new TimeoutError();
    }
    throw new NetworkError();
  } finally {
    clearTimeout(timeout);
  }

  if (response.ok) {
    return (await response.json()) as T;
  }

  throw await toApiError(response);
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>("GET", path);
}

export function apiMutate<T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
): Promise<T> {
  return request<T>(method, path, body);
}
