"use client";

import { getTodoList, saveTodoList } from "@/app/data/todos/todo-list-service";
import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import {
  ETodoSortMode,
  ETodoStatusFilter,
} from "@/app/ui/features/todos/models/todo-filters";
import { canReorderTodos } from "@/app/ui/features/todos/hooks/todo-reorder-rule";
import { useTodoFilters } from "@/app/ui/features/todos/hooks/use-todo-filters";
import { useToast } from "@/app/ui/shared/components/providers/toast-provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const TODO_LIST_QUERY_KEY = ["todo-list"] as const;

const sortItems = (items: ITodoItem[], sortMode: ETodoSortMode): ITodoItem[] => {
  if (sortMode === ETodoSortMode.Manual) {
    return items;
  }

  return [...items].sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return sortMode === ETodoSortMode.NameAsc ? result : -result;
  });
};

const moveInArray = (items: ITodoItem[], from: number, to: number): ITodoItem[] => {
  const copy = [...items];
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
};

export const useTodoList = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const {
    searchText,
    setSearchText,
    sortMode,
    setSortMode,
    statusFilter,
    setStatusFilter,
  } = useTodoFilters();
  const [draggingTodoId, setDraggingTodoId] = useState<string | null>(null);

  const todoListQuery = useQuery({
    queryKey: TODO_LIST_QUERY_KEY,
    queryFn: getTodoList,
  });

  const saveMutation = useMutation({
    mutationFn: async (nextTodoList: ITodoList) => {
      await saveTodoList(nextTodoList);
      return nextTodoList;
    },
    onSuccess: (nextTodoList) => {
      queryClient.setQueryData(TODO_LIST_QUERY_KEY, nextTodoList);
    },
  });

  const todoList = todoListQuery.data;

  const filteredItems = useMemo(() => {
    if (!todoList) {
      return [];
    }

    const normalizedSearch = searchText.trim().toLowerCase();
    const byStatus = todoList.items.filter((item) => {
      if (statusFilter === ETodoStatusFilter.Active) {
        return !item.completed;
      }
      if (statusFilter === ETodoStatusFilter.Completed) {
        return item.completed;
      }
      return true;
    });

    const bySearch = byStatus.filter((item) =>
      item.name.toLowerCase().includes(normalizedSearch),
    );

    return sortItems(bySearch, sortMode);
  }, [todoList, searchText, statusFilter, sortMode]);

  const completedCount = useMemo(
    () => todoList?.items.filter((item) => item.completed).length ?? 0,
    [todoList],
  );

  const completionPercentage = useMemo(() => {
    const total = todoList?.items.length ?? 0;
    if (total === 0) {
      return 0;
    }
    return Math.round((completedCount / total) * 100);
  }, [completedCount, todoList?.items.length]);

  const updateTodoList = async (
    updater: (currentList: ITodoList) => ITodoList,
    successMessage?: string,
    successVariant: "default" | "success" | "destructive" = "default",
  ) => {
    const currentList = queryClient.getQueryData<ITodoList>(TODO_LIST_QUERY_KEY);
    if (!currentList) {
      return;
    }

    const nextList = updater(currentList);
    queryClient.setQueryData(TODO_LIST_QUERY_KEY, nextList);
    await saveMutation.mutateAsync(nextList);

    if (successMessage) {
      showToast(successMessage, successVariant);
    }
  };

  const addTodoItem = async (name: string) => {
    await updateTodoList(
      (currentList) => ({
        ...currentList,
        items: [
          ...currentList.items,
          { id: crypto.randomUUID(), name: name.trim(), completed: false },
        ],
      }),
      "Todo item added",
      "success",
    );
  };

  const renameList = async (title: string) => {
    await updateTodoList(
      (currentList) => ({ ...currentList, title: title.trim() }),
      "List title updated",
      "success",
    );
  };

  const editTodoItem = async (todoId: string, name: string) => {
    await updateTodoList(
      (currentList) => ({
        ...currentList,
        items: currentList.items.map((item) =>
          item.id === todoId ? { ...item, name: name.trim() } : item,
        ),
      }),
      "Todo item updated",
      "success",
    );
  };

  const toggleTodoItem = async (todoId: string) => {
    await updateTodoList((currentList) => ({
      ...currentList,
      items: currentList.items.map((item) =>
        item.id === todoId ? { ...item, completed: !item.completed } : item,
      ),
    }));
  };

  const deleteTodoItem = async (todoId: string) => {
    await updateTodoList(
      (currentList) => ({
        ...currentList,
        items: currentList.items.filter((item) => item.id !== todoId),
      }),
      "Todo item deleted",
      "destructive",
    );
  };

  const moveTodoItem = async (todoId: string, direction: "up" | "down") => {
    if (!todoList || !canReorderTodos({ sortMode, statusFilter })) {
      return;
    }

    const currentIndex = todoList.items.findIndex((item) => item.id === todoId);
    if (currentIndex < 0) {
      return;
    }

    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0 || nextIndex >= todoList.items.length) {
      return;
    }

    await updateTodoList((currentList) => ({
      ...currentList,
      items: moveInArray(currentList.items, currentIndex, nextIndex),
    }));
  };

  const reorderTodoItems = async (fromTodoId: string, toTodoId: string) => {
    if (
      !todoList ||
      !canReorderTodos({ sortMode, statusFilter }) ||
      fromTodoId === toTodoId
    ) {
      return;
    }

    const fromIndex = todoList.items.findIndex((item) => item.id === fromTodoId);
    const toIndex = todoList.items.findIndex((item) => item.id === toTodoId);
    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    await updateTodoList((currentList) => ({
      ...currentList,
      items: moveInArray(currentList.items, fromIndex, toIndex),
    }));
  };

  return {
    todoList,
    filteredItems,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    sortMode,
    setSortMode,
    completedCount,
    completionPercentage,
    addTodoItem,
    renameList,
    editTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    moveTodoItem,
    reorderTodoItems,
    draggingTodoId,
    setDraggingTodoId,
    isLoading: todoListQuery.isLoading,
    isSaving: saveMutation.isPending,
  };
};
