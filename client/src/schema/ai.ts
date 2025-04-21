import { z } from "zod";

export const message = z.object({
  sender: z.enum(["assistant", "instruction", "user"]),
  content: z.string(),
});

export type Message = z.infer<typeof message>;
