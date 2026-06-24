"use client";

import React from "react";
import { ETodoStatusFilter } from "@/app/ui/features/todos/models/todo-filters";
import {
  TodoFilterSelect,
  TodoFilterOption,
} from "@/app/ui/features/todos/components/todo-filter-select";
import { useStatusFilter } from "@/app/ui/features/todos/hooks/use-status-filter";

const STATUS_OPTIONS: TodoFilterOption<ETodoStatusFilter>[] = [
  { value: ETodoStatusFilter.All, label: "Status: All" },
  { value: ETodoStatusFilter.Active, label: "Status: Active" },
  { value: ETodoStatusFilter.Completed, label: "Status: Completed" },
];

export const TodoStatusFilterSelect = React.memo(function TodoStatusFilterSelect() {
  console.log("[render] TodoStatusFilterSelect")
  const [statusFilter, setStatusFilter] = useStatusFilter();

  return (
    <TodoFilterSelect
      value={statusFilter}
      onValueChange={setStatusFilter}
      options={STATUS_OPTIONS}
      placeholder="Status"
      ariaLabel="Filter todo status"
    />
  );
});
