import { createFactory } from "hono/factory";
import { authenticatedAuthToken } from "../middleware/auth";
import { createJobInterviewQuestionsCreation } from "../validators/interview";
import { errorResponse, successResponse, ZentioError } from "../utils/utils";
import { getJobInterviewService } from "../services/inteview";

const factory = createFactory();

// export const createInterviewQuestionForJobHandler = factory.createHandlers(
//    createJobInterviewQuestionsCreation,
//    authenticatedAuthToken,
//    async (c) => {
//       try {
//          const user = c.get("auth_user");
//          const jobPostId = c.req.param("id");
//
//          if (!jobPostId) {
//             throw new ZentioError("job post id is not provided", 400);
//          }
//
//          const res = await generateJobPostQuestionsById(user.id, jobPostId);
//          return successResponse({
//             c,
//             message: "successfully generated questions",
//             data: res,
//             statusCode: 200,
//          });
//       } catch (error) {
//          console.log(`Error fetching job post`, error);
//          if (error instanceof ZentioError) {
//             return errorResponse({
//                c,
//                statusCode: error.status,
//                message: error.message,
//             });
//          }
//          return errorResponse({
//             c,
//             statusCode: 500,
//             message: "internal server error",
//          });
//       }
//    },
// );

export const getJobInterviewHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const jobPostId = c.req.param("id");

         if (!jobPostId) {
            throw new ZentioError("job interview is not available", 400);
         }

         const res = await getJobInterviewService(user.id, jobPostId);
         return successResponse({
            c,
            message: "successfully fetched job interview",
            data: res,
            statusCode: 200,
         });
      } catch (error) {
         console.log(`Error fetching job post`, error);
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
