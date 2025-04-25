import { createFactory } from "hono/factory";
import { sendCopilotMessage, sendMessageValidator } from "../validators/ai";
import { authenticatedAuthToken } from "../middleware/auth";
import { Ai } from "../services/ai";

const factory = createFactory();

export const sendMessageHandler = factory.createHandlers(
   authenticatedAuthToken,
   sendMessageValidator,
   async (c) => {
      const data = c.req.valid("json");
      //@ts-ignore
      return Ai.sendMessage(data);
   },
);

export const copilotHandler = factory.createHandlers(
   authenticatedAuthToken,
   sendCopilotMessage,
   async (c) => {
      const data = c.req.valid("json");
      const res = await Ai.copilotGenerate(data);
      return c.json(res);
   },
);
