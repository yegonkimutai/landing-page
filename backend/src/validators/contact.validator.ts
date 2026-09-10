import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(255, "Email must not exceed 255 characters"),

  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject must not exceed 200 characters"),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message must not exceed 5000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
