import { z } from "zod";

export const renameListSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "List title must be at least 3 characters")
    .max(60, "List title is too long"),
});

export type IRenameListFormInput = z.infer<typeof renameListSchema>;
