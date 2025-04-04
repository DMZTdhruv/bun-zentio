import { zValidator } from "@hono/zod-validator";
import {
   deleteJobPostRequest,
   jobInterviewQuestionsCreation,
   jobPostCreation,
} from "../schema/job";
import { errorResponse } from "../utils/utils";

export const createJobPostValidator = zValidator(
   "json",
   jobPostCreation,
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

export const createJobInterviewQuestionsCreation = zValidator(
   "json",
   jobInterviewQuestionsCreation,
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

export const deleteJobPostValidator = zValidator(
   "json",
   deleteJobPostRequest,
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
