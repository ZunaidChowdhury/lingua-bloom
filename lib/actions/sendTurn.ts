import { apiMutate } from "@/lib/core/api-client";
import type { TurnInput, TurnResponse } from "@/lib/types";

export function sendTurn(input: TurnInput): Promise<TurnResponse> {
  return apiMutate<TurnResponse>("POST", "/v1/chat/turns", input);
}
