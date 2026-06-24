"use client";

import React from "react";
import { ListChecks, Search } from "lucide-react";
import { TodoItemRow } from "@/app/ui/features/todos/components/todo-item-row";
import { TodoEmptyState } from "@/app/ui/features/todos/components/todo-empty-state";
import { useVisibleTodoItems } from "@/app/ui/features/todos/hooks/use-visible-todo-items";

export const TodoItemList = React.memo(function TodoItemList() {
  console.log("[render] TodoItemList")
  const { filteredItems, allItems, itemIndexMap, canReorder, draggingTodoId } =
    useVisibleTodoItems();

  if (filteredItems.length === 0 && allItems.length === 0) {
    return (
      <TodoEmptyState
        icon={ListChecks}
        title="No todo items yet"
        description="Add your first item to start tracking your progress."
      />
    );
  }

  if (filteredItems.length === 0) {
    return (
      <TodoEmptyState
        icon={Search}
        title="No matching items"
        description="Adjust the search or filters to find existing todos."
      />
    );
  }

  return (
    <div className="space-y-3">
      {filteredItems.map((item) => (
        <TodoItemRow
          key={item.id}
          item={item}
          isManualSort={canReorder}
          canMoveUp={(itemIndexMap.get(item.id) ?? 0) > 0}
          canMoveDown={(itemIndexMap.get(item.id) ?? 0) < allItems.length - 1}
          isDragging={draggingTodoId === item.id}
        />
      ))}
    </div>
  );
});
