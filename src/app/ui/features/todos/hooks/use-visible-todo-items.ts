"use client";

import { useMemo } from "react";
import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import { canReorderTodos } from "@/app/ui/features/todos/hooks/todo-reorder-rule";
import { useTodoListQuery } from "@/app/ui/features/todos/hooks/use-todo-list-query";
import { useTodoSearch } from "@/app/ui/features/todos/hooks/use-todo-search";
import { useStatusFilter } from "@/app/ui/features/todos/hooks/use-status-filter";
import { useSortMode } from "@/app/ui/features/todos/hooks/use-sort-mode";
import { useTodoUIStore } from "@/app/ui/features/todos/store/todo-ui-store";
import { ETodoSortMode } from "@/app/ui/features/todos/models/todo-filters";

// Stable reference for the empty fallback so it doesn't change identity each
// render (which would invalidate the `itemIndexMap` memo).
const EMPTY_ITEMS: ITodoItem[] = [];

const sortItems = (items: ITodoItem[], sortMode: ETodoSortMode): ITodoItem[] => {
  if (sortMode === ETodoSortMode.Manual) return items;
  return [...items].sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return sortMode === ETodoSortMode.NameAsc ? result : -result;
  });
};

export interface VisibleTodoItems {
  /** Items after status filter, search, and sort are applied — what the list renders. */
  filteredItems: ITodoItem[];
  /** Full unfiltered list, used for empty-state detection and reorder bounds. */
  allItems: ITodoItem[];
  /** id -> position in the full list, for O(1) canMoveUp/canMoveDown lookups. */
  itemIndexMap: Map<string, number>;
  canReorder: boolean;
  draggingTodoId: string | null;
}

/**
 * Owns all the client-side reactivity for the list: reads the cached todo list,
 * the filter state, and the drag state, and derives the visible items. Kept as a
 * hook so `TodoItemList` is left as thin rendering.
 */
export const useVisibleTodoItems = (): VisibleTodoItems => {
  const { data: todoList } = useTodoListQuery();
  const { searchText } = useTodoSearch();
  const [sortMode] = useSortMode();
  const [statusFilter] = useStatusFilter();
  const draggingTodoId = useTodoUIStore((s) => s.draggingTodoId);

  const canReorder = canReorderTodos({ sortMode, statusFilter });
  const allItems = useMemo(() => todoList?.items ?? EMPTY_ITEMS, [todoList]);

  const itemIndexMap = useMemo(
    () => new Map(allItems.map((item, i) => [item.id, i])),
    [allItems],
  );

  const filteredItems = useMemo(() => {
    if (!todoList) return EMPTY_ITEMS;
    const normalizedSearch = searchText.trim().toLowerCase();
    const byStatus = todoList.items.filter((item) => {
      if (statusFilter === "active") return !item.completed;
      if (statusFilter === "completed") return item.completed;
      return true;
    });
    const bySearch = byStatus.filter((item) =>
      item.name.toLowerCase().includes(normalizedSearch),
    );
    return sortItems(bySearch, sortMode);
  }, [todoList, searchText, statusFilter, sortMode]);

  return { filteredItems, allItems, itemIndexMap, canReorder, draggingTodoId };
};
