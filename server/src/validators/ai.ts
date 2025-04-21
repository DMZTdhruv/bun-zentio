import { messageSchema } from "../schema/ai";
import { errorResponse } from "../utils/utils";
import { zValidator } from "@hono/zod-validator";

export const sendMessageValidator = zValidator(
   "json",
   messageSchema,
   (result, c) => {
      if (!result.success) {
         const errorMessages = result.error.issues
            .map((issue) => `${issue.path}: ${issue.message}`)
            .join(", ");

         return errorResponse({
            c,
            statusCode: 400,
            message: `Validation error: ${errorMessages}`,
         });
      }
   },
);
