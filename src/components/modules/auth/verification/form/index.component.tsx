"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import VerificationInput from "react-verification-input";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth.context";
import RoutePath from "@/routes";

import CardFooterComponent from "../../components/CardFooter.component";
import CardHeaderComponent from "../../components/CardHeader.component";
import { verificationAction } from "./api/api.actions";

export default function VerificationFormComponent() {
  const [verificationCode, setCode] = useState<string>("");
  const [_id, setId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: verificationAction,
    onError: (error) => {
      console.error("Custom error: ", error);

      toast({
        title: "Verification Issue",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: ({ access_token }) => {
      login(access_token)
        .then(() => router.push(RoutePath.Home))
        .catch(() => setIsLoading(false));
    },
  });

  const { get } = useSearchParams();

  const handleSubmit = useCallback(() => {
    mutate({
      _id,
      verificationCode,
    });
  }, [_id, mutate, verificationCode]);

  useEffect(() => {
    const _id = get("userId");
    if (_id) setId(_id);
  }, [get]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Card className="w-[456px] relative">
        <CardHeaderComponent
          {...{
            title: "👾 Verificate Your Account Now!",
            description:
              "We sent to your email verification code, enter them please",
          }}
        />
        <Separator />
        <div className="flex justify-center py-8">
          <VerificationInput
            length={5}
            placeholder="-"
            value={verificationCode}
            onChange={setCode}
          />
        </div>
        <Separator />
        <CardFooterComponent
          {...{
            loading: isPending || isLoading,
            buttonTitle: "Verificate",
            subText: "Already a Member? Sign In 💜",
            pushTo: RoutePath.Signin,
          }}
        />
      </Card>
    </form>
  );
}
