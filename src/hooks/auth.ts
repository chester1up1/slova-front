"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "universal-cookie";

import { auth } from "@/api";
import RoutePath from "@/routes";

const cookies = new Cookies();

const useInitializationUser = () => {
  // const [user] = useAuthState(auth);

  // const router = useRouter();

  // useEffect(() => {
  //   if (user != null) {
  //     cookies.set("user", user, { path: "/" });
  //     //!auth
  //     // router.push(RoutePath.Home);
  //   }
  // }, [user, router]);

  // return { user };

  const initialUser = cookies.get("user") as User;

  const [user, setUser] = useState<User | null>(initialUser || null);

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      cookies.set("user", user, { path: "/" });
      router.push(RoutePath.Home);
    } else {
      cookies.remove("user");
      setUser(null);
    }
  });

  return { user };
};

export default useInitializationUser;
