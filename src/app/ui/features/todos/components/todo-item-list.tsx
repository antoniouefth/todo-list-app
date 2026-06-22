"use client";

import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import { TodoItemRow } from "@/app/ui/features/todos/components/todo-item-row";
import { canReorderTodos } from "@/app/ui/features/todos/hooks/todo-reorder-rule";
import { ListChecks, Search } from "lucide-react";

interface TodoItemListProps {
  filteredItems: ITodoItem[];
  allItems: ITodoItem[];
  canReorder: boolean;
  draggingTodoId: string | null;
  onMoveTodoItem: (id: string, direction: "up" | "down") => Promise<void>;
  onToggleTodoItem: (id: string) => Promise<void>;
  onDeleteTodoItem: (id: string) => Promise<void>;
  onEditTodoItem: (id: string, name: string) => Promise<void>;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onReorderTodoItems: (fromId: string, toId: string) => Promise<void>;
}

export function TodoItemList({
  filteredItems,
  allItems,
  canReorder,
  draggingTodoId,
  onMoveTodoItem,
  onToggleTodoItem,
  onDeleteTodoItem,
  onEditTodoItem,
  onDragStart,
  onDragEnd,
  onReorderTodoItems,
}: TodoItemListProps) {
  if (filteredItems.length === 0 && allItems.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <ListChecks className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-lg font-medium">No todo items yet</p>
        <p className="text-sm text-muted-foreground">
          Add your first item to start tracking your progress.
        </p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-lg font-medium">No matching items</p>
        <p className="text-sm text-muted-foreground">
          Adjust the search or filters to find existing todos.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredItems.map((item) => (
        <TodoItemRow
          key={item.id}
          item={item}
          isManualSort={canReorder}
          canMoveUp={allItems.findIndex((todo) => todo.id === item.id) > 0}
          canMoveDown={
            allItems.findIndex((todo) => todo.id === item.id) <
            allItems.length - 1
          }
          isDragging={draggingTodoId === item.id}
          onMoveUp={() => onMoveTodoItem(item.id, "up")}
          onMoveDown={() => onMoveTodoItem(item.id, "down")}
          onToggle={() => onToggleTodoItem(item.id)}
          onDelete={() => onDeleteTodoItem(item.id)}
          onEdit={(name) => onEditTodoItem(item.id, name)}
          onDragStart={() => onDragStart(item.id)}
          onDragEnd={onDragEnd}
          onDropOn={(fromTodoId) => onReorderTodoItems(fromTodoId, item.id)}
        />
      ))}
    </div>
  );
}
