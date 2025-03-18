import { z } from "zod";

export const languageSchema = z.object({
  content: z.string(),
  mode: z.string(),
  icon_class: z.string().optional(),
});

export type LangaugeSchema = z.infer<typeof languageSchema>;
