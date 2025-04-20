import { Hono } from "hono";
import {
   createJobPostHandler,
   deleteJobPostHandler,
   getCommunityJobPostsHandler,
   getJobPostByIdHandler,
   getUserJobPostHandler,
} from "../factory/job";

const jobRoutes = new Hono();
jobRoutes.post("/create-job-post", ...createJobPostHandler);
jobRoutes.get("/user/job-post", ...getUserJobPostHandler);
jobRoutes.get("/idk", ...getCommunityJobPostsHandler);
jobRoutes.delete("/user/delete-job-post/:id", ...deleteJobPostHandler);
jobRoutes.get("/job-post/:id", ...getJobPostByIdHandler);

export default jobRoutes;
