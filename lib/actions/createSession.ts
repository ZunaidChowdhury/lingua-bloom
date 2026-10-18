import { apiMutate } from "@/lib/core/api-client";
import type { CreateSessionInput, CreateSessionResponse } from "@/lib/types";

export function createSession(
  input: CreateSessionInput,
): Promise<CreateSessionResponse> {
  return apiMutate<CreateSessionResponse>("POST", "/v1/sessions", input);
}
