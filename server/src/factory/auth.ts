import { createFactory } from "hono/factory";
import { authRequestValidator } from "../validators/auth";
import { createUser } from "../services/auth";
import { setCookie, setSignedCookie } from "hono/cookie";
import { errorResponse, successResponse, ZentioError } from "../utils/utils";

const factory = createFactory();

export const signUpHandler = factory.createHandlers(
  authRequestValidator,
  async (c) => {
    const data = c.req.valid("json");
    try {
      const { token, username, name } = await createUser(data);
      setCookie(c, "auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      const responseData = { username, name };
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
