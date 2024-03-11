import { ApiRoutes } from "@/api";
import api from "@/lib/axios";

export type SignupDto = {
  email: string;
  username: string;
  password: string;
};

export type SignUpResponse = {
  userId: string;
};

export function signupAction(dto: SignupDto) {
  try {
    return api.post<SignupDto, SignUpResponse>(ApiRoutes.SignUp, dto);
  } catch (error) {
    throw new Error("Signup error: ", error);
  }
}
