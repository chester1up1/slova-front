import { ApiRoutes } from "@/api";
import api from "@/lib/axios";

export type SigninDto = {
  email: string;
  password: string;
};

export type SigninResponse = {
  access_token: string;
};

export const signinAction = (dto: SigninDto) => {
  try {
    return api.post<SigninDto, SigninResponse>(ApiRoutes.SignIn, dto);
  } catch (error) {
    throw new Error("Signin error: ", error);
  }
};
