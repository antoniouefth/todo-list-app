"use client";

import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useUrlParam<T extends string>(
  key: string,
  defaultValue: T,
): readonly [T, (next: T) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = (searchParams.get(key) as T | null) ?? defaultValue;

  const setValue = useCallback(
    (next: T) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, next);
      }
      const query = params.toString();
      // Update the URL without a navigation: keeps the param shareable but
      // avoids re-running the dynamic page (which would refetch the list).
      // Next integrates history.replaceState with useSearchParams, so consumers
      // still re-render and the new value applies instantly client-side.
      window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
    },
    [searchParams, pathname, key, defaultValue],
  );

  return [value, setValue];
}

export function readUrlParam<T extends string>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  return (new URLSearchParams(window.location.search).get(key) as T | null) ?? defaultValue;
}
