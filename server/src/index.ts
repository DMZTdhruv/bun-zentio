import { Hono } from "hono";
import "dotenv/config";
import { logger } from "hono/logger";
import { connectToDb } from "./db";
import authRoutes from "./routes/auth";
import { cors } from "hono/cors";
import interviewRoutes from "./routes/interview";

const port = process.env.PORT || 3001;
const app = new Hono();

connectToDb();

// middlewares
app.use("*", logger());
app.use(
   "*",
   cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000", // Specify exact frontend URL
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   }),
);

app.route("/api/auth", authRoutes);
app.route("/api/interview", interviewRoutes);
console.log(`server is running on http://localhost:${port}`);
Bun.serve({
   port,
   fetch: app.fetch,
});
