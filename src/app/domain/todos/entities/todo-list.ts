import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";

export interface ITodoList {
  id: string,
  title: string;
  items: ITodoItem[];
}
