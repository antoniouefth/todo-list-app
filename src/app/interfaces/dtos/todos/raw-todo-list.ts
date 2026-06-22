import type { IRawTodoItem } from "@/app/interfaces/dtos/todos/raw-todo-item";

export interface IRawTodoList {
  id: string,
  title: string;
  items: IRawTodoItem[];
}
