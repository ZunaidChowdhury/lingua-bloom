"use client";

import { useEffect } from "react";

export function useWarmup(): void {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return;
    }
    const controller = new AbortController();
    void fetch(`${baseUrl}/health`, { signal: controller.signal }).catch(() => undefined);
    return () => controller.abort();
  }, []);
}
