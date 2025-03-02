import { password } from "bun";
import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserSchema = z.infer<typeof userSchema>;
