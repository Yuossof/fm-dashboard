import { z } from "zod"

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .trim(),
  password: z.string().min(4),
})
