import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  email: z
    .string()
    .trim()
    .email('Please provide a valid email')
    .max(255, 'Name must not exceed 255 characters'),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
