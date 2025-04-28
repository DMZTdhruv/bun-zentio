import apiClient, { SuccessResponse } from "~/lib/api-client";
import { AuthedUser } from "~/schema/user";

export const getUserProfile = (id: string) => {
  return apiClient.get<SuccessResponse<AuthedUser>>("/profile", {
    params: {
      id,
    },
  });
};

export const logOut = (id: string) => {
  return apiClient.post<SuccessResponse<AuthedUser>>("/sign-out", {
    params: {
      id,
    },
  });
};
