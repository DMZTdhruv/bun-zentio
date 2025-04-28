import { useChat as useBaseChat } from "@ai-sdk/react";

export const useChat = () => {
  return useBaseChat({
    id: "editor",
    api: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/ai/chat",

    /* eslint-disable @typescript-eslint/no-explicit-any */
    fetch: async (input: any, init: any) => {
      const res = await fetch(input, { ...init, credentials: "include" });
      if (!res.ok) {
        return new Response(null, {
          headers: {
            Connection: "keep-alive",
            "Content-Type": "text/plain",
          },
        });
      }
      return res;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
