import { createFactory } from "hono/factory";
import { sendMessageValidator } from "../validators/ai";
import { authenticatedAuthToken } from "../middleware/auth";
import { Ai } from "../services/ai";

const factory = createFactory();

export const sendMessageHandler = factory.createHandlers(
   authenticatedAuthToken,
   sendMessageValidator,
   async (c) => {
      const data = c.req.valid("json");
      const user = c.get("auth_user");
      //@ts-ignore
      return Ai.sendMessage(data, user.id);
   },
);
