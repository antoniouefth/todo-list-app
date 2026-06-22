import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import type { IRawTodoItem } from "@/app/interfaces/dtos/todos/raw-todo-item";
import type { IRawTodoList } from "@/app/interfaces/dtos/todos/raw-todo-list";

export const todoItemToDomainAdapter = (item: IRawTodoItem): ITodoItem => ({
  id: item.id,
  name: item.name,
  completed: item.completed,
});

export const todoListToDomainAdapter = (todoList: IRawTodoList): ITodoList => ({
  id: todoList.id,
  title: todoList.title,
  items: todoList.items.map(todoItemToDomainAdapter),
});

export const todoItemToRawAdapter = (item: ITodoItem): IRawTodoItem => ({
  id: item.id,
  name: item.name,
  completed: item.completed,
});

export const todoListToRawAdapter = (todoList: ITodoList): IRawTodoList => ({
  id: todoList.id,
  title: todoList.title,
  items: todoList.items.map(todoItemToRawAdapter),
});
