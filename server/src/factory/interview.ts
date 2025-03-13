import { createFactory } from "hono/factory";
import { authenticatedAuthToken } from "../middleware/auth";
import { createJobPostValidator } from "../validators/interview";
import { errorResponse, successResponse } from "../utils/utils";
import { createJobPostService } from "../services/inteview";

const factory = createFactory();

export const createJobPost = factory.createHandlers(
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
