import { apiMutate } from "@/lib/core/api-client";

export function deleteSession(): Promise<void> {
  return apiMutate<void>("DELETE", "/v1/sessions/me");
}
