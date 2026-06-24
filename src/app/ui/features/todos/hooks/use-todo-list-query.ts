"use client";

import { useQuery } from "@tanstack/react-query";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import { TODO_LIST_QUERY_KEY } from "@/app/ui/features/todos/hooks/todo-query-key";

export const useTodoListQuery = <T = ITodoList>(select?: (data: ITodoList) => T) => {
  return useQuery({
    queryKey: TODO_LIST_QUERY_KEY,
    queryFn: async (): Promise<ITodoList> => {
      const res = await fetch("/api/todos");
      if (!res.ok) throw new Error("Failed to load todo list");
      return res.json();
    },
    select,
    retry: false,
  });
};
