"use client";

import { ETodoStatusFilter } from "@/app/ui/features/todos/models/todo-filters";
import { readUrlParam, useUrlParam } from "@/app/ui/features/todos/hooks/use-url-param";

const STATUS_KEY = "status";

/** The URL query string is the single source of truth for the status filter. */
export function useStatusFilter() {
  return useUrlParam<ETodoStatusFilter>(STATUS_KEY, ETodoStatusFilter.All);
}

/** for non-render contexts (mutation callbacks). */
export function getStatusFilterFromUrl(): ETodoStatusFilter {
  return readUrlParam(STATUS_KEY, ETodoStatusFilter.All);
}
