import { apiGet } from "@/lib/core/api-client";
import type { ProgressResponse } from "@/lib/types";

export function getProgress(): Promise<ProgressResponse> {
  return apiGet<ProgressResponse>("/v1/progress");
}
