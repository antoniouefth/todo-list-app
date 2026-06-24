"use client";

import React from "react";
import { ETodoSortMode } from "@/app/ui/features/todos/models/todo-filters";
import {
  TodoFilterSelect,
  TodoFilterOption,
} from "@/app/ui/features/todos/components/todo-filter-select";
import { useSortMode } from "@/app/ui/features/todos/hooks/use-sort-mode";

const SORT_OPTIONS: TodoFilterOption<ETodoSortMode>[] = [
  { value: ETodoSortMode.Manual, label: "Sort: Manual" },
  { value: ETodoSortMode.NameAsc, label: "Sort: Name A-Z" },
  { value: ETodoSortMode.NameDesc, label: "Sort: Name Z-A" },
];

export const TodoSortSelect = React.memo(function TodoSortSelect() {
  console.log("[render] TodoSortSelect")
  const [sortMode, setSortMode] = useSortMode();

  return (
    <TodoFilterSelect
      value={sortMode}
      onValueChange={setSortMode}
      options={SORT_OPTIONS}
      placeholder="Sort"
      ariaLabel="Sort todo items"
    />
  );
});
