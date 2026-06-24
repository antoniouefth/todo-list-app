"use client";

import React from "react";
import { RenameListDialog } from "@/app/ui/features/todos/components/todo-rename-dialog";
import { useTodoListQuery } from "@/app/ui/features/todos/hooks/use-todo-list-query";
import { useTodoMutations } from "@/app/ui/features/todos/hooks/use-todo-mutations";

export const TodoRenameListControl = React.memo(function TodoRenameListControl() {
  console.log("[render] TodoRenameListControl")
  const { data: title } = useTodoListQuery((data) => data.title);
  const { renameList } = useTodoMutations();

  return <RenameListDialog currentTitle={title ?? ""} onSubmit={renameList} />;
});
