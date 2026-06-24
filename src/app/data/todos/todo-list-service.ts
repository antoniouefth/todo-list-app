import { sl } from "@/app/core/source-locator";
import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import { UGetTodoListUseCase } from "@/app/domain/todos/use-cases/GetTodoListUseCase";
import { UCreateTodoListUseCase } from "@/app/domain/todos/use-cases/CreateTodoListUseCase";
import { URenameListUseCase } from "@/app/domain/todos/use-cases/RenameListUseCase";
import { UAddItemUseCase } from "@/app/domain/todos/use-cases/AddItemUseCase";
import { UUpdateItemUseCase } from "@/app/domain/todos/use-cases/UpdateItemUseCase";
import { UDeleteItemUseCase } from "@/app/domain/todos/use-cases/DeleteItemUseCase";
import { UReorderItemsUseCase } from "@/app/domain/todos/use-cases/ReorderItemsUseCase";

export const getTodoList = async (): Promise<ITodoList> => {
  const uc = sl.get<UGetTodoListUseCase>(UGetTodoListUseCase.symbol);
  return uc.execute();
};

export const createTodoList = async (title: string): Promise<ITodoList> => {
  const uc = sl.get<UCreateTodoListUseCase>(UCreateTodoListUseCase.symbol);
  return uc.execute(title);
};

export const renameList = async (listId: string, title: string): Promise<void> => {
  const uc = sl.get<URenameListUseCase>(URenameListUseCase.symbol);
  return uc.execute(listId, title);
};

export const addItem = async (listId: string, item: ITodoItem): Promise<void> => {
  const uc = sl.get<UAddItemUseCase>(UAddItemUseCase.symbol);
  return uc.execute(listId, item);
};

export const updateItem = async (
  listId: string,
  itemId: string,
  changes: Partial<Pick<ITodoItem, "name" | "completed">>,
): Promise<void> => {
  const uc = sl.get<UUpdateItemUseCase>(UUpdateItemUseCase.symbol);
  return uc.execute(listId, itemId, changes);
};

export const deleteItem = async (listId: string, itemId: string): Promise<void> => {
  const uc = sl.get<UDeleteItemUseCase>(UDeleteItemUseCase.symbol);
  return uc.execute(listId, itemId);
};

export const reorderItems = async (listId: string, ids: string[]): Promise<void> => {
  const uc = sl.get<UReorderItemsUseCase>(UReorderItemsUseCase.symbol);
  return uc.execute(listId, ids);
};
