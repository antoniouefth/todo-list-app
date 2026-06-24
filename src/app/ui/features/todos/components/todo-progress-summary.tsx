"use client";

import React from "react";
import { Progress } from "@/app/ui/shared/components/ui/progress";
import { useTodoListQuery } from "@/app/ui/features/todos/hooks/use-todo-list-query";

export const TodoProgressSummary = React.memo(function TodoProgressSummary() {
  // Subscribe to the derived counts, not the items array. React Query applies
  // structural sharing to the select result, so edits/reorders (which don't
  // change the counts) return the same { completed, total } reference and skip
  // a re-render. Only add/delete/toggle actually re-render this.
  const { data } = useTodoListQuery((todoList) => ({
    completed: todoList.items.filter((item) => item.completed).length,
    total: todoList.items.length,
  }));

  const completedCount = data?.completed ?? 0;
  const totalCount = data?.total ?? 0;
  const pendingCount = totalCount - completedCount;
  const completionPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  console.log("[render] TodoProgressSummary");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {completedCount} / {totalCount} done
        </span>
        <span className="text-muted-foreground">{pendingCount} pending</span>
      </div>
      <Progress value={completionPercentage} />
    </div>
  );
});
