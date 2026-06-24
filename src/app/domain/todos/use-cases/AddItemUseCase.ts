import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class UAddItemUseCase {
  static readonly symbol = Symbol.for("AddItemUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(listId: string, item: ITodoItem): Promise<void> {
    return this.todosRepository.addItem(listId, item);
  }
}
