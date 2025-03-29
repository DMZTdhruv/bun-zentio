import { Hono } from "hono";
import {
   createJobPostHandler,
   deleteJobPostHandler,
   generateInterviewQuestions,
   getJobPostByIdHandler,
   getUserJobPostHandler,
} from "../factory/interview";
import { generateJobPostQuestionsById } from "../services/inteview";

const interviewRoutes = new Hono();

interviewRoutes.post("/create-job-post", ...createJobPostHandler);
interviewRoutes.get("/user/job-post", ...getUserJobPostHandler);
interviewRoutes.delete("/user/delete-job-post/:id", ...deleteJobPostHandler);
interviewRoutes.get("/job-post/:id", ...getJobPostByIdHandler);
interviewRoutes.post("/generate-questions/:id", ...generateInterviewQuestions);

export default interviewRoutes;
