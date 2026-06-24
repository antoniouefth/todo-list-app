"use client";

import React from "react";
import { useTodoListQuery } from "@/app/ui/features/todos/hooks/use-todo-list-query";

export const TodoToolbarHeading = React.memo(function TodoToolbarHeading() {
  console.log("[render] TodoToolbarHeading")
  const { data: title } = useTodoListQuery((data) => data.title);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight lg:whitespace-nowrap">{title}</h1>
      <p className="text-sm text-muted-foreground">Single Todo List</p>
    </div>
  );
});
