import TodoApp from "@/app/ui/features/todos/components/todo-app";
import { Suspense } from "react";

const AppContent = () => {
  return (
    <Suspense>
      <TodoApp />
    </Suspense>
  )
}

// TODO na dw pws na to kanw na exw ksexwsista client components kai server 
export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AppContent />
    </main>
  );
}