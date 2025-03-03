import { Hono } from "hono";
<<<<<<< HEAD
import { signUpHandler } from "../factory/auth";
=======
import {
  signInHandler,
  signUpHandler,
  updatePasswordHandler,
} from "../factory/auth";
>>>>>>> dev

const authRoutes = new Hono();

authRoutes.post("/sign-up", ...signUpHandler);
<<<<<<< HEAD
=======
authRoutes.post("/sign-in", ...signInHandler);
authRoutes.post("/update-password", ...updatePasswordHandler);
>>>>>>> dev

export default authRoutes;
