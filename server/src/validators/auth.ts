import { signInSchema, userSchema } from "../schema/user";
import { errorResponse } from "../utils/utils";
import { zValidator } from "@hono/zod-validator";

export const signUpValidator = zValidator("json", userSchema, (result, c) => {
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
});

export const signInValidator = zValidator("json", signInSchema, (result, c) => {
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
});
