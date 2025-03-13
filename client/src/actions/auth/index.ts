import apiClient, { SuccessResponse } from "~/lib/api-client";
import { AuthResponse, SignInSchema, UserSchema } from "~/schema/user";

export const signUpAction = async (data: UserSchema) => {
  return apiClient
    .post<SuccessResponse<AuthResponse>>("auth/sign-up", data, {
      withCredentials: true,
    })
    .then((res) => res.data.data);
};

export const signInAction = async (data: SignInSchema) => {
  return apiClient
    .post<SuccessResponse<AuthResponse>>("auth/sign-in", data, {
      withCredentials: true,
    })
    .then((res) => res.data.data);
};
