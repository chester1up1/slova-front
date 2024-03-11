"use client";

import { LogOutIcon } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import RoutePath from "@/routes";

const btns = [
  {
    label: "Home",
    to: RoutePath.Home,
  },
  {
    label: "Profile",
    to: RoutePath.Profile,
  },
  {
    label: "About",
    to: RoutePath.About,
  },
];

const HeaderComponent = () => {
  const { user, logout, logoutIsPending } = useAuth();
  const router = useRouter();

  console.log("logoutIsPending: ", logoutIsPending);

  return (
    <div className="px-[16px] py-[32px] bg-background border-b-[1px] bg-gradient-to-br from-background via-background to-primary">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h4>
            <span className="text-[32px] font-bold text-primary">Slova</span> |
            alpha 0.1
          </h4>
          <p className="text-lg">
            Welcome, {user != null ? user.username : ""}!
          </p>
          <div className="flex items-center mt-[16px] gap-2">
            {btns.map((item, index) => (
              <NavigationButtun
                {...{ ...item, router }}
                key={`key-${item.label}-${index}`}
              />
            ))}
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={logout}
            loading={`${logoutIsPending}`}
          >
            <LogOutIcon className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

interface NavigationButtunProps {
  label: string;
  to: RoutePath;
  router: AppRouterInstance;
}

const NavigationButtun: FC<NavigationButtunProps> = ({ label, to, router }) => {
  return (
    <Button variant="default" onClick={() => router.push(to)}>
      {label}
    </Button>
  );
};

export default HeaderComponent;
