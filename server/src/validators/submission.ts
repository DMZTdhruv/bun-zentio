import { zValidator } from "@hono/zod-validator";
import {
   getInterviewReportQuerySchema,
   submitCodeSolutionSchema,
   submitInterviewResultSchema,
} from "../schema/solution";
import { errorResponse } from "../utils/utils";

export const submitCodeSolutionValidator = zValidator(
   "json",
   submitCodeSolutionSchema,
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

export const submitInterviewResultValidator = zValidator(
   "json",
   submitInterviewResultSchema,
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

export const getInterviewReportQueryValidator = zValidator(
   "query",
   getInterviewReportQuerySchema,
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
