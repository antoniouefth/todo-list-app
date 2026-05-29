"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ITodoItemFormInput,
  todoItemSchema,
} from "@/app/ui/features/todos/schemas/todo-item-schema";
import { Button } from "@/app/ui/shared/components/ui/button";
import { Input } from "@/app/ui/shared/components/ui/input";

interface AddTodoFormProps {
  onSubmit: (name: string) => Promise<void>;
}

export function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const form = useForm<ITodoItemFormInput>({
    resolver: zodResolver(todoItemSchema),
    defaultValues: { name: "" },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values.name);
    form.reset();
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <div className="flex-1">
        <Input
          {...form.register("name")}
          aria-label="Add todo item"
          placeholder="Add a new todo item"
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        />
        {form.formState.errors.name ? (
          <p className="mt-1 text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="h-10 bg-emerald-600 text-white hover:bg-emerald-700"
      >
        Add Item
      </Button>
    </form>
  );
}
