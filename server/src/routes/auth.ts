import { Hono } from "hono";
import { signUpHandler } from "../factory/auth";

const authRoutes = new Hono();

authRoutes.post("/sign-up", ...signUpHandler);

export default authRoutes;
