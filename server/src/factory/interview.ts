import { createFactory } from "hono/factory";
import { authenticatedAuthToken } from "../middleware/auth";
import {
   createJobPostValidator,
   deleteJobPostValidator,
} from "../validators/interview";
import { errorResponse, successResponse, ZentioError } from "../utils/utils";
import {
   createJobPostService,
   deleteJobPostService,
   getJobPostByIdService,
   getUserJobPostService,
} from "../services/inteview";

const factory = createFactory();

export const createJobPostHandler = factory.createHandlers(
   createJobPostValidator,
   authenticatedAuthToken,
   async (c) => {
      const user = c.get("auth_user");
      const data = c.req.valid("json");
      console.log({ user });
      console.log({
         data,
      });

      if (data.created_by !== user.username) {
         return errorResponse({
            c,
            message: "unauthorized user",
            statusCode: 404,
         });
      }

      const res = await createJobPostService(data, user.username);
      return successResponse({
         c,
         message: "successfully created an ai mock interview job post",
         data: res,
         statusCode: 201,
      });
   },
);

export const getUserJobPostHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const res = await getUserJobPostService(user.username);
         console.log({ res });
         return successResponse({
            c,
            message: "successfully created an ai mock interview job post",
            data: res,
            statusCode: 201,
         });
      } catch (error) {
         console.log("Error fetching user job posts", error);
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

export const deleteJobPostHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const jobPostId = c.req.param("id");
         console.log({
            jobPostId,
         });
         if (!jobPostId) {
            throw new ZentioError("job post id is not sent", 400);
         }
         const res = await deleteJobPostService(user.username, jobPostId);
         return successResponse({
            c,
            message: "successfully deleted an ai mock interview job post",
            data: res,
            statusCode: 200,
         });
      } catch (error) {
         console.log("Error fetching user job posts", error);
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

export const getJobPostByIdHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const jobPostId = c.req.param("id");

         if (!jobPostId) {
            throw new ZentioError("job post id is not provided", 400);
         }
         const res = await getJobPostByIdService(user.username, jobPostId);
         return successResponse({
            c,
            message: "successfully deleted an ai mock interview job post",
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
