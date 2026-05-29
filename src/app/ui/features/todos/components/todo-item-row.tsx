"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/ui/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/shared/components/ui/dialog";
import { Input } from "@/app/ui/shared/components/ui/input";
import {
  ITodoItemFormInput,
  todoItemSchema,
} from "@/app/ui/features/todos/schemas/todo-item-schema";
import type { ITodoItem } from "@/app/domain/todos/entities/todo-item";
import { ArrowDown, ArrowUp, GripVertical, PencilLine, Trash2 } from "lucide-react";
import { cn } from "@/app/ui/shared/lib/utils";

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
  const [open, setOpen] = useState(false);
  const form = useForm<ITodoItemFormInput>({
    resolver: zodResolver(todoItemSchema),
    defaultValues: { name: item.name },
  });

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PencilLine className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[430px]">
          <DialogHeader>
            <DialogTitle>Edit todo item</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await onEdit(values.name);
              setOpen(false);
            })}
            className="space-y-3"
          >
            <Input
              {...form.register("name")}
              aria-label={`Edit name for ${item.name}`}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            />
            {form.formState.errors.name ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => void onDelete()}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
