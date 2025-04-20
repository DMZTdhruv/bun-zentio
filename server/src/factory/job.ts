import { createFactory } from "hono/factory";
import { authenticatedAuthToken } from "../middleware/auth";
import { createJobPostValidator } from "../validators/interview";
import { errorResponse, successResponse, ZentioError } from "../utils/utils";
import {
   createJobPostService,
   deleteJobPostService,
   getJobPostByIdService,
   getCommunityJobPostsService,
   getUserJobPostsService,
   getJobPostByTitleService,
} from "../services/inteview";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const factory = createFactory();

export const createJobPostHandler = factory.createHandlers(
   createJobPostValidator,
   authenticatedAuthToken,
   async (c) => {
      const user = c.get("auth_user");
      const data = c.req.valid("json");

      if (data.created_by !== user.username) {
         return errorResponse({
            c,
            message: "unauthorized user",
            statusCode: 404,
         });
      }

      const res = await createJobPostService(user.id, data);
      return successResponse({
         c,
         message: "successfully created an ai mock interview job post",
         data: res,
         statusCode: 201,
      });
   },
);

export const getCommunityJobPostsHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const res = await getCommunityJobPostsService(user.id);
         return successResponse({
            c,
            message: "successfully fetched the community job posts",
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

export const getUserJobPostHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const res = await getUserJobPostsService(user.id);
         console.log({ res });
         return successResponse({
            c,
            message: "successfully fetched user job posts",
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

export const deleteJobPostHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const jobPostId = c.req.param("id");

         if (!jobPostId) {
            throw new ZentioError("job post id is not sent", 400);
         }

         const res = await deleteJobPostService(user.id, jobPostId);
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

export const getJobPostByTitle = factory.createHandlers(
   authenticatedAuthToken,
   zValidator("query", z.object({ title: z.string() })),
   async (c) => {
      try {
         const user = c.get("auth_user");
         console.log(user);
         const title = c.req.valid("query").title;
         const res = await getJobPostByTitleService(user.id, title);
         console.log(res);
         return successResponse({
            c,
            message: "job post matching the " + title + " title",
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

export const getJobPostByIdHandler = factory.createHandlers(
   authenticatedAuthToken,
   async (c) => {
      try {
         const user = c.get("auth_user");
         const jobPostId = c.req.param("id");

         if (!jobPostId) {
            throw new ZentioError("job post id is not provided", 400);
         }
         const res = await getJobPostByIdService(user.id, jobPostId);
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
