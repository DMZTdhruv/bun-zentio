import { Hono } from "hono";
import { copilotHandler, sendMessageHandler } from "../factory/ai";

const aiRoutes = new Hono();

aiRoutes.post("/chat", ...sendMessageHandler);
aiRoutes.post("/copilot", ...copilotHandler);

export default aiRoutes;
