import { getCachedTodoList } from "@/app/data/todos/todo-list-cache";
import { createTodoList } from "@/app/data/todos/todo-list-service";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";

export async function getOrCreateTodoList(): Promise<ITodoList> {
  try {
    return await getCachedTodoList();
  } catch (error) {
    if (error instanceof Error && (error as Error & { status?: number }).status === 404) {
      return createTodoList("My Todo List");
    }
    throw error;
  }
}
