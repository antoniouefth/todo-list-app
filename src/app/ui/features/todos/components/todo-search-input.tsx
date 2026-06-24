"use client";

import React, { useCallback } from "react";
import { Input } from "@/app/ui/shared/components/ui/input";
import { useTodoSearch } from "@/app/ui/features/todos/hooks/use-todo-search";

export const TodoSearchInput = React.memo(function TodoSearchInput() {
  console.log("[render] TodoSearchInput")
  const { searchText, setSearchText } = useTodoSearch();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText],
  );

  return (
    <Input
      value={searchText}
      onChange={handleChange}
      placeholder="Filter..."
      aria-label="Search todo items"
      className="h-9 min-w-[145px] rounded-md border bg-background px-2 text-xs"
    />
  );
});
