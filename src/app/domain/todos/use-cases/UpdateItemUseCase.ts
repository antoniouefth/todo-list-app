import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class UUpdateItemUseCase {
  static readonly symbol = Symbol.for("UpdateItemUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(
    listId: string,
    itemId: string,
    changes: Partial<Pick<ITodoItem, "name" | "completed">>,
  ): Promise<void> {
    return this.todosRepository.updateItem(listId, itemId, changes);
  }
}
