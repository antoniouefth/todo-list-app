"use client";

import { Button } from "@/app/ui/shared/components/ui/button";
import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import { ArrowDown, ArrowUp, GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/app/ui/shared/lib/utils";
import { TodoEditDialog } from "@/app/ui/features/todos/components/todo-edit-dialog";

interface TodoItemRowProps {
  item: ITodoItem;
  isManualSort: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isDragging: boolean;
  onToggle: () => Promise<void>;
  onDelete: () => Promise<void>;
  onEdit: (name: string) => Promise<void>;
  onMoveUp: () => Promise<void>;
  onMoveDown: () => Promise<void>;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDropOn: (targetId: string) => Promise<void>;
}

export function TodoItemRow({
  item,
  isManualSort,
  canMoveUp,
  canMoveDown,
  isDragging,
  onToggle,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragEnd,
  onDropOn,
}: TodoItemRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card px-3 py-3 transition-all duration-200",
        isDragging ? "scale-[0.99] opacity-70" : "opacity-100",
      )}
      draggable={isManualSort}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", item.id);
        onDragStart();
      }}
      onDragOver={(event) => {
        if (isManualSort) {
          event.preventDefault();
        }
      }}
      onDrop={(event) => {
        const fromTodoId = event.dataTransfer.getData("text/plain");
        void onDropOn(fromTodoId);
      }}
      onDragEnd={onDragEnd}
    >
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center transition-colors",
          isManualSort
            ? "text-muted-foreground/80 cursor-grab active:cursor-grabbing hover:text-foreground"
            : "text-muted-foreground/40 cursor-not-allowed hover:text-muted-foreground/50",
        )}
        aria-label={
          isManualSort ? "Drag handle for reordering" : "Reordering disabled"
        }
        title={isManualSort ? "Drag to reorder" : "Drag is disabled outside Manual sort"}
      >
        <GripVertical className="h-4 w-4" />
      </span>

      <input
        checked={item.completed}
        onChange={() => void onToggle()}
        type="checkbox"
        aria-label={`Toggle completion for ${item.name}`}
        className="h-4 w-4 cursor-pointer"
      />

      <p
        className={cn(
          "flex-1 text-sm transition-colors duration-300",
          item.completed ? "text-muted-foreground line-through" : "text-foreground",
        )}
      >
        {item.name}
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            !isManualSort
              ? "text-muted-foreground/40 cursor-not-allowed hover:text-muted-foreground/50"
              : ""
          )}
          disabled={!isManualSort || !canMoveUp}
          onClick={() => void onMoveUp()}
          title={isManualSort ? "Move up" : "Reordering is disabled for current filters"}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            isManualSort
              ? "cursor-grab active:cursor-grabbing"
              : "cursor-not-allowed opacity-60",
          )}
          disabled={!isManualSort || !canMoveDown}
          onClick={() => void onMoveDown()}
          title={isManualSort ? "Move down" : "Reordering is disabled for current filters"}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>

      <TodoEditDialog itemName={item.name} onEdit={onEdit} />

      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => void onDelete()}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
