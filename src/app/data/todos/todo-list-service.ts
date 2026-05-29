import { sl } from "@/app/core/source-locator";
import type { ITodoList } from "@/app/domain/todos/entities/todo-list";
import { UGetTodoListUseCase } from "@/app/domain/todos/use-cases/GetTodoListUseCase";
import { USaveTodoListUseCase } from "@/app/domain/todos/use-cases/SaveTodoListUseCase";

export const getTodoList = async (): Promise<ITodoList> => {
  const getTodoListUseCase = sl.get<UGetTodoListUseCase>(UGetTodoListUseCase.symbol);
  return getTodoListUseCase.execute();
};

export const saveTodoList = async (todoList: ITodoList): Promise<void> => {
  const saveTodoListUseCase = sl.get<USaveTodoListUseCase>(
    USaveTodoListUseCase.symbol,
  );
  await saveTodoListUseCase.execute(todoList);
};
