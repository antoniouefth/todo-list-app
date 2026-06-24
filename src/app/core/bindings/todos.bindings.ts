import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { UGetTodoListUseCase } from "@/app/domain/todos/use-cases/GetTodoListUseCase";
import { UCreateTodoListUseCase } from "@/app/domain/todos/use-cases/CreateTodoListUseCase";
import { URenameListUseCase } from "@/app/domain/todos/use-cases/RenameListUseCase";
import { UAddItemUseCase } from "@/app/domain/todos/use-cases/AddItemUseCase";
import { UUpdateItemUseCase } from "@/app/domain/todos/use-cases/UpdateItemUseCase";
import { UDeleteItemUseCase } from "@/app/domain/todos/use-cases/DeleteItemUseCase";
import { UReorderItemsUseCase } from "@/app/domain/todos/use-cases/ReorderItemsUseCase";
import { TodosRepositoryImpl } from "@/app/infrastructure/api/todos/TodosRepositoryImpl";
import { Container } from "inversify";

export function register(sl: Container) {
  sl.bind<ITodosRepository>("TodosRepository").to(TodosRepositoryImpl);

  sl.bind<UGetTodoListUseCase>(UGetTodoListUseCase.symbol).to(UGetTodoListUseCase);
  sl.bind<UCreateTodoListUseCase>(UCreateTodoListUseCase.symbol).to(UCreateTodoListUseCase);
  sl.bind<URenameListUseCase>(URenameListUseCase.symbol).to(URenameListUseCase);
  sl.bind<UAddItemUseCase>(UAddItemUseCase.symbol).to(UAddItemUseCase);
  sl.bind<UUpdateItemUseCase>(UUpdateItemUseCase.symbol).to(UUpdateItemUseCase);
  sl.bind<UDeleteItemUseCase>(UDeleteItemUseCase.symbol).to(UDeleteItemUseCase);
  sl.bind<UReorderItemsUseCase>(UReorderItemsUseCase.symbol).to(UReorderItemsUseCase);
}
