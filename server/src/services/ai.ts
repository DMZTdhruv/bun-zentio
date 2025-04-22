import type { UIMessage } from "ai";
import { Gemini } from "../repository/gemini";
import type { UiMessagesSchema } from "../schema/ai";

export class Ai {
   public static sendMessage(message: UiMessagesSchema, userId: string) {
      console.log(message);
      return Gemini.sendMessage(message);
   }
}
