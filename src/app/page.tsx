import TodoApp from "@/app/ui/features/todos/components/todo-app";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="px-4 py-10 text-center">Loading...</div>}>
        <TodoApp />
      </Suspense>
    </main>
  );
}
