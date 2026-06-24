import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import { getTodoList } from "@/app/data/todos/todo-list-service";

export async function getCachedTodoList(): Promise<ITodoList> {
  try {
    return await getTodoList();
  } catch (error) {
    const status =
      (error as { response?: { status?: number } }).response?.status ??
      (error as { status?: number }).status;
    const wrapped = new Error("Failed to fetch todo list") as Error & { status?: number };
    if (status) wrapped.status = status;
    throw wrapped;
  }
}
