import { Hono } from "hono";
import { getJobInterviewHandler } from "../factory/interview";

const interviewRoutes = new Hono();

interviewRoutes.get("/job-interview/:id", ...getJobInterviewHandler);

export default interviewRoutes;
