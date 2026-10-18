import { apiGet } from "@/lib/core/api-client";
import type { GetSessionResponse } from "@/lib/types";

export function getSession(): Promise<GetSessionResponse> {
  return apiGet<GetSessionResponse>("/v1/sessions/me");
}
