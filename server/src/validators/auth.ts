import { userSchema } from "../schema/user";
import { errorResponse } from "../utils/utils";
import { zValidator } from "@hono/zod-validator";

export const authRequestValidator = zValidator(
  "json",
  userSchema,
  (result, c) => {
    if (!result.success) {
      const errorMessages = result.error.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join(", ");

      // Use your errorResponse helper function
      return errorResponse({
        c,
        statusCode: 400,
        message: `Validation error: ${errorMessages}`,
      });
    }
  },
);
