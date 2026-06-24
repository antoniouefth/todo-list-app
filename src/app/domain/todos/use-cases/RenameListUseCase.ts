import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { inject, injectable } from "inversify";

@injectable()
export class URenameListUseCase {
  static readonly symbol = Symbol.for("RenameListUseCase");

  constructor(
    @inject("TodosRepository") private readonly todosRepository: ITodosRepository,
  ) {}

  async execute(listId: string, title: string): Promise<void> {
    return this.todosRepository.renameList(listId, title);
  }
}
