import { z } from "zod";

export const userSchema = z.object({
  id: z.string().nullable(),
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export const authResponse = userSchema.omit({
  email: true,
  password: true,
});

export const signInSchema = userSchema.omit({
  id: true,
  username: true,
  name: true,
});
export const authedUser = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponse>;
export type AuthedUser = z.infer<typeof authedUser>;
