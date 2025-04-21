import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { z } from "zod";
import { sendMessageValidator } from "../validators/ai";
import { authenticatedAuthToken } from "../middleware/auth";
import { errorResponse, successResponse, ZentioError } from "../utils/utils";

const factory = createFactory();

export const sendMessageHandler = factory.createHandlers(
   authenticatedAuthToken,
   sendMessageValidator,
   async (c) => {
      const data = c.req.valid("json");

      try {
         return successResponse({
            c,
            statusCode: 201,
            message: "successfully created user",
            data: null,
         });
      } catch (error) {
         console.log("Error creating user", error);
         return error instanceof ZentioError
            ? errorResponse({
                 c,
                 statusCode: error.status,
                 message: error.message,
              })
            : errorResponse({
                 c,
                 statusCode: 500,
                 message: "internal server error",
              });
      }
   },
);
