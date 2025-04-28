import apiClient from "~/lib/api-client";
import { Message } from "~/schema/ai";

export const sendMessage = async ({
  interviewId,
  message,
}: {
  interviewId: string;
  message: Message;
}) => {
  return apiClient
    .post("zentio-ai", message, {
      params: { interviewId },
      withCredentials: true,
    })
    .then((res) => res.data.data);
};

export const messages = async ({ interviewId }: { interviewId: string }) => {
  return apiClient
    .get("zentio-ai", {
      params: { interviewId },
      withCredentials: true,
    })
    .then((res) => res.data.data);
};
