"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import { TODO_LIST_QUERY_KEY } from "@/app/ui/features/todos/hooks/todo-query-key";
import { canReorderTodos } from "@/app/ui/features/todos/hooks/todo-reorder-rule";
import { getStatusFilterFromUrl } from "@/app/ui/features/todos/hooks/use-status-filter";
import { getSortModeFromUrl } from "@/app/ui/features/todos/hooks/use-sort-mode";
import { useToast } from "@/app/ui/shared/components/providers/toast-provider";
import {
  renameListAction as renameListService,
  addItemAction as addItemService,
  updateItemAction as updateItemService,
  deleteItemAction as deleteItemService,
  reorderItemsAction as reorderItemsService,
} from "@/app/data/todos/todo-list-actions";

const moveInArray = (items: ITodoItem[], from: number, to: number): ITodoItem[] => {
  const copy = [...items];
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
};

export const useTodoMutations = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateTodoList = useCallback(async (
    cacheUpdater: (current: ITodoList) => ITodoList,
    apiCall: (current: ITodoList, next: ITodoList) => Promise<void>,
    successMessage?: string,
    successVariant: "default" | "success" | "destructive" = "default",
  ) => {
    const current = queryClient.getQueryData<ITodoList>(TODO_LIST_QUERY_KEY);
    if (!current) return;

    const next = cacheUpdater(current);
    queryClient.setQueryData(TODO_LIST_QUERY_KEY, next);

    try {
      await apiCall(current, next);
      if (successMessage) showToast(successMessage, successVariant);
    } catch {
      queryClient.setQueryData(TODO_LIST_QUERY_KEY, current);
    }
  }, [queryClient, showToast]);

  const addTodoItem = useCallback(async (name: string) => {
    const newItem: ITodoItem = { id: crypto.randomUUID(), name: name.trim(), completed: false };
    await updateTodoList(
      (current) => ({ ...current, items: [...current.items, newItem] }),
      (current) => addItemService(current.id, newItem),
      "Todo item added",
      "success",
    );
  }, [updateTodoList]);

  const renameList = useCallback(async (title: string) => {
    await updateTodoList(
      (current) => ({ ...current, title: title.trim() }),
      (current) => renameListService(current.id, title.trim()),
      "List title updated",
      "success",
    );
  }, [updateTodoList]);

  const editTodoItem = useCallback(async (todoId: string, name: string) => {
    await updateTodoList(
      (current) => ({
        ...current,
        items: current.items.map((item) =>
          item.id === todoId ? { ...item, name: name.trim() } : item,
        ),
      }),
      (current) => updateItemService(current.id, todoId, { name: name.trim() }),
      "Todo item updated",
      "success",
    );
  }, [updateTodoList]);

  const toggleTodoItem = useCallback(async (todoId: string) => {
    await updateTodoList(
      (current) => ({
        ...current,
        items: current.items.map((item) =>
          item.id === todoId ? { ...item, completed: !item.completed } : item,
        ),
      }),
      (current, next) => {
        const nextItem = next.items.find((item) => item.id === todoId)!;
        return updateItemService(current.id, todoId, { completed: nextItem.completed });
      },
    );
  }, [updateTodoList]);

  const deleteTodoItem = useCallback(async (todoId: string) => {
    await updateTodoList(
      (current) => ({
        ...current,
        items: current.items.filter((item) => item.id !== todoId),
      }),
      (current) => deleteItemService(current.id, todoId),
      "Todo item deleted",
      "destructive",
    );
  }, [updateTodoList]);

  const moveTodoItem = useCallback(async (todoId: string, direction: "up" | "down") => {
    if (!canReorderTodos({ sortMode: getSortModeFromUrl(), statusFilter: getStatusFilterFromUrl() })) return;

    const current = queryClient.getQueryData<ITodoList>(TODO_LIST_QUERY_KEY);
    if (!current) return;

    const currentIndex = current.items.findIndex((item) => item.id === todoId);
    if (currentIndex < 0) return;

    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0 || nextIndex >= current.items.length) return;

    await updateTodoList(
      (c) => ({ ...c, items: moveInArray(c.items, currentIndex, nextIndex) }),
      (c, next) => reorderItemsService(c.id, next.items.map((item) => item.id)),
    );
  }, [queryClient, updateTodoList]);

  const reorderTodoItems = useCallback(async (fromTodoId: string, toTodoId: string) => {
    if (fromTodoId === toTodoId || !canReorderTodos({ sortMode: getSortModeFromUrl(), statusFilter: getStatusFilterFromUrl() })) return;

    const current = queryClient.getQueryData<ITodoList>(TODO_LIST_QUERY_KEY);
    if (!current) return;

    const fromIndex = current.items.findIndex((item) => item.id === fromTodoId);
    const toIndex = current.items.findIndex((item) => item.id === toTodoId);
    if (fromIndex < 0 || toIndex < 0) return;

    await updateTodoList(
      (c) => ({ ...c, items: moveInArray(c.items, fromIndex, toIndex) }),
      (c, next) => reorderItemsService(c.id, next.items.map((item) => item.id)),
    );
  }, [queryClient, updateTodoList]);

  return {
    addTodoItem,
    renameList,
    editTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    moveTodoItem,
    reorderTodoItems,
  };
};
