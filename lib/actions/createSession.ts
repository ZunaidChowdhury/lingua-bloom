import { apiMutate } from "@/lib/core/api-client";

export type CreateSessionInput = {
  nickname: string;
  avatar: string;
};

export type CreateSessionResult = {
  token: string;
};

export function createSession(input: CreateSessionInput): Promise<CreateSessionResult> {
  return apiMutate<CreateSessionResult>("POST", "/v1/sessions", input);
}
