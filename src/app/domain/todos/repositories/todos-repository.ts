import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";

export interface ITodosRepository {
  getTodoList(): Promise<ITodoList>;
  createTodoList(title: string): Promise<ITodoList>;
  renameList(listId: string, title: string): Promise<void>;
  addItem(listId: string, item: ITodoItem): Promise<void>;
  updateItem(listId: string, itemId: string, changes: Partial<Pick<ITodoItem, "name" | "completed">>): Promise<void>;
  deleteItem(listId: string, itemId: string): Promise<void>;
  reorderItems(listId: string, ids: string[]): Promise<void>;
}
