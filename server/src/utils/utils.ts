import type { Context } from "hono";
import type { ErrorResponse, SuccessResponse } from "../schema/response";
import type { StatusCode } from "hono/utils/http-status";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("json web token secret key is not defined in .env");
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

interface CreateJsonWebTokenInterface {
  username: string;
  name: string;
  id: string;
}

export const createJsonWebToken = (data: CreateJsonWebTokenInterface) => {
  return jwt.sign(data, SECRET_KEY);
};

export class ZentioError extends Error {
  status: StatusCode;

  constructor(message: string, status: StatusCode) {
    super(message);
    this.status = status;
  }
}
