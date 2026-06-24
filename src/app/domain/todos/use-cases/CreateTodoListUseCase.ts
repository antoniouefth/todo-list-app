import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class UCreateTodoListUseCase {
  static readonly symbol = Symbol.for("CreateTodoListUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(title: string): Promise<ITodoList> {
    return this.todosRepository.createTodoList(title);
  }
}
