"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback, useState } from "react";
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
import { PencilLine } from "lucide-react";

interface TodoEditDialogProps {
  itemName: string;
  onEdit: (name: string) => Promise<void>;
}

export const TodoEditDialog = memo(function TodoEditDialog({
  itemName,
  onEdit,
}: TodoEditDialogProps) {
  console.log("[render] TodoEditDialog")
  const [open, setOpen] = useState(false);
  const form = useForm<ITodoItemFormInput>({
    resolver: zodResolver(todoItemSchema),
    defaultValues: { name: itemName },
  });

  const handleFormSubmit = form.handleSubmit(async (values) => {
    await onEdit(values.name);
    setOpen(false);
  });

  const handleCancel = useCallback(() => setOpen(false), []);

  return (
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
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <Input
            {...form.register("name")}
            aria-label={`Edit name for ${itemName}`}
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
              onClick={handleCancel}
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
  );
});
