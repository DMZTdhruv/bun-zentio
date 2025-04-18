import { createFactory } from "hono/factory";
import { signUpValidator, signInValidator } from "../validators/auth";
import { updatePassword, createUser, signInUser } from "../services/auth";
import { setCookie, setSignedCookie } from "hono/cookie";
import { errorResponse, successResponse, ZentioError } from "../utils/utils";

const factory = createFactory();

export const signUpHandler = factory.createHandlers(
   signUpValidator,
   async (c) => {
      const data = c.req.valid("json");
      try {
         const { token, username, name, id } = await createUser(data);
         setCookie(c, "auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            path: "/",
         });

         const responseData = { id, username, name };
         return successResponse({
            c,
            statusCode: 201,
            message: "successfully created user",
            data: responseData,
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

export const signInHandler = factory.createHandlers(
   signInValidator,
   async (c) => {
      const data = c.req.valid("json");
      console.log(data);
      try {
         const { id, token, username, name } = await signInUser(data);

         setCookie(c, "auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
         });

         const responseData = { id, username, name };
         return successResponse({
            c,
            statusCode: 200,
            message: "successfully signed user",
            data: responseData,
         });
      } catch (error) {
         console.log("Error signing in the user", error);
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

export const signOutHandler = factory.createHandlers(
   signUpValidator,
   async (c) => {
      const data = c.req.valid("json");
      try {
         setCookie(c, "auth", "", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            path: "/",
         });

         return successResponse({
            c,
            statusCode: 201,
            message: "successfully created user",
            data: "successfully logged out as " + data.name,
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

export const updatePasswordHandler = factory.createHandlers(
   signInValidator,
   async (c) => {
      const data = c.req.valid("json");
      try {
         await updatePassword(data);
         setCookie(c, "auth", "", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            path: "/",
            maxAge: 0,
         });

         return successResponse({
            c,
            statusCode: 201,
            message: "successfully updated password",
            data: null,
         });
      } catch (error) {
         console.log("Error updating user password", error);
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
