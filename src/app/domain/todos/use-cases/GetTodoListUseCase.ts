import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class UGetTodoListUseCase {
  static readonly symbol = Symbol.for("GetTodoListUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(): Promise<ITodoList> {
    return this.todosRepository.getTodoList();
  }
}
