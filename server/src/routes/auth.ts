import { Hono } from "hono";
import {
  signInHandler,
  signUpHandler,
  updatePasswordHandler,
} from "../factory/auth";

const authRoutes = new Hono();

authRoutes.post("/sign-up", ...signUpHandler);
authRoutes.post("/sign-in", ...signInHandler);
authRoutes.post("/update-password", ...updatePasswordHandler);

export default authRoutes;
