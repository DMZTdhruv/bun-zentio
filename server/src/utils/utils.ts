import type { Context } from "hono";
import type { ErrorResponse, SuccessResponse } from "../schema/response";
import type { StatusCode } from "hono/utils/http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { AuthToken } from "../schema/user";

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
   throw new Error("json web token secret key is not defined in .env");
}

export class ZentioError extends Error {
   status: StatusCode;

   constructor(message: string, status: StatusCode) {
      super(message);
      this.status = status;
   }
}

export const successResponse = ({
   c,
   statusCode,
   message,
   data,
}: {
   c: Context;
   statusCode: StatusCode;
   message: string;
   data: any;
}) => {
   const response: SuccessResponse = {
      data,
      message,
      status: "success",
   };
   c.status(statusCode);
   return c.json(response);
};

export const errorResponse = ({
   c,
   statusCode,
   message,
}: {
   c: Context;
   statusCode: StatusCode;
   message: string;
}) => {
   const response: ErrorResponse = {
      error: true,
      message,
      status: "failed",
   };

   c.status(statusCode);
   return c.json(response);
};

export async function hashPassword(password: string): Promise<string> {
   const saltRounds = 10;
   const salt = await bcrypt.genSalt(saltRounds);
   const hashedPassword = await bcrypt.hash(password, salt);
   return hashedPassword;
}

export async function verifyPasswordHash(
   hashedPassword: string,
   password: string,
): Promise<boolean> {
   return bcrypt.compare(password, hashedPassword);
}

export const createJsonWebToken = (data: AuthToken) => {
   return jwt.sign(data, SECRET_KEY);
};

export const verifyJsonWebToken = (data: string) => {
   return jwt.verify(data, SECRET_KEY) as AuthToken;
};

export const techCompanies = [
   "Apple",
   "Microsoft",
   "Alphabet",
   "Amazon",
   "NVIDIA",
   "Meta",
   "Tesla",
   "TSMC",
   "Samsung",
   "Oracle",
   "Broadcom",
   "Intel",
   "Adobe",
   "Cisco",
   "Salesforce",
];

export const locations = [
   "Cupertino, California, USA",
   "Redmond, Washington, USA",
   "Mountain View, California, USA",
   "Seattle, Washington, USA",
   "Santa Clara, California, USA",
   "Menlo Park, California, USA",
   "Austin, Texas, USA",
   "Hsinchu, Taiwan",
   "Suwon, South Korea",
   "Austin, Texas, USA",
   "San Jose, California, USA",
   "Santa Clara, California, USA",
   "San Jose, California, USA",
   "San Jose, California, USA",
   "San Francisco, California, USA",
];
