import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { todoListToDomainAdapter } from "@/app/interfaces/adapters/todos/todo-adapter";
import type { IRawTodoList } from "@/app/interfaces/dtos/todos/raw-todo-list";
import { injectable } from "inversify";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function http(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const error = new Error(`Request to ${path} failed: ${res.status}`) as Error & {
      status: number;
    };
    error.status = res.status;
    throw error;
  }
  return res;
}

@injectable()
export class TodosRepositoryImpl implements ITodosRepository {
  async getTodoList(): Promise<ITodoList> {
    const res = await http("/todos");
    return todoListToDomainAdapter((await res.json()) as IRawTodoList);
  }

  async createTodoList(title: string): Promise<ITodoList> {
    const res = await http("/todos", { method: "POST", body: JSON.stringify({ title }) });
    return todoListToDomainAdapter((await res.json()) as IRawTodoList);
  }

  async renameList(listId: string, title: string): Promise<void> {
    await http(`/todos/${listId}`, { method: "PATCH", body: JSON.stringify({ title }) });
  }

  async addItem(listId: string, item: ITodoItem): Promise<void> {
    await http(`/todos/${listId}/items`, {
      method: "POST",
      body: JSON.stringify({ id: item.id, name: item.name }),
    });
  }

  async updateItem(
    listId: string,
    itemId: string,
    changes: Partial<Pick<ITodoItem, "name" | "completed">>,
  ): Promise<void> {
    await http(`/todos/${listId}/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(changes),
    });
  }

  async deleteItem(listId: string, itemId: string): Promise<void> {
    await http(`/todos/${listId}/items/${itemId}`, { method: "DELETE" });
  }

  async reorderItems(listId: string, ids: string[]): Promise<void> {
    await http(`/todos/${listId}/items/reorder`, {
      method: "PATCH",
      body: JSON.stringify({ ids }),
    });
  }
}
