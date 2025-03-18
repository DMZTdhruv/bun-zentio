import { Hono } from "hono";
import {
   createJobPostHandler,
   deleteJobPostHandler,
   getJobPostByIdHandler,
   getUserJobPostHandler,
} from "../factory/interview";

const interviewRoutes = new Hono();

interviewRoutes.post("/create-job-post", ...createJobPostHandler);
interviewRoutes.get("/user/job-post", ...getUserJobPostHandler);
interviewRoutes.delete("/user/delete-job-post/:id", ...deleteJobPostHandler);
interviewRoutes.get("/job-post/:id", ...getJobPostByIdHandler);

export default interviewRoutes;
