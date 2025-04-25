import { Hono } from "hono";
import {
   getInterviewReportHandler,
   submitCodeSolutionHandler,
   submitInterviewReportHandler,
} from "../factory/submission";

const submissionRoutes = new Hono();
submissionRoutes.post("/code", ...submitCodeSolutionHandler);
submissionRoutes.post("/interview", ...submitInterviewReportHandler);
submissionRoutes.get("/interview-report", ...getInterviewReportHandler);

export default submissionRoutes;
