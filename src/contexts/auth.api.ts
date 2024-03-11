import { ApiRoutes } from "@/api";
import api from "@/lib/axios";

export const signoutRequset = () => {
  return api.post(ApiRoutes.SignOut);
};
