import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";

export interface ITodoList {
  title: string;
  items: ITodoItem[];
}
