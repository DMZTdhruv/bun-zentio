import { z } from "zod";

export const userSchema = z.object({
   username: z.string().min(3).max(20),
   name: z.string().min(3).max(20),
   email: z.string().email(),
   password: z.string().min(8),
});

export const authToken = userSchema
   .omit({ password: true, email: true })
   .extend({ id: z.string() });

export const signInSchema = userSchema.omit({ username: true, name: true });

export type SignInSchema = z.infer<typeof signInSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type AuthToken = z.infer<typeof authToken>;
