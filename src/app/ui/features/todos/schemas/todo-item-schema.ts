import { z } from "zod";

export const todoItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Todo name is required")
    .max(80, "Todo name is too long"),
});

export type ITodoItemFormInput = z.infer<typeof todoItemSchema>;
