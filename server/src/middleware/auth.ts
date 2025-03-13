import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { errorResponse, verifyJsonWebToken } from "../utils/utils";
import type { AuthToken } from "../schema/user";

interface Env {
   Variables: { auth_user: AuthToken };
}

export const authenticatedAuthToken = createMiddleware<Env>(async (c, next) => {
   const authToken = getCookie(c, "auth");

   if (!authToken) {
      console.log("yes bro...");
      return errorResponse({
         c,
         message: "unauthorized user",
         statusCode: 404,
      });
   }
   try {
      const res = verifyJsonWebToken(authToken);
      c.set("auth_user", res);
   } catch (error) {
      console.log("nah u suck bro...");
      return errorResponse({
         c,
         message: "unauthorized user",
         statusCode: 404,
      });
   }
   await next();
});
