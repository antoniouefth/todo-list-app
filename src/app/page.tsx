import { connection } from "next/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import TodoApp from "@/app/ui/features/todos/components/todo-app";
import { TODO_LIST_QUERY_KEY } from "@/app/ui/features/todos/hooks/todo-query-key";
import { getOrCreateTodoList } from "@/app/data/todos/get-or-create-todo-list";

export default async function Home() {
  await connection();

  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: TODO_LIST_QUERY_KEY,
    queryFn: getOrCreateTodoList,
    staleTime: 2*60*1000,
  });

  return (
    <main className="min-h-screen bg-background">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodoApp />
      </HydrationBoundary>
    </main>
  );
}
