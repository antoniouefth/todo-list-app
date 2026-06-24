import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class UDeleteItemUseCase {
  static readonly symbol = Symbol.for("DeleteItemUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(listId: string, itemId: string): Promise<void> {
    return this.todosRepository.deleteItem(listId, itemId);
  }
}
