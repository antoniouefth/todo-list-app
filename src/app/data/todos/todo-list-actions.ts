"use server";

import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import {
  createTodoList,
  renameList,
  addItem,
  updateItem,
  deleteItem,
  reorderItems,
} from "@/app/data/todos/todo-list-service";

// No revalidateTag here: the client manages the UI optimistically via React
// Query, and revalidating would refresh the route and re-hydrate over those
// optimistic updates. Reads are uncached, so reload/refetch already see fresh data.

export async function createTodoListAction(title: string): Promise<ITodoList> {
  return createTodoList(title);
}

export async function renameListAction(listId: string, title: string): Promise<void> {
  await renameList(listId, title);
}

export async function addItemAction(listId: string, item: ITodoItem): Promise<void> {
  await addItem(listId, item);
}

export async function updateItemAction(
  listId: string,
  itemId: string,
  changes: Partial<Pick<ITodoItem, "name" | "completed">>,
): Promise<void> {
  await updateItem(listId, itemId, changes);
}

export async function deleteItemAction(listId: string, itemId: string): Promise<void> {
  await deleteItem(listId, itemId);
}

export async function reorderItemsAction(listId: string, ids: string[]): Promise<void> {
  await reorderItems(listId, ids);
}
