import { TodoProgressSummary } from "@/app/ui/features/todos/components/todo-progress-summary";
import { TodoToolbar } from "@/app/ui/features/todos/components/todo-toolbar";
import { AddTodoForm } from "@/app/ui/features/todos/components/todo-form-add";
import { TodoItemList } from "@/app/ui/features/todos/components/todo-item-list";
import { TodoAppCardHeader } from "@/app/ui/features/todos/components/todo-app-card-header";
import { TodoAppCardContent } from "@/app/ui/features/todos/components/todo-app-card-content";
import { Card } from "@/app/ui/shared/components/ui/card";

export default function TodoApp() {
  return (
    <div className="mx-auto max-w-5xl overflow-x-auto px-4 py-10 md:py-16">
      <Card className="min-w-[610px] shadow-sm">
        <TodoAppCardHeader>
          <TodoToolbar />
          <TodoProgressSummary />
          <AddTodoForm />
        </TodoAppCardHeader>
        <TodoAppCardContent>
          <TodoItemList />
        </TodoAppCardContent>
      </Card>
    </div>
  );
}
