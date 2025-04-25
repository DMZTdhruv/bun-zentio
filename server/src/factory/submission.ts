import { createFactory } from "hono/factory";
import { authenticatedAuthToken } from "../middleware/auth";
import {
   getInterviewReportQueryValidator,
   submitCodeSolutionValidator,
   submitInterviewResultValidator,
} from "../validators/submission";
import { errorResponse, successResponse, ZentioError } from "../utils/utils";
import { Ai } from "../services/ai";
import { SubmissionService } from "../services/submission";

const factory = createFactory();

export const submitCodeSolutionHandler = factory.createHandlers(
   authenticatedAuthToken,
   submitCodeSolutionValidator,
   async (c) => {
      try {
         const data = c.req.valid("json");
         const user = c.get("auth_user");
         const response = await Ai.generateProblemReport(user.id, data);
         return successResponse({
            c,
            statusCode: 200,
            message: "successfully created report",
            data: response,
         });
      } catch (error) {
         console.log("Error during creating user", error);
         if (error instanceof ZentioError) {
            return errorResponse({
               c,
               statusCode: error.status,
               message: error.message,
            });
         }
         return errorResponse({
            c,
            statusCode: 500,
            message: "internal server error",
         });
      }
   },
);

export const submitInterviewReportHandler = factory.createHandlers(
   authenticatedAuthToken,
   submitInterviewResultValidator,
   async (c) => {
      try {
         const data = c.req.valid("json");
         const user = c.get("auth_user");
         const response = await Ai.generateInterviewReport(user.id, data);
         return successResponse({
            c,
            statusCode: 200,
            message: "successfully created interview report",
            data: response,
         });
      } catch (error) {
         console.log("Error during creating user", error);
         if (error instanceof ZentioError) {
            return errorResponse({
               c,
               statusCode: error.status,
               message: error.message,
            });
         }
         return errorResponse({
            c,
            statusCode: 500,
            message: "internal server error",
         });
      }
   },
);

export const getInterviewReportHandler = factory.createHandlers(
   authenticatedAuthToken,
   getInterviewReportQueryValidator,
   async (c) => {
      try {
         const { jobPostId } = c.req.valid("query");
         const user = c.get("auth_user");
         const response = await SubmissionService.getInterviewReport(user.id, {
            jobPostId,
         });
         return successResponse({
            c,
            statusCode: 200,
            message: "successfully fetched interview report",
            data: response,
         });
      } catch (error) {
         console.log("Error during creating user", error);
         if (error instanceof ZentioError) {
            return errorResponse({
               c,
               statusCode: error.status,
               message: error.message,
            });
         }
         return errorResponse({
            c,
            statusCode: 500,
            message: "internal server error",
         });
      }
   },
);
