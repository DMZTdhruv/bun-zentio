import { Hono } from "hono";
import {
  signInHandler,
  signOutHandler,
  signUpHandler,
  updatePasswordHandler,
} from "../factory/auth";

const authRoutes = new Hono();

authRoutes.post("/sign-up", ...signUpHandler);
authRoutes.post("/sign-in", ...signInHandler);
authRoutes.post("/update-password", ...updatePasswordHandler);
authRoutes.get("/sign-out", ...signOutHandler);

export default authRoutes;
