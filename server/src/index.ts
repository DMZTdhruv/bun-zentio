import { Hono } from "hono";
import "dotenv/config";
import { logger } from "hono/logger";
import { connectToDb } from "./db";
import authRoutes from "./routes/auth";

const port = process.env.PORT || 3001;
const app = new Hono();
connectToDb();

// middlewares
app.use("*", logger());

//auth routes
app.route("/api/auth", authRoutes);

console.log(`server is running on http://localhost:${port}`);
Bun.serve({
  port,
  fetch: app.fetch,
});
