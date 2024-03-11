import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { ApiRoutes } from "@/api";
import { camel } from "@/helpers";
import api, { ACCESS_TOKEN_KEY } from "@/lib/axios";
import { UserType } from "@/models/user.types";
import RoutePath from "@/routes";

import useApiActions from "./auth.actions";

export interface AuthContextData {
  user: UserType | null;
}

export interface AuthContextData {
  login: (access_token: string) => Promise<void>;
  logout: () => void;
  logoutIsPending: boolean;
}

export const AuthContext = React.createContext<
  AuthContextData & AuthContextData
>(null as any);

async function getUserRequest() {
  return api.get<any, { user: UserType }>(ApiRoutes.User);
}

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, refetch: getUser } = useQuery({
    queryKey: ["user"],
    queryFn: getUserRequest,
  });

  const { signoutAction } = useApiActions();

  const [user, setUser] = React.useState<UserType | null>(
    data != null ? data.user : null
  );

  const router = useRouter();

  const login = useCallback(async (access_token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    return getUser().then(({ data: { user } }) => {
      setUser({ ...user, username: camel(user.username) });
    });
  }, []);

  const logout = useCallback(() => {
    signoutAction.mutateAsync().then(() => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      router.push(RoutePath.Home);
    });
  }, [router, signoutAction]);

  useEffect(() => {
    const t = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (t != null) login(t);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, logoutIsPending: signoutAction.isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
function useQueryCache() {
  throw new Error("Function not implemented.");
}
