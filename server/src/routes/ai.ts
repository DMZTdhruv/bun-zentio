import { Hono } from "hono";
import { sendMessageHandler } from "../factory/ai";

const aiRoutes = new Hono();

aiRoutes.post("/chat", ...sendMessageHandler);

export default aiRoutes;
