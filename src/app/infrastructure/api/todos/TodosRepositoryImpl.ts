import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import {
  todoListToDomainAdapter,
  todoListToRawAdapter,
} from "@/app/interfaces/adapters/todos/todo-adapter";
import type { IRawTodoList } from "@/app/interfaces/dtos/todos/raw-todo-list";
import { injectable } from "inversify";

const TODO_STORAGE_KEY = "todo-list-app-data";

const DEFAULT_TODO_LIST: ITodoList = {
  title: "Shopping List",
  items: [],
};

@injectable()
export class TodosRepositoryImpl implements ITodosRepository {
  async getTodoList(): Promise<ITodoList> {
    if (typeof window === "undefined") {
      return DEFAULT_TODO_LIST;
    }

    const rawData = window.localStorage.getItem(TODO_STORAGE_KEY);
    if (!rawData) {
      return DEFAULT_TODO_LIST;
    }

    try {
      const parsed = JSON.parse(rawData) as IRawTodoList;
      return todoListToDomainAdapter(parsed);
    } catch {
      return DEFAULT_TODO_LIST;
    }
  }

  async saveTodoList(todoList: ITodoList): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify(todoListToRawAdapter(todoList)),
    );
  }
}
