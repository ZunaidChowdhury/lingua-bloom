"use client";

import { useEffect } from "react";

import { API_URL } from "@/lib/config";

export function useWarmup(): void {
  useEffect(() => {
    const controller = new AbortController();
    void fetch(`${API_URL}/health`, { signal: controller.signal }).catch(
      () => undefined,
    );
    return () => controller.abort();
  }, []);
}
