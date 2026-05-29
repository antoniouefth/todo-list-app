import type { IRawTodoItem } from "@/app/interfaces/dtos/todos/raw-todo-item";

export interface IRawTodoList {
  title: string;
  items: IRawTodoItem[];
}
