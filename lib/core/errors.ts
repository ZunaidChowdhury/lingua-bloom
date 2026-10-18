export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(401, "unauthorized", message || "Your session ended. Let us start fresh.");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message?: string) {
    super(403, "forbidden", message || "That action is not allowed right now.");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message?: string) {
    super(404, "not_found", message || "We could not find that.");
    this.name = "NotFoundError";
  }
}

export class ValidationError extends ApiError {
  constructor(message?: string) {
    super(422, "invalid_input", message || "Something was not quite right. Please try again.");
    this.name = "ValidationError";
  }
}

export class RateLimitedError extends ApiError {
  readonly retryAfter: number | null;

  constructor(message?: string, retryAfter?: number | null) {
    super(429, "rate_limited", message || "Too many tries. Please wait a moment.");
    this.name = "RateLimitedError";
    this.retryAfter = retryAfter ?? null;
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message?: string) {
    super(503, "service_unavailable", message || "The garden is resting. Please try again soon.");
    this.name = "ServiceUnavailableError";
  }
}

export class TimeoutError extends Error {
  constructor() {
    super("That took too long. Please try again.");
    this.name = "TimeoutError";
  }
}

export class NetworkError extends Error {
  constructor() {
    super("The network failed. Please check the connection.");
    this.name = "NetworkError";
  }
}
