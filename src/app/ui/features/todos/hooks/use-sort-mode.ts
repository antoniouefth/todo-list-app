"use client";

import { ETodoSortMode } from "@/app/ui/features/todos/models/todo-filters";
import { readUrlParam, useUrlParam } from "@/app/ui/features/todos/hooks/use-url-param";

const SORT_KEY = "sort";

/** The URL query string is the single source of truth for the sort mode. */
export function useSortMode() {
  return useUrlParam<ETodoSortMode>(SORT_KEY, ETodoSortMode.Manual);
}

/** or non-render contexts (mutation callbacks). */
export function getSortModeFromUrl(): ETodoSortMode {
  return readUrlParam(SORT_KEY, ETodoSortMode.Manual);
}
