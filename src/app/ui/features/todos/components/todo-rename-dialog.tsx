"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/ui/shared/components/ui/dialog";
import { Button } from "@/app/ui/shared/components/ui/button";
import { Input } from "@/app/ui/shared/components/ui/input";
import {
  IRenameListFormInput,
  renameListSchema,
} from "@/app/ui/features/todos/schemas/rename-list-schema";
import { PencilLine } from "lucide-react";

interface RenameListDialogProps {
  currentTitle: string;
  onSubmit: (title: string) => Promise<void>;
}

export function RenameListDialog({ currentTitle, onSubmit }: RenameListDialogProps) {
  console.log("[render] RenameListDialog")
  const [open, setOpen] = useState(false);
  const form = useForm<IRenameListFormInput>({
    resolver: zodResolver(renameListSchema),
    defaultValues: { title: currentTitle },
  });

  useEffect(() => {
    form.reset({ title: currentTitle });
  }, [currentTitle, form]);

  const handleFormSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values.title);
    setOpen(false);
  });

  const handleCancel = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 px-3 text-xs whitespace-nowrap">
          <PencilLine className="mr-1 h-4 w-4" />
          Rename List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Rename todo list</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <Input
            {...form.register("title")}
            aria-label="Todo list title"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          />
          {form.formState.errors.title ? (
            <p className="text-xs text-destructive">
              {form.formState.errors.title.message}
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
}
