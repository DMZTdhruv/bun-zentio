import { z } from "zod";

const baseMessage = z.object({
  status: z.enum(["success", "failed"]),
  message: z.string(),
});

const successResponse = baseMessage.extend({
  data: z.any(),
});

const errorRespnse = baseMessage.extend({
  error: z.boolean(),
});

export type SuccessResponse = z.infer<typeof successResponse>;
export type ErrorResponse = z.infer<typeof errorRespnse>;
