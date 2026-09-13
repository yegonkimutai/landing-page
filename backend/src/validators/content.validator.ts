import { z } from "zod";

export const contentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  content_type: z
    .string()
    .trim()
    .min(1, "Content type is required")
    .max(50, "Content type must not exceed 50 characters"),

  status: z.enum(["Published", "Draft"]),
});

export type ContentInput = z.infer<typeof contentSchema>;
