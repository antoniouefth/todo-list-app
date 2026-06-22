"use client";

import { ETodoStatusFilter } from "@/app/ui/features/todos/models/todo-filters";
import { useTodoUIStore } from "@/app/ui/features/todos/store/todo-ui-store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const STATUS_QUERY_KEY = "status";
const URL_SYNC_DEBOUNCE_MS = 180;

export const useTodoFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { searchText, setSearchText, sortMode, setSortMode, statusFilter, setStatusFilter } =
    useTodoUIStore();

  const initialStatus = useMemo<ETodoStatusFilter>(() => {
    const urlValue = searchParams.get(STATUS_QUERY_KEY) as ETodoStatusFilter | null;
    return urlValue ?? ETodoStatusFilter.All;
  }, [searchParams]);

  useEffect(() => {
    setStatusFilter(initialStatus);
  }, [initialStatus, setStatusFilter]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const currentStatus = searchParams.get(STATUS_QUERY_KEY);
      const nextStatus =
        statusFilter === ETodoStatusFilter.All ? null : statusFilter;
      if (currentStatus === nextStatus) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams.toString());
      if (statusFilter === ETodoStatusFilter.All) {
        nextParams.delete(STATUS_QUERY_KEY);
      } else {
        nextParams.set(STATUS_QUERY_KEY, statusFilter);
      }

      const nextQuery = nextParams.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
    }, URL_SYNC_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [statusFilter, pathname, router, searchParams]);

  return {
    searchText,
    setSearchText,
    sortMode,
    setSortMode,
    statusFilter,
    setStatusFilter,
  };
};
