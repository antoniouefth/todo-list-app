import type { ITodosRepository } from "@/app/domain/todos/repositories/todos-repository";
import { UGetTodoListUseCase } from "@/app/domain/todos/use-cases/GetTodoListUseCase";
import { USaveTodoListUseCase } from "@/app/domain/todos/use-cases/SaveTodoListUseCase";
import { TodosRepositoryImpl } from "@/app/infrastructure/api/todos/TodosRepositoryImpl";
import { Container } from "inversify";

export function register(sl: Container) {
  sl.bind<ITodosRepository>("TodosRepository").to(TodosRepositoryImpl);

  sl.bind<UGetTodoListUseCase>(UGetTodoListUseCase.symbol).to(
    UGetTodoListUseCase,
  );
  sl.bind<USaveTodoListUseCase>(USaveTodoListUseCase.symbol).to(
    USaveTodoListUseCase,
  );
}
