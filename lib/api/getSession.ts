import { apiGet } from "@/lib/core/api-client";

export type SessionSummary = {
  id: string;
  nickname: string | null;
  avatar: string;
  level: number;
  turnCount: number;
};

export function getSession(): Promise<SessionSummary> {
  return apiGet<SessionSummary>("/v1/sessions/me");
}
