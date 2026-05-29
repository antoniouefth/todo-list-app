import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class USaveTodoListUseCase {
  static readonly symbol = Symbol.for("SaveTodoListUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(todoList: ITodoList): Promise<void> {
    await this.todosRepository.saveTodoList(todoList);
  }
}
