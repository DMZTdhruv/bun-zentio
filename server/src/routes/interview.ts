import { Hono } from "hono";
import { createJobPost } from "../factory/interview";

const interviewRoutes = new Hono();

interviewRoutes.post("/create-job-post", ...createJobPost);

export default interviewRoutes;
