import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class UReorderItemsUseCase {
  static readonly symbol = Symbol.for("ReorderItemsUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(listId: string, ids: string[]): Promise<void> {
    return this.todosRepository.reorderItems(listId, ids);
  }
}
