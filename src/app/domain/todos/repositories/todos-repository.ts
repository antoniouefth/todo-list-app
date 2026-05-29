import type { ITodoList } from "@/app/domain/todos/entities/todo-list";

export interface ITodosRepository {
  getTodoList(): Promise<ITodoList>;
  saveTodoList(todoList: ITodoList): Promise<void>;
}
