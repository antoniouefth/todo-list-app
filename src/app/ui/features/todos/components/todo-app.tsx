import { TodoProgressSummary } from "@/app/ui/features/todos/components/todo-progress-summary";
import { TodoToolbar } from "@/app/ui/features/todos/components/todo-toolbar";
import { AddTodoForm } from "@/app/ui/features/todos/components/todo-form-add";
import { TodoItemList } from "@/app/ui/features/todos/components/todo-item-list";
import { Card, CardContent, CardHeader } from "@/app/ui/shared/components/ui/card";

export default function TodoApp() {
  return (
    <div className="mx-auto max-w-5xl overflow-x-auto px-4 py-10 md:py-16">
      <Card className="min-w-[610px] shadow-sm">
        <CardHeader className="space-y-6">
          <TodoToolbar />
          <TodoProgressSummary />
          <AddTodoForm />
        </CardHeader>
        <CardContent className="space-y-3 transition-all duration-300">
          <TodoItemList />
        </CardContent>
      </Card>
    </div>
  );
}
