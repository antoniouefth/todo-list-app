"use client";

import { useTodoUIStore } from "@/app/ui/features/todos/store/todo-ui-store";
import { useShallow } from "zustand/react/shallow";

/**
 * Reads the search-text filter from the store. Status and sort are not here —
 * they live in the URL via `useStatusFilter` / `useSortMode`.
 */
export const useTodoSearch = () => {
  return useTodoUIStore(
    useShallow((s) => ({
      searchText: s.searchText,
      setSearchText: s.setSearchText,
    })),
  );
};
